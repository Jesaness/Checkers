$(document).ready(function() {
    var parent;     // stores the red square of the selected piece
    var pid;        // stores the id of the parent red square (i and j)
    var selected;   // stores the selected chess piece
    var options = [];   // stores the possible next positions

    // REQUIRES: a valid chess color input (black or white), existing row and col
    // MODIFIES: options[] 
    // EFFECTS: tell us possible next positions (0, 1, 2) in options
    function getOptions(color, row, col){
        var option; // selector of element with the id row_col for the jQuery library

        // if it's white piece
        if(color == "rgb(255, 255, 255)"){
            // 1st option
            option = $('#'+(row+1)+'_'+(col-1));
            options.push(option);
            // 2nd option
            option = $('#'+(row+1)+'_'+(col+1));
            options.push(option);
        }

        // if it's black piece
            // let it know what options it has
        if(color == "rgb(0, 0, 0)"){
            // 1st option
            option = $('#'+(row-1)+'_'+(col-1));
            options.push(option);
            // 2nd option
            option = $('#'+(row-1)+'_'+(col+1));
            options.push(option);
        }    
        
        for(var i = 0; i < options.length; i++){
            options[i].css("background-color","yellow");
        }
    } // getOptions()

    function clearOptions(){
        options.splice(1, options.length);
    } // clearOptions()

    // EFFECTS: Find the row/column and color and then calls getOptions
    function getOptionsHelper(clickedPiece){
        // seleted
        selected = clickedPiece;
        // clearOptions
        clearOptions();
        // find parent using .parent() jQuery function
        parent = selected.parent(); // gives us the square (its id has the i and j (row and col info) )
        // pid -> find i and j 
        pid = parent.attr("id").split('_') ; //<- WHAT DOES IT LOOK LIKE
        // call getOptions()
        getOptions(/*color, row, col*/);

    } // getOptionsHelper()


    $("#start").click(function(){
        $(this).hide();
        var id;
        for(var i = 0; i < 8; i++){ // rows
            for(var j = 0; j < 8; j++){ // columns
                if((i+j)%2 == 0){
                    $("#board").append($("<div>",{class:"white square"}));
                }else{
                    id = i+'_'+j; // string "i_j"
                    $("#board").append($("<div>",{class:"red square", id: id})); // adding the red board & giving them an id based on their i and j coordinate
                    if (i <= 2){ // white pieces (rows 0, 1, 2)
                        $("#"+id).append($("<div>", {class:"white piece"})); // adding the white pieces to red board that have i and j coordinates
                    } else if (i >= 5){ // black pieces (rows 5, 6, 7)
                        $("#"+id).append($("<div>", {class:"black piece"}));
                    }
                } // else red quare
            } // for j
        } // for i
        $(".white.piece").click(function(){
            getOptionsHelper($(this));
        });

        $(".black.piece").click(function(){
            getOptionsHelper($(this));
        });
    }); // .click()
}); // .ready()