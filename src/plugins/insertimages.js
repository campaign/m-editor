UM.commands['insertimages'] = {
    execCommand: function (command,images){
        var me = this,
            rng = me.selection.getRange(),start,
            bk = rng.createBookmark();

        function createImgsHtml(images){
            var html = [];
            $.each(images,function(key, img){
                var attrs = [];
                $.each(img,function(k,v){
                    attrs.push(' ' + k + '="' + v + '"');
                });
                html.push('<span ' + attrs.join(' ') + ' ></span>')
            })
            return html.join('') + ''
        }
        function getPreImg(node){
            while(node && domUtils.isWhitespace(node)){
                node = node.previousSibling
            }
            return node;
        }
        rng.txtToElmBoundary(true);
        start = bk.start.previousSibling;
        if(start && start.nodeName != 'IMG'){
            me.fireEvent('beforeinserthtml');
            domUtils.breakParent(bk.start,rng.startContainer);
            var $newline = $('<p><br/></p>');
            $newline.insertBefore(bk.start);
            $newline.html(createImgsHtml(images));
            rng.moveToBookmark(bk).setEndAfter($newline[0]).collapse().select();
            me.fireEvent('afterinserthtml');
        }else{
            end = end ? end.nextSibling:start.nextSibling;
            me.execCommand('insertHtml',createImgsHtml(images));
//            domUtils.breakParent(bk.start,rng.startContainer);
//            rng.moveToBookmark(bk).setEndAfter(end).collapse().select();
        }


    }
};
