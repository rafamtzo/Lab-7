$(document).ready(function() {

    let temas = ["Crash Bandicoot", "Playstation", "Nintendo", "Smash Bros", "Twitch", "Smite"];
    cargaTemas();
    
    
    function cargaTemas(){
        for(var i = 0; i < temas.length; i++){
            $("#theme-buttons").append(`<button id="filter-btn" value="${temas[i]}">${temas[i]}</button>`);
        }
    }
    
    $("#gif-form").on("click", "#add-button", function(event){
        event.preventDefault();
        $("#theme-buttons").html("");
        temas.push($("#gif-input").val());
        cargaTemas();
    })
    
    $("#theme-buttons").on("click", "#filter-btn",function(event) {
        event.preventDefault();
        $("#results").html("");
    
        var request = {
            url: `https://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=rMutGKpR14afMj49ppRxvuZbIiz4Ujrm&limit=10`,
            
            success: function(data) {
                data.data.forEach(element => {
                    console.log(this.value);
                    var gifContainer = $(`<div id = "gif-container"></div>`);
                    var gif = $("<img>");
                    gif.attr("src", element.images.fixed_height_still.url);
                    gif.attr("data-animacion", element.images.fixed_height.url);
                    gif.attr("data-still",element.images.fixed_height_still.url);
                    gif.attr("data-activada", "no");
                    gif.addClass("gif-item");
                    gifContainer.append(`<p> Rating: ${element.rating}</p>`);
                    gifContainer.append(gif);
                    $("#results").append(gifContainer);
                });
    
                
            
            },
            error: function() {
                console.log("Error no se recupero los datos");
            },
        } 
        $.ajax(request);
        
    })
    
    $("body").on("click",".gif-item", function(event){
    
        var activada = $(this).attr("data-activada");
    
        if( activada === "no") {
            $(this).attr("src", $(this).attr("data-animacion"));
            $(this).attr("data-activada", "si");
            
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-activada", "no");
        }
    })
    
    });
    
