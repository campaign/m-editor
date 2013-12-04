<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>手机端富文本编辑器</title>
    <script src="third-party/zepto.js"></script>
    <script src="third-party/gmu/gmu.js"></script>
    <link rel="stylesheet" href="third-party/gmu/gmu.css"/>

    <script src="umeditor.config.js"></script>
    <script src="editor_api.js"></script>
    <script src="lang/zh-cn/zh-cn.js"></script>
    <link rel="stylesheet" href="./themes/reset.css"/>
    <link rel="stylesheet" href="./themes/umeditor.css"/>
</head>
<body>
<h1 class="pagebar">
    <span class="blank floatleft"></span>
    移动端富文本编辑器
    <form action="show.php" class="form" id="form" method="post">
        <input type="hidden" name="content" id="content" class="" />
        <a class="editor_submit floatright btn" id="submit">提交</a>
    </form>
</h1>
<div class="editor_container">
    <div style="width:100%;min-height:200px;" class="editor_input" id="editor" >
        <p >
            起初，我们几个人都感受到目前的ugc方式满足不了我们的需求。发出帖子后经常发现读我们帖子的读者不能够很好地感知到我们发帖者的心情而产生共鸣。于是我们三个人坐在一起讨论是不是有更好的技术、更好的设计可以解决这个问题：
        </p>
        <p >
            <img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393054882.png" style="width: 60px;height: 60px;margin-right: 2px"/><img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393183683.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
        </p>
        <p >
            通过几次的头脑风暴，我们分析出了目前设计和技术的使用痛点，以及有怎样好的优化思路：
        </p>
        <p >
            <img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393114231.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393187216.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
        </p>
        <p >
            之后，本着hackathon的行胜于言的理念，我们把思路实现成了可用的代码~期待为产品线的发展做出贡献
        </p>
        <p >
            <img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393112472.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393105095.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://campaign.github.io/m-editor/php/upload/20131203/13860393134806.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
        </p>
    </div>
    <div>
        <a href="javascript:clear()" class="cleardoc">清空内容</a>
    </div>
</div>
<script>
    var editor = new UM.Editor();
    editor.render('editor');

    $('#submit').click(function(){
        $('#content').val(editor.getContent());
        $('#form').submit();
    });

    function clear(){
        editor.setContent('');
    }
</script>

</body>
</html>