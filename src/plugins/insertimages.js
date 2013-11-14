UM.commands['insertimages'] = {
    execCommand: function (command,images){
        var me = this,
            rng = me.selection.getRange(),start;

        function createImgsHtml(images){
            var html = [];
            $.each(images,function(key, img){
                var attrs = [];
                $.each(img,function(k,v){
                    attrs.push(' ' + k + '="' + v + '"');
                });
                html.push('<img ' + attrs.join(' ') + ' />')
            })
            return html.join('')
        }
        rng.txtToElmBoundary();
        start = rng.startContainer.childNodes[rng.startOffset-1];
        if(start && start.nodeName != 'IMG'){
            start = start.nextSibling;
            var $newline = $('<p><br/></p>');
            if(start){
                domUtils.breakParent(start,start.parentNode);
                $newline.insertBefore(start.parentNode);
            }else{
                $newline.insertAfter(start.parentNode);
            }
            $newline.html(createImgsHtml(images));
            rng.setStartAtLast($newline[0]).setCursor(false,true);

        }else{
            me.execCommand('insertHtml',createImgsHtml(images))
        }

    }
};
