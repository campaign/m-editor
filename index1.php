<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>手机端富文本编辑器</title>
    <script src="third-party/zepto.js"></script>
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
<div class="brief">
    简介：创新富文本编辑器，使得用户可以按照自己的思路、表达方式组织UGC内容。
</div>
<div class="editor_container">
    <div style="width:100%;min-height:200px;" class="editor_input" id="editor" >
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