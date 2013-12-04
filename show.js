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
                    'width': '100%',
                    'height': '100%'
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
        show: function(index){
            var $root = this.$root;
            $root.show().slider({
                index: index || 0,
                ready: function () {
                    $root.find('img').each(updataImagePos).on('load', updataImagePos);
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
        $imgs.on('click', function(){
            var target = this, index = 0;
            $imgs.each(function(k, v){
                if (v == target) index = k;
            });
            slider.setImages($imgs).show(index);
        });
    });
})()