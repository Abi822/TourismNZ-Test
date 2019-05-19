$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 20) {
        $('#slide-top').fadeIn();
    } else {
        $('#slide-top').fadeOut();
    }
});
$(document).ready(function () {
    $("#slide-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});

$(function ($) {
    setInterval(function () {
        $('.user').timeUser();
    }, 1000);
});

$.fn.extend({
    timeUser: function () {
        var userTime,
            userDate;

        userTime = new Date();
        userDate = userTime.toDateString();
        userTime = userTime.toTimeString();

        this.html(userDate + '. Time: ' + userTime.substring(0, 8));
    }
});

$(function () {
    var SliderModule = (function () {
        var pb = {};
        pb.el = $('#slider');
        pb.items = {
            panels: pb.el.find('.slider-wrapper > li'),
        }

        var SliderInterval,
            currentSlider = 0,
            nextSlider = 1,
            lengthSlider = pb.items.panels.length;

        pb.init = function (settings) {
            this.settings = settings || { duration: 8000 };
            var items = this.items,
                lengthPanels = items.panels.length,
                output = '';


            for (var i = 0; i < lengthPanels; i++) {
                if (i == 0) {
                    output += '<li class="active"></li>';
                } else {
                    output += '<li></li>';
                }
            }

            $('#control-buttons').html(output);


            activateSlider();


            $('#control-buttons').on('click', 'li', function (e) {
                var $this = $(this);
                if (!(currentSlider === $this.index())) {
                    changePanel($this.index());
                }
            });

        }

        var activateSlider = function () {
            SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
        }

        pb.startSlider = function () {
            var items = pb.items,
                controls = $('#control-buttons li');
            if (nextSlider >= lengthSlider) {
                nextSlider = 0;
                currentSlider = lengthSlider - 1;
            }

            controls.removeClass('active').eq(nextSlider).addClass('active');
            items.panels.eq(currentSlider).fadeOut('slow');
            items.panels.eq(nextSlider).fadeIn('slow');
            currentSlider = nextSlider;
            nextSlider += 1;
        }

        var changePanel = function (id) {
            clearInterval(SliderInterval);
            var items = pb.items,
                controls = $('#control-buttons li');
            if (id >= lengthSlider) {
                id = 0;
            } else if (id < 0) {
                id = lengthSlider - 1;
            }

            controls.removeClass('active').eq(id).addClass('active');
            items.panels.eq(currentSlider).fadeOut('slow');
            items.panels.eq(id).fadeIn('slow');

            currentSlider = id;
            nextSlider = id + 1;
            activateSlider();
        }
        return pb;
    }());

    SliderModule.init({ duration: 4000 });

});

function initMap() {
    var location = { lat: 45.442009, lng: 12.317338 }

    var map = new
        google.maps.Map(document.getElementById("map"),
            {
                zoom: 12,
                center: location
            });
    var marker = new
        google.maps.Marker({
            position: location,
            map: map
        });
}

function myFunction() {
    var x = document.getElementById("hideshow");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

//function topFunction() {
//document.body.scrollTop = 650; 
//document.documentElement.scrollTop = 650;    
//}

function topFunction() {
    $(".menuDown").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 590 }, 450);
        return false;
    });

};

$(function () {
    $(".loadingbutton").click(function () {
        $(".loadingbutton").addClass("onclick", validate());
    });

    function validate() {
        setTimeout(function () {
            $(".loadingbutton").removeClass("onclick");
        }, 1000);
    }
});

function mytable() {
    d3.text("data.csv", function (data) {
        var parsedCSV = d3.csv.parseRows(data);
        var container = d3.select("btable")
            .append("table")
            .selectAll("tr")
            .data(parsedCSV).enter()
            .append("tr")
            .selectAll("td")
            .data(function (d) { return d; }).enter()
            .append("td")
            .text(function (d) { return d; });
    });
}

jQuery(document).ready(function ($) {
    numcounter();
});

function numcounter() {
    setTimeout(function () {
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                    duration: 5600,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
        });
    }, 1900);
}

$(document).ready(function () {

    $(window).scroll(function () {

        var height = $('.first-container').height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= height - 40) {
            $('.nav-container').addClass('solid-nav');
        } else {
            $('.nav-container').removeClass('solid-nav');
        }

    });
});

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  lens = document.createElement("DIV");
  lens.setAttribute("class", "imgzoomlens");
  img.parentElement.insertBefore(lens, img);
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  
  function moveLens(e) {
    var pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}