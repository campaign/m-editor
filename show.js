(function(){
    var Slider = function(){
        this.init();
    };
    Slider.prototype = {
        init:function(){
            var _this = this;
            this.$root = $('<div class="slider_container">').hide();
            this.$root.appendTo(document.body);
            this.$root.on('tap', function(){
                _this.hide();
            });
        },
        setImages: function($imgs){
            var $root = this.$root;
            $root.html('');
            $imgs.each(function(k, img){
                $('<div><img src="'+ $(img).attr('src') + '" /></div>').appendTo($root);
            });
        },
        show: function(){
            this.$root.show().slider( { imgZoom: true });
        },
        hide: function(){
            this.$root.hide().slider('destroy');
        }
    };

    var slider = new Slider();
    $('.item').each(function(i, p){
        var $imgs = $(p).find('.post img');
        $imgs.click(function(){
            slider.setImages($imgs);
        });
    });
})()