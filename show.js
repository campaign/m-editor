(function(){
    var Slider = function(){
        this.init();
    };
    Slider.prototype = {
        init:function(){
            var _this = this;
            this.$root = $('<div class="slider_container">')
                .css({
                    'background': '##666666',
                    'position': 'fixed',
                    'top': 0,
                    'left': 0,
                    'width': $(window).width(),
                    'height': $(window).height()
                }).hide();
            this.$root.appendTo(document.body);
            this.$root.on('tap', function(){
                _this.hide();
            });
            return this;
        },
        setImages: function($imgs){
            var $root = this.$root;
            $root.html('');
            $imgs.each(function(k, img){
                $('<div><img src="'+ $(img).attr('src') + '" /></div>').appendTo($root);
            });
            return this;
        },
        show: function(slideToIndex){
            var $root = this.$root;
            $root.show().slider({
                index: slideToIndex || 0,
                ready: function () {
                    $root.find('img').on('load', updataImagePos).each(updataImagePos);
                    function updataImagePos(){
                        var $img = $(this),
                            marginTop = ($img.parent().height() - $img.height()) / 2;
                        $img.css({'margin': (marginTop > 0 ? marginTop : 0) + 'px auto'});
                    }
                }
            });
            return this;
        },
        hide: function(){
            this.$root.hide().slider('destroy');
            return this;
        }
    };

    var slider = new Slider();
    $('.item').each(function(i, p){
        var $imgs = $(p).find('.post img');
        $imgs.click(function(){
            slider.setImages($imgs).show(i);
        });
    });
})()