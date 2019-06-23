let topics = ['USA','Canada','France','China','England','Russia'];

topics.every(element => {
    for (i=0;i<topics.length;i++) {
        $('#buttons').append('<button data-location=' + topics[i] + '>' + topics[i] + '</button>');    
    }
})

let buttonClick = $('button').on('click', function () {
    let location = $(this).attr('data-location');
    let queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + location + '&api_key=CHI9LcOr4nNtjXbqGSfFsNSG6Q8BH8cm&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET',
    })
    .then (function (response) {
        let results = response.data;
        console.log(results);
        
        for(let j=0; j < 10; j++) {
        let gifDiv = $('<div>');
        let rating = results[j].rating;
        let ratingText = $('<p>').text('Rating: ' + rating);
        
        gifImg = $('<img>');
        // gifImg.attr()
        gifImg.attr('src', results[j].images.fixed_height_still.url);
        gifImg.attr('data-still', results[j].images.fixed_height_still.url);
        gifImg.attr('data-animate', results[j].images.fixed_height.url);
        gifImg.attr('data-state', 'still');
        gifImg.on('click', aniGif);
        

        gifDiv.append(gifImg);
        gifDiv.append(ratingText);
        $('#gifDiv').prepend(gifDiv);
        }
    })
})
function aniGif() {
    let gifStop = $(this).attr('data-still');
    let gifPlay = $(this).attr('data-animate');
    let gifState = $(this).attr('data-state');
    if (gifState === 'still'){
        $(this).attr("src", gifPlay);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", gifStop);
        $(this).attr("data-state", "still");
    }
    
    console.log(this);
}