(function() {
    var slider = document.querySelector('[data-slider]');
    if (slider) {
        var slides = slider.querySelectorAll('.slider__item');
        var controls = slider.querySelector('.slider__controls');
        var scroller = slider.querySelector('.slider__scrollable');
        var controlsArray = [];
        var width = slider.offsetWidth;
        var curSlide = 0;
        slides.forEach(function(slide, index) {
            var el = document.createElement('div');


            el.className = index === 0 ? 'slider__controls__item active' : 'slider__controls__item';
            slide.setAttribute('data-id', index);
            el.setAttribute('data-id', index);

            // slide.addEventListener('click', function() {
            //     goTo(+this.getAttribute('data-id') + 1);
            // });

            el.addEventListener('click', function() {
                goTo(+this.getAttribute('data-id'));
            }, false);

            controlsArray.push(el);
            controls.appendChild(el);
        });

        function goTo(index) {
            if (index > slides.length - 1) {
                index = 0;
            }
            var control = controls.querySelector('[data-id="' + index + '"]');
            controlsArray.forEach(function(r) { r.classList.remove('active') });
            control.classList.add('active');
            var offset = -width * index;
            scroller.style.transform = 'translateX(' + offset + 'px)';
            curSlide = index;
        }


        setInterval(function() {
            goTo(curSlide + 1);
        }, 5000);
    }
}());



(function() {
    var slider = document.querySelector('[data-slider-mini]');
    if (slider) {
        var slides = slider.querySelectorAll('.slider__item');
        var controlLeft = slider.querySelector('.slider__controls__left');
        var controlRight = slider.querySelector('.slider__controls__right');
        var scroller = slider.querySelector('.slider__scrollable');
        var width = slider.offsetWidth;
        var curSlide = 0;
        var previewWindow;

        slides.forEach(function(slide, index) {
            slide.setAttribute('data-id', index);
            slide.addEventListener('click', function(e) {
                e.stopPropagation();
                openPreview(this.getAttribute('data-src'), this.getAttribute('data-title'));
            });
        });

        function goTo(index) {
            if (index > slides.length - 1) {
                index = 0;
            }
            if (index < 0) {
                index = slides.length - 1;
            }
            var offset = -width * index;
            scroller.style.transform = 'translateX(' + offset + 'px)';
            curSlide = index;
        }

        function openPreview(src, title) {
            if (previewWindow) previewWindow.remove();
            previewWindow = document.createElement('div');
            previewWindow.className = 'slider__preview';
            previewWindow.innerHTML = '<div class="slider__preview__overlay">  </div>\
             <div class="slider__preview__content">\
                <div class="slider__preview__close"></div>\
                <div class="slider__preview__img" style="background: url(' + src + ')"></div>\
                <div class="slider__preview__title">' + title + '</div>\
            </div>';

            previewWindow.querySelector('.slider__preview__close').addEventListener('click', function(e) {
                previewWindow.remove();
            });
            document.body.appendChild(previewWindow);
        }

        window.addEventListener('click', function(e) {
            if (previewWindow && !previewWindow.querySelector('.slider__preview__content').contains(e.target)) {
                previewWindow.remove();
            }
        }, false);

        controlLeft.addEventListener('click', function() {
            goTo(curSlide - 1);
        }, false);
        controlRight.addEventListener('click', function() {
            goTo(curSlide + 1);
        }, false);
        setInterval(function() {
            goTo(curSlide + 1);
        }, 5000);
    }
}());




(function() {
    var btn = document.querySelector('#go-top');

    if (btn) {
        btn.addEventListener('click', function() {

            var interval = setInterval(function() {
                var scrollTop = document.documentElement.scrollTop;

                if (scrollTop <= 0) {
                    clearInterval(interval);
                } else {
                    document.body.scrollTop  = scrollTop - 15;//scrollTo(0, scrollTop - 15);
                    document.documentElement.scrollTop = scrollTop - 15;
                }
            }, 0);
        }, false);
    }

}());

(function() {
    var items = document.querySelectorAll('[data-toggle-menu]');

    if (items.length) {
        items.forEach(function(item) {
            item.addEventListener('click', function() {
                if (this.parentNode.classList.contains('active')) {
                    this.parentNode.classList.remove('active')
                } else {
                    this.parentNode.classList.add('active')
                }
            }, false);
        });
    }

}());

(function() {
    var btn = document.querySelector('#feedback-form-btn');
    var form = document.querySelector('.feedback-form');
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }
    }, false);

    window.addEventListener('click', function(e) {
        if (!form.contains(e.target)) {
            form.classList.add('hidden')
        }
    }, false);
}());