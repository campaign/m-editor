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
    me.addListener('keydown beforeinserthtml',function(e){
        me.fireEvent('hidepopup');
        clearTimeout(showtimer);
    });
    me.addListener('keyup afterinserthtml focus',function(e){
        clearTimeout(showtimer);
        showtimer = setTimeout(function(){
            var offset = getOffset();
            me.fireEvent('showpopup',offset.top,offset.left)
        },1000)
    });
};