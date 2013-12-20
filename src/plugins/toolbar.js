UM.plugins.toolbar = function(){
    var me = this;

    var Toolbar = function (){
        this.init();
        this.initEvent();
    };
    Toolbar.prototype = {
        init: function(){
            /* 初始化俩个dom元素 */
            this.$root = $('<div class="edui-toolbar" style="position:fixed;">').hide().appendTo(me.document.body);

            /* 初始化toolbar */
            this.$root.html('<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-photo"><input type="file" name="photo" id="photo" accept="image/*" multiple="multiple" /></span></a>' +
                '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-camera"><input type="file" name="camera" id="camera" accept="image/*" /></span></a>' +
                '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-emotion"></span></a>' +
                '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-record"></span></a>' +
                '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-remind"></span></a>');
        },
        initEvent: function(){
            var $root = this.$root;

            $root.find('.edui-btn').on('touchstart', function(){
                    $(this).addClass('edui-btn-active');
                }).on('touchend', function(){
                    $(this).removeClass('edui-btn-active');
                });

            $root.find('.edui-btn-photo input[type=file],.edui-btn-camera input[type=file]').change(function(e){

                var fileList = e.target.files,spans=[],
                    holderId = '_me_image_' + (+new Date());

                if(fileList) {
                    $.each(fileList, function (i, f) {
                        spans.push({
                            id:holderId,
                            'style':'width:60px;height:60px;border:1px solid #ccc;margin-right:2px;padding:0;marigin:0'
                        })
                    });
                    me.execCommand('insertimages', spans);
                }
                sendFile(e, function(xhr){
                    var data = xhr.responseText;
                    $('#message').html('response: ' + data);
                    var picLink = me.getOpt('uploadPath') + data;
                    if(picLink) {
                        $('<img src="'+picLink+'" style="display:none;"/>').appendTo(document.body)
                            .on('load',function(){
                                $('<img class="slider" src="'+this.src+'" style="width:60px;height:60px;margin-right:2px;"/>').insertBefore($('#'+holderId,me.document))
                                $('#'+holderId,me.document).remove();
                                $(this).remove();
                                me.blur();
                            })
                    }
                });
                me.blur();
            });

            $root.find('.edui-btn-record input[type=file]').change(function(e){
                sendFile(e, function(xhr){
                    var data = xhr.responseText;
                    $('#message').html('response: ' + data);
                    var musicLink = me.getOpt('uploadPath') + data;
                    if(musicLink) {
                        me.execCommand('inserthtml', '<audio src="' + musicLink + '" controls="controls" style="width:100px;">浏览器不支持audio标签</audio>');
                    }
                });
                me.blur();
            });

            $root.find('.edui-btn-emotion').click(function(){
                var holderId = '_me_emotion_' + (+new Date());
                me.execCommand('insertHtml', '<span id="'+holderId+'" style="width:20px;height:20px;border:1px solid #ccc;display:inline-block"></span>',false,true);

                $('<img src="http://bs.baidu.com/uploadimg/86961384265701.gif" style="display:none;"/>').appendTo(document.body)
                    .on('load',function(){

                        var $img = $('<img class="emotion" src="http://bs.baidu.com/uploadimg/86961384265701.gif" />').insertBefore($('#'+holderId,me.document));
                        $('#'+holderId,me.document).remove();
                        $(this).remove();

                        me.selection.getRange().setStartAfter($img[0]).collapse(true).select();
                        setTimeout(function(){
                            window.scrollTo(0,$img.offset().top -100)
                        })

                    });

            });
            $root.find('.edui-btn-record').click(function(){ });
            $root.find('.edui-btn-remind').click(function(){
                me.execCommand('inserthtml', '<a href="http://tieba.baidu.com/home/main?un=ueditor">@ueditor</a>&nbsp;');
            });
        },
        updatePositon: function(){
            /* 设置toolbar的位置 */
            var top = me.$body.offset().top;
            if(window.pageYOffset <= top - 47){
                this.$root.css({
                    top: top - 47,// + (/^7/.test($.os.version) ? 210 : 156) - (isShowState ? (/^7/.test($.os.version) ? 35 : 42) : 0),
                    right: 0
                });
            }else{
                this.$root.css({
                    top: window.pageYOffset,// + (/^7/.test($.os.version) ? 210 : 156) - (isShowState ? (/^7/.test($.os.version) ? 35 : 42) : 0),
                    right: 0,
                    position:'absolute'
                });
            }
        },
        show: function () {
            this.toolbarState = true;
            this.updatePositon();
            this.$root.show();
            this.updatePositon();
        },
        hide: function () {
            this.toolbarState = false;
            this.$root.hide();
        }
    }

    function sendFile(e, callback){
        //获取文件列表
        var fileList = e.target.files,
            hasImg = false;
        if(fileList) {
            $.each(fileList, function (i, f) {
                //模拟数据
                var fd = new FormData();
                fd.append(me.getOpt('imageFieldName') || 'upfile', f);
                fd.append('type', 'ajax');

                $.ajax({
                    type: 'post',
                    url: me.getOpt('uploadUrl'),
                    data: fd,
                    contentType:false,
                    processData:false,
                    complete:callback
                })
                hasImg = true;
            });
            if(hasImg) e.preventDefault();
        }
    }

    me.ready(function(){
        var timer,
            toolbar = toolbar || new Toolbar();

        me.addListener('showpopup', function (type, isFireByFocus) {
            if(isFireByFocus || me.isFocus()){
                toolbar.show();
            }
        });
        me.addListener('hidepopup', function (type, top, left) {
            toolbar.hide();
        });

        $(window).on('scroll', function (type, top, left) {
            clearTimeout(timer);
//            toolbar.hide();
            timer = setTimeout(function(){
                if(me.isFocus()){

                    if(!toolbar.toolbarState){
                        toolbar.show()
                    }else{
                        toolbar.updatePositon()
                    }

                }
            },300)
        });

        me.$body.on('touchmove',function(e){
            toolbar.hide()
        });

        me.addListener('blur', function(e){
            try{
                me.selection.getNative().getRangeAt(0);
            }catch (e){
                toolbar.hide();
            }
        });
    })

};