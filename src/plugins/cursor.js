UM.plugins.cursor = function(){
    var me = this,
        showtimer;
    function getOffset(){
        var rng = me.selection.getRange();
        var bk = rng.createBookmark();
        var offset = $(bk.start).css('display','').offset();
        rng.moveToBookmark(bk).select();
        return offset;
    }
    me.addListener('focus',function(e){
        me.fireEvent('showpopup')
    });
//    me.addListener('blur',function(e){
//        me.fireEvent('hidepopup')
//    });
    me.ready(function(){
        me.$body.on('swipeLeft',function(){
           var rng = me.selection.getRange();
            var preOffset = rng.startOffset -1;
            if(preOffset < 0){
                rng.setStart(rng.startContainer.previousSibling,rng.startContainer.previousSibling.nodeValue.length-2)
            }else{
                rng.setStart(rng.startContainer,rng.startOffset -1)
            }
            rng.collapse(true).select();
        })
        me.$body.on('swipeRight',function(){
            var rng = me.selection.getRange();
            var preOffset = rng.startOffset +1;
            if(preOffset == rng.startContainer.nodeValue.length){
                rng.setStart(rng.startContainer.nextSibling,1)
            }else{
                rng.setStart(rng.startContainer,rng.startOffset +1)
            }
            rng.collapse(true).select();

        })
    });
};