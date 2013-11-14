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
            _this.toolbarState ? _this.hideToolbar():_this.showToolbar();
        });

        /* 初始化toolbar */
        this.$toolbar.html('<a href="javascript:void(0)" class="edui-btn edui-btn-photo"><input type="file" name="photo" id="photo" accept="image/*" multiple="multiple" /></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-emotion"></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-camera"><input type="file" name="camera" id="camera" accept="image/*" /></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-record"><input type="file" name="record" id="record" accept="audio/*" /></a>' +
            '<a href="javascript:void(0)" class="edui-btn edui-btn-remind"></a>');

        /* 初始化toolbar上按钮的事件 */
        initToolBarEvent();
        function initToolBarEvent () {
            var $toolbar = _this.$toolbar;
            $toolbar.find('.edui-btn-photo input[type=file],.edui-btn-camera input[type=file]').change(function(e){
                var i = 0,
                    count = e.target.files && e.target.files.length,
                    imgArr = [];
                sendFile(e, function(xhr){
                    var data = xhr.responseText;
                    $('#message').html('response: ' + data);
                    var picLink = me.getOpt('imagePath') + data;
                    if(picLink) {
                        imgArr.push({
                            'class': 'slider',
                            'src': picLink,
                            'width': 60,
                            'height': 60,
                            'style': 'border:1px #ccc solid;margin-right:2px;'
                        });

                        (++i >= count) && me.execCommand('insertimages', imgArr);
                    }
                });
            });


            $toolbar.find('.edui-btn-record input[type=file]').change(function(e){
                sendFile(e, function(xhr){
                    var data = xhr.responseText;
                    $('#message').html('response: ' + data);
                    var musicLink = me.getOpt('imagePath') + data;
                    if(musicLink) {
                        me.execCommand('inserthtml', '<audio src="' + musicLink + '" controls="controls" style="width:280px;">你的浏览器不支持audio标签</audio>');
                    }
                });
            });

            $toolbar.find('.edui-btn-emotion').click(function(){
                me.execCommand('inserthtml', '<img class="emotion" src="http://bs.baidu.com/uploadimg/86961384265701.gif" />');
            });
                $toolbar.find('.edui-btn-record').click(function(){ });
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
                left: Math.max(0, Math.min(left, $(me.document).width() - 35))
            }).show();
            /* 设置toolbar的位置 */
            this.$toolbar.css({
                top: top + 30,
                left: Math.max(0, Math.min(left + 10, $(me.document).width() - 170))
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
                    url: me.getOpt('imageUrl'),
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
        menu.show(top - 7, left + 3);
    });
    me.addListener('hidepopup', function (type, top, left) {
        menu && menu.hide();
    });
};