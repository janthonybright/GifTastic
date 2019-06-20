let places = ['USA','Canada','France','China','England','Russia'];

places.every(element => {
    for (i=0;i<places.length;i++) {
        $('#buttons').append('<button data-location=' + places[i] + '>' + places[i] + '</button>');    
    }
})

let buttonClick = $('button').on('click', function () {
    let location = $(this).attr('data-location');
    let queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + location + '&api_key=CHI9LcOr4nNtjXbqGSfFsNSG6Q8BH8cm&limit=5';
    $.ajax({
        url: queryURL,
        method: 'GET',
    })
    .then (function (response) {
        let results = response.data;
        console.log(results);
        
        for(let j=0; j < 5; j++) {
        let gifDiv = $('<div>');
        let rating = results[j].rating;
        let ratingText = $('<p>').text('rating : ' + rating);
        let gifImg = $('<img>');

        gifImg.attr('src', results[j].images.fixed_height.url);
        gifDiv.append(ratingText);
        gifDiv.append(gifImg);
        $('#gifDiv').append(gifDiv);
        }
    })
})