UM.commands['insertimages'] = {
    execCommand: function (command,images){
        var me = this,
            rng = me.selection.getRange(),start,
            bookmark = rng.createBookmark();

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
        start = getPreImg(rng.startContainer.childNodes[rng.startOffset]||rng.startContainer.childNodes[rng.startOffset-1]);
        if(start && start.nodeName != 'IMG'){
            me.fireEvent('beforeinserthtml');
            // var bk = rng.createBookmark();
            var bk = bookmark;
            domUtils.breakParent(bk.start,rng.startContainer);
            var $newline = $('<p><br/></p>');
            $newline.insertBefore(bk.start);
            $newline.html(createImgsHtml(images));
            rng.moveToBookmark(bk).setStartAtLast($newline[0]).setCursor(false,true);
            me.fireEvent('afterinserthtml');
        }else{
            me.execCommand('insertHtml',createImgsHtml(images))
        }


    }
};
