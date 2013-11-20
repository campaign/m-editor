UM.plugins.toolbar = function(){
    var me = this,
        menu;

    function hideKeyboard(){
        var range = me.selection.getRange();
        me._bakRange = range;
        var $input = $('<input>').css({position:'absolute', top:window.pageY,left:0}).appendTo(document.body);
        $input.focus();
        $input.remove()

    }

    function Menu(){
        var _this = this;

        /* 初始化俩个dom元素 */
        this.$menu = $('<div class="edui-menu" style="z-index:' + (me.getOpt('zIndex') + 100000) + '"><span class="edui-menu-plus"></div>').hide().appendTo(me.document.body);
        this.$toolbar = $('<div class="edui-toolbar">').hide().appendTo(me.document.body);

        /* menu按钮的点击事件 */
        this.toolbarState = false;
        this.$menu.on('click', function(e){

            setTimeout(function(){
                if(_this.toolbarState) {
                    _this.$menu.removeClass('edui-menu-active');
                    _this.hideToolbar();
                } else {
                    _this.$menu.addClass('edui-menu-active');
                    _this.showToolbar();
                }
            },50)

        });

        /* 初始化toolbar */
        this.$toolbar.html('<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-photo"><input type="file" name="photo" id="photo" accept="image/*" multiple="multiple" /></span></a>' +
            '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-camera"><input type="file" name="camera" id="camera" accept="image/*" /></span></a>' +
            '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-emotion"></span></a>' +
            '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-record"></span></a>' +
            '<a href="javascript:void(0)" class="edui-btn"><span class="edui-btn-remind"></span></a>');

        this.$toolbar.find('.edui-btn').on('touchstart', function(){
                $(this).addClass('edui-btn-active');
            }).on('touchend', function(){
                $(this).removeClass('edui-btn-active');
            });

        /* 初始化toolbar上按钮的事件 */
        initToolBarEvent();
        function initToolBarEvent () {
            var $toolbar = _this.$toolbar;
            $toolbar.find('.edui-btn-photo input[type=file],.edui-btn-camera input[type=file]').change(function(e){
                var i = 0,
                    count = e.target.files && e.target.files.length,
                    imgArr = [];

                var fileList = e.target.files,spans=[];
                if(fileList) {
                    $.each(fileList, function (i, f) {
                        spans.push({
                            id:'_me_image',
                            'style':'width:60px;height:60px;border:1px solid #ccc;margin-right:2px;display:inline-block;'
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
                                $('<img class="slider" src="'+this.src+'" style="width:60px;height:60px;margin-right:2px;"/>').insertBefore($('#_me_image',me.document))
                                $('#_me_image',me.document).remove();
                                $(this).remove();
                                me.blur();
                            })
                    }
                });
                me.blur();
            });

            $toolbar.find('.edui-btn-record input[type=file]').change(function(e){
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

            $toolbar.find('.edui-btn-emotion').click(function(){
                me.execCommand('insertHtml', '<span id="_me_emotion" style="width:20px;height:20px;border:1px solid #ccc;display:inline-block"></span>',false,true);

                $('<img src="http://bs.baidu.com/uploadimg/86961384265701.gif" style="display:none;"/>').appendTo(document.body)
                    .on('load',function(){

                        var $img = $('<img class="emotion" src="http://bs.baidu.com/uploadimg/86961384265701.gif" />').insertBefore($('#_me_emotion',me.document));
                        $('#_me_emotion',me.document).remove();
                        $(this).remove();

                        me.selection.getRange().setStartAfter($img[0]).collapse(true).select();
                        setTimeout(function(){
                            window.scrollTo(0,$img.offset().top -100)
                        })

                    });

            });
            $toolbar.find('.edui-btn-record').click(function(){ });
            $toolbar.find('.edui-btn-remind').click(function(){
                me.execCommand('inserthtml', '<a href="http://tieba.baidu.com/home/main?un=ueditor">@ueditor</a>&nbsp;');
            });
        }
    }
    Menu.prototype = {
        updatePositon: function(){
            /* 显示menu */
            this.$menu.css({
                top: window.pageYOffset + 6,
                right: 4
            });
            /* 设置toolbar的位置 */
            this.$toolbar.css({
                top: window.pageYOffset + window.innerHeight - 41,
                right: 0
            });
        },
        show: function () {
            this.hideToolbar();
            this.updatePositon();
            this.$menu.removeClass('edui-menu-active');
            this.$menu.show();
        },
        hide: function () {
//            this.$menu.hide();
//            this.hideToolbar();
        },
        showToolbar: function(){
            this.toolbarState = true;
            this.updatePositon();
            this.$toolbar.show();
        },
        hideToolbar: function(){
            this.toolbarState = false;
            this.$toolbar.hide();
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

    me.addListener('showpopup', function (type, top, left) {
        menu = menu || new Menu();
        if(me.isFocus()){
            menu.show();
        }
    });
    me.addListener('hidepopup', function (type, top, left) {
        menu && menu.hide();
    });
    $(window).on('scroll', function (type, top, left) {
        menu && menu.hide();
        setTimeout(function(){
            if(me.isFocus()){
                menu && menu.show();
                menu && menu.updatePositon()
            }

        },2000)
    });
    me.ready(function(){
        $(me.body).on('blur',function(){
            menu.updatePositon();
        })
    })

};