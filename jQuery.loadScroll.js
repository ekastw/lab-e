// Dynamically load images while scrolling
// Source: github.com/ByNathan/jQuery.loadScroll
// Version: 1.0.1

(function($) {
    $.fn.loadScroll = function(duration) {
        var $window = $(window),images = this,inview,loaded;
        images.one('loadScroll', function() {
            if (this.getAttribute('data-src')) {
                this.setAttribute('src',this.getAttribute('data-src'));
                this.removeAttribute('data-src');
                if (duration) {
                    $(this).hide().fadeIn(duration).removeAttr('style').addClass('lazy-out');
                    //$(this).hide().fadeIn(duration).add('img').removeAttr('style').addClass('lazy-out');
                } else return false;
            }
        });
        function lazy_load_image(){
            inview = images.filter(function() {
                var a = $window.scrollTop(),
                    b = $window.height(),
                    c = $(this).offset().top,
                    d = $(this).height();
                return c + d >= a && c <= a + b;
            });            
            loaded = inview.trigger('loadScroll');
            images = images.not(loaded);   
        }
        $window.scroll(function() {
            lazy_load_image();                  
        });
        $window.ready(function() {
            lazy_load_image();           
        })        
    };
    
})(jQuery);