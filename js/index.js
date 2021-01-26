$(document).ready(function () {

    var myReviews = JSON.parse(localStorage.getItem("myreviews"));
    if (myReviews == null) {
        myReviews = [];
    }



    var message = "";
    //console.log('test');
    for (var i = 0; i < myReviews.length; i++) {
        console.log('test');
        var movie = myReviews[i];
        message += '<div class="card"><div class="card-header">' + movie.Title + '</div>';
        message += '<div class="card-body">' + movie.Plot + '</div></div><br/>';

    }
    $("#contents").append(message);
});