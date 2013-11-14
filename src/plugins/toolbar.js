UM.plugins.toolbar = function(){
    var me = this,
        menu;

    function Menu(){
        var _this = this;

        /* 初始化靓俩个dom元素 */
        this.$menu = $('<div class="edui-menu">').hide().appendTo(me.document.body);
        this.$toolbar = $('<div class="edui-toolbar">').hide().appendTo(me.document.body);

        /* menu按钮的点击事件 */
        this.toolbarState = false;
        this.$menu.on('tap', function(){
            this.toolbarState ? _this.hideToolbar():_this.showToolbar();
        });
        /* toolbar的点击事件 */
        this.$toolbar.on('tap', function(){
            _this.hide();
        });

        /* 初始化toolbar */
        this.$toolbar.html('<a href="javascript:void(0)" class="edui-btn edui-btn-photo"><input type="file" name="photo" id="photo" accept="image/*" multiple="multiple" /></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-camera"><input type="file" name="camera" id="camera" accept="image/*" /></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-record"><!--<input type="file" name="record" id="record" accept="audio/*" />--></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-emotion"></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-remind"></a>');

        /* 初始化toolbar上按钮的事件 */
        initToolBarEvent();
        function initToolBarEvent () {
            var $toolbar = _this.$toolbar;
            $toolbar.find('.edui-btn-photo input[type=file],.edui-btn-camera input[type=file]').change(function(e){
                try{
                    //获取文件列表
                    var fileList = e.target.files,
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
                                            me.execCommand('insertimages', [{
                                                'class': 'slider',
                                                'src': picLink,
                                                'width': 60,
                                                'height': 60,
                                                'style': 'border:1px #ccc solid;margin-right:2px;'
                                            }]);
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
            $toolbar.find('.edui-btn-record input[type=file]').change(function(e){
                try{
                    //获取文件列表
                    var fileList = e.target.files,
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
            $toolbar.find('.edui-btn-emotion').click(function(){
                me.execCommand('inserthtml', '<img class="emotion" src="http://bs.baidu.com/uploadimg/86961384265701.gif" />');
            });
            //    $toolbar.find('.edui-btn-record').click(function(){ });
            $toolbar.find('.edui-btn-remind').click(function(){
                me.execCommand('inserthtml', '<a href="http://tieba.baidu.com/home/main?un=ueditor">@ueditor</a>&nbsp;');
            });
        }
    }
    Menu.prototype = {
        show: function (top, left) {
            this.hideToolbar();

            /* 显示menu */
            this.$menu.css({
                top: top,
                left: left
            }).show();
            /* 设置toolbar的位置 */
            this.$toolbar.css({
                top: top + 20,
                left: left + 10
            });

            /* 点击其他地方隐藏menu和toolbar */
            $(document).on('tap scroll click', function(){

            });
        },
        hide: function () {
            this.$menu.hide();
            this.hideToolbar();
        },
        showToolbar: function(){
            this.toolbarState = true;
            this.$toolbar.show();
        },
        hideToolbar: function(){
            this.toolbarState = false;
            this.$toolbar.hide();
        }
    }

    me.addListener('showpopup', function (type, top, left) {
        menu = menu || new Menu();
        menu.show(top - 4, left + 3);
    });
};