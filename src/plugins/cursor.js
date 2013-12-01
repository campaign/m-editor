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
    me.addListener('blur',function(e){

        me.fireEvent('hidepopup')
    });
    me.ready(function(){
        me.$body.on('compositionstart',function(){

            me.fireEvent('compositionchange',true)
        });
        me.$body.on('compositionend',function(){

            me.fireEvent('compositionchange',false)
        })
    });
};