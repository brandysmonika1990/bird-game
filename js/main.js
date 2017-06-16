$(function () {

    // Pobranie wartości DOM
    var wrap = $('#wrap');
    var bird = $('#bird');
    var place = $('.place');
    var place_1 = $('#place1');
    var place_2 = $('#place2');
    var score = $('#score');
    var speed = $('#speed');
    var button = $('#restart');

    // Opcje inicjujące  
    var wrapWidth = parseInt(wrap.width());
    var wrapHeight = parseInt(wrap.height());
    var placeStartPosition = parseInt(place.css('right'));
    var placeStartHeight = parseInt(place.css('height'));
    var birdLeft = parseInt(bird.css('left'));
    var birdHeight = parseInt(bird.height());
    var speedResume = 10;

    //deklarcja różnego typu
    var goUp = false;
    var scoreUpdate = false;
    var gameOver = false;

    var game = setInterval(function () {

        if (crash(bird, place_1) || crash(bird, place_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > wrapHeight - birdHeight) {

            stopGame();

        } else {

            var placeCurrentPosition = parseInt(place.css('right'));

            // dodawanie pkt kiedy ptaszek przeleci przez przeszkodze

            if (placeCurrentPosition > wrapWidth - birdLeft) {
                if (scoreUpdate === false) {
                    score.text(parseInt(score.text()) + 1);
                    scoreUpdate = true;
                }
            }

            // Jeżeli aktualna pozycja bedzie wieksza od szer. wrap to aktualna pozycja zostanie przypisana do pozycji startowej = efekt dodania koljnego slupa
            if (placeCurrentPosition > wrapWidth) {

                //losowa zmiana wysokosci słupa
                var newHeight = parseInt(Math.random() * 100);
                place_1.css('height', placeStartHeight + newHeight);
                place_1.css('height', placeStartHeight - newHeight);

                //zwiększanie prędkości
                speedResume = speedResume + 1;
                speed.text(speedResume);

                scoreUpdate = false;

                placeCurrentPosition = placeStartPosition;
            }


            // poruszanie się kolumn
            place.css('right', placeCurrentPosition + speedResume);

            if (goUp === false) {
                goDown();
            }

        }
    }, 40);

    // Po nacisnieciu spacji ptaszek leci w górę 
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && goUp === false && gameOver === false) {
            goUp = setInterval(up, 50);

        }
    });

    // Po zwolnieniu spacji ptaszek spada w dół 
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(goUp);
            goUp = false;

        }
    });

    //funkcja dla KeyDown
    function goDown() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 5);
    }

    function stopGame() {
        clearInterval(game);
        gameOver = true;
        button.slideDown();
    }

    button.click(function () {
        location.reload();
    });

    function crash($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});