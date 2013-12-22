<!doctype html>
<html lang="en">
<head>
<!--    <script src="http://172.21.204.88:8081/target/target-script-min.js"></script>-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>手机端富文本编辑器</title>
    <script src="third-party/zepto.js"></script>
    <script src="third-party/gmu/gmu.js"></script>
    <link rel="stylesheet" href="third-party/gmu/gmu.css"/>
    <link rel="stylesheet" href="./themes/reset.css"/>
    <link rel="stylesheet" href="./themes/umeditor.css"/>
</head>
<body>
<div class="content">
    <h1 class="pagebar">
        <a class="floatleft btn" href="index.php">返回</a>
        内容展示页
        <span class="blank floatright"></span>
    </h1>

    <div class="container">
        <div class="item">
            <div class="detail">
                <div class="floatleft">
                    <img class="photo" src="http://bs.baidu.com/editor/m-editor.png" />
                </div>
                <div class="floatleft">
                    <div><span class="name">手机端富文本编辑器</span></div>
                    <div><span class="time">今天 11:26</span></div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="post">
                <?php
                if (isset($_POST['content'])) {
                    echo $_POST['content'];
                } else if(isset($_GET['content'])) {
                    echo $_GET['content'];
                } else {
                    ?>
                    <p >
                        起初，我们几个人都感受到目前的ugc方式满足不了我们的需求。发出帖子后经常发现读我们帖子的读者不能够很好地感知到我们发帖者的心情而产生共鸣。于是我们三个人坐在一起讨论是不是有更好的技术、更好的设计可以解决这个问题：
                    </p>
                    <p>
                        <img src="themes/images/holder.png" controls="controls" _src="http://bs.baidu.com/editor/forever.mp3" class="audio">
                    </p>
                    <p >
                        <img src="http://bs.baidu.com/editor/13860393054882.png" style="width: 60px;height: 60px;margin-right: 2px"/><img src="http://bs.baidu.com/editor/13860393183683.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
                    </p>
                    <p >
                        通过几次的头脑风暴，我们分析出了目前设计和技术的使用痛点，以及有怎样好的优化思路：
                    </p>
                    <p >
                        <img src="http://bs.baidu.com/editor/13860393114231.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://bs.baidu.com/editor/13860393187216.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
                    </p>
                    <p >
                        之后，本着hackathon的行胜于言的理念，我们把思路实现成了可用的代码~期待为产品线的发展做出贡献
                    </p>
                    <p >
                        <img src="http://bs.baidu.com/editor/13860393112472.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://bs.baidu.com/editor/13860393105095.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://bs.baidu.com/editor/13860393134806.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
                    </p>
                <?php } ?>
            </div>
            <div class="opera">
                <a class="comment">评论</a>
                <a class="delete">删除</a>
                <span class="clearfix"></span>
            </div>
        </div>
    </div>
</div>

<script src="show.js"></script>
</body>
</html>