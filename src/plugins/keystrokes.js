///import core
/**
 * @description 插入内容
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     inserthtml插入内容的命令
 * @param   {String}   html                要插入的内容
 * @author zhanyi
 */
UM.plugins['keystrokes'] = function(){
    var me = this;

    // 判断浏览器是Android系统浏览器
    if(browser.webkit == true && navigator.appVersion.indexOf('Android')!=-1) {
        me.addListener('ready', function(){
            me.$body.on('keydown', function(e){
                var keyCode = e.keyCode || e.which;
                // 处理删除图片的bug
                if(keyCode == 8) {
//                    var img, current, range = me.selection.getRange();
//                    range.trimBoundary();
//
//
//                    console.log('range');
//                    for(var i = range.startOffset - 1; i>=0; i--){
//                        console.log('i: ' + i);
//                        current = range.startContainer.childNodes[i];
//                        console.log(current);
//                        if(current.tagName == 'IMG') {
//                            console.log('IMG');
//                            img = current;
//                        } else if(current.nodeType==3 && utils.trim(current.textContent).replace(/^\s*/, "").replace(domUtils.fillChar, "") == "") {
//                            console.log('textNode');
//                            domUtils.remove(current);
//                            continue;
//                        }
//                        console.log('true: ' + current.nodeType==3 && utils.trim(current.textContent) == '' ? "true":"false" +
//                            '; nodeType:' + current.nodeType + '; textContent:' + current.textContent + '; charCode:' + current.textContent.charCodeAt(0) +
//                            ';' + (domUtils.isFillChar(current.textContent.charAt(0)) ? "isFillChar":"notFillChar"));
//
//                        console.log('------------------');
//                        break;
//                    }
//                    console.log('=======================');
//                    if(img) {
//                        range.setStartBefore(img).collapse(true).select();
//                        domUtils.remove(img);
//                    }
                }
            });
        });
    }
};