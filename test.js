
var editor = new UM.Editor();
editor.render('editor')

$('.edui-btn-photo input[type=file],.edui-btn-camera input[type=file]').change(function(e){
    try{
        //获取文件列表
        var me = editor,
            fileList = e.target.files,
            hasImg = false;
        if(fileList) {
            $.each(fileList, function (i, f) {
                if (/^image/.test(f.type)) {

                    //模拟数据
                    var fd = new FormData();
                    fd.append(me.getOpt('imageFieldName') || 'upfile', f);
                    fd.append('type', 'ajax');
                    $.ajax({
                        type: 'post',
                        url: me.getOpt('imageUrl'),
                        data: fd,
                        contentType:false,
                        processData:false,
                        success:function(data){
                            $('#message').html('response: ' + data);
                            var picLink = me.getOpt('imagePath') + data;
                            if(picLink) {
                                me.execCommand('inserthtml', '<img class="slider" src="' + picLink + '" width="60" height="60" style="border:1px #ccc solid;margin-right:2px;">');
                            }
                        }
                    })

                    hasImg = true;
                }
            });
            if(hasImg) e.preventDefault();
        }
    }catch(e){}
});

/*
$('.edui-btn-record input[type=file]').change(function(e){
    try{
        //获取文件列表
        var me = editor,
            fileList = e.target.files,
            hasImg = false;
        if(fileList) {
            $.each(fileList, function (i, f) {
                if (/^audio/.test(f.type)) {

                    //模拟数据
                    var fd = new FormData();
                    fd.append(me.getOpt('imageFieldName') || 'upfile', f);
                    fd.append('type', 'ajax');
                    $.ajax({
                        type: 'post',
                        url: me.getOpt('imageUrl'),
                        data: fd,
                        contentType:false,
                        processData:false,
                        success:function(data){
                            $('#message').html('response: ' + data);
                            var musicLink = me.getOpt('imagePath') + data;
                            if(musicLink) {
                                me.execCommand('inserthtml', '<audio src="' + musicLink + '" controls="controls" style="width:280px;">你的浏览器不支持audio标签</audio>');
                            }
                        }
                    })

                    hasImg = true;
                }
            });
            if(hasImg) e.preventDefault();
        }
    }catch(e){}
});
*/
$('.edui-btn-emotion').click(function(){
    editor.execCommand('inserthtml', '<img class="emotion" src="http://bs.baidu.com/uploadimg/86961384265701.gif" />');
});
//    $('.edui-btn-record').click(function(){ });
$('.edui-btn-remind').click(function(){
    editor.execCommand('inserthtml', '<a href="http://tieba.baidu.com/home/main?un=ueditor">@ueditor</a>&nbsp;');
});