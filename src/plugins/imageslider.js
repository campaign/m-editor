/*
 * 拖放文件到编辑器，上传并插入
 */
UM.plugins['imageslider'] = function() {
    var me = this,
        $sliderContainer;

    function showImageSlider(){
        if(!$sliderContainer) {
            $sliderContainer = $('<div>');
        }
        $sliderContainer.html();
        me.$body.find('img.slider').each(function(){
            $('<div><img src="' + $(this).attr('src') + '" /></div>').appendTo($sliderContainer);
        });

        $sliderContainer.css({width:'100%', height:'100%'}).appendTo(document.body);
        $sliderContainer.slider({imgZoom: true});
    }
    function hideImageSlider(){
        $sliderContainer.remove().destroy();
    }

    me.addListener('showimageslider', function(type, current){
        showImageSlider();
    });
    me.addListener('hideImageSlider', function(type, current){
        hideImageSlider();
    });

    me.addListener('ready', function(){
        me.$body.on('click',function (e) {
            var $target = $(e.target);
            if($target.attr('tagName') == 'IMG' && $target.hasClass('slider')) {
                me.fireEvent('showimageslider', e.target);
            }
        });
    });
};