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
            this.$root.on('click', function(e){
                _this.hide();
                e.preventDefault();
                return false;
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
        //设置幻灯片
        var $imgs = $(p).find('.post img').not('.audio,.emotion');
        $imgs.on('click', function(){
            pauseAllAudio();
            var target = this, index = 0;
            $imgs.each(function(k, v){
                if (v == target) index = k;
            });
            slider.setImages($imgs).show(index);
        });
        //设置音频按钮点击播放
        var $audioImgs = $(p).find('.post img.audio');
        $audioImgs.each(function(k, v){
            var $img = $(v),
                $audio = $('<audio src='+$img.attr('_src')+' controls="controls" style="display:none;height:0px;width:0px;padding:0;margin:0;"></audio>');

            $audio.insertAfter($img);
            $img.on('touchstart', function(){
                $img.addClass('audio_press');
            });
            $img.on('touchend', function(){
                $img.removeClass('audio_press');

                var status = $img.attr('data-status'),
                    audio = $audio[0];
                if($img.hasClass('audio_playing')) {
                    audio.pause();
                    $img.removeClass('audio_playing');
                } else {
                    pauseAllAudio();
                    audio.currentTime = 0;
                    audio.play();
                    $img.addClass('audio_playing');
                }
                $audio.on('pause', function(){
                    $img.removeClass('audio_playing');
                });
            });
        });
    });

    //让所有音频暂停
    function pauseAllAudio(){
        try{
            $('.item img.audio').removeClass('audio_playing');
            $('.item audio').each(function(k, v){
                v.pause();
            });
        } catch(e){}
    }
    //预加载图片
    function preloadImages(links){
        links = $.isArray(links) ? links:[link];
        $.each(links, function(k, v){
            $('<img src="'+v+'" style="display:none;" />').on('load', function(){
                $(this).remove();
            }).appendTo(document.body);
        });
    }

    $(function(){
        preloadImages([
            'themes/images/audio_press.png',
            'themes/images/audio_playing.gif'
        ]);
    });
})();