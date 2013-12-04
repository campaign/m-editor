<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>M-Editor内容展示页</title>
    <script src="third-party/zepto.js"></script>
    <script src="third-party/gmu/gmu.js"></script>
    <link rel="stylesheet" href="third-party/gmu/gmu.css"/>
    <link rel="stylesheet" href="./themes/reset.css"/>
    <link rel="stylesheet" href="./themes/umeditor.css"/>
</head>
<body>
<div class="content">
    <h1 class="pagebar">
        <a class="floatleft btn" href="javascript:history.back();">返回</a>
<!--        <a class="floatleft btn" href="empty.php">返回</a>-->
        内容展示页
        <span class="blank floatright"></span>
    </h1>

    <div class="container">
        <div class="item">
            <div class="author">
                <img class="photo" src="http://weditor.duapp.com/php/upload/20131203/13860406433898.jpg" />
                <span class="name">起个很长很长很长的昵称:</span>
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
                    <p >
                        <img src="http://weditor.duapp.com/php/upload/20131203/13860393054882.png" style="width: 60px;height: 60px;margin-right: 2px"/><img src="http://weditor.duapp.com/php/upload/20131203/13860393183683.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
                    </p>
                    <p >
                        通过几次的头脑风暴，我们分析出了目前设计和技术的使用痛点，以及有怎样好的优化思路：
                    </p>
                    <p >
                        <img src="http://weditor.duapp.com/php/upload/20131203/13860393114231.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://weditor.duapp.com/php/upload/20131203/13860393187216.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
                    </p>
                    <p >
                        之后，本着hackathon的行胜于言的理念，我们把思路实现成了可用的代码~期待为产品线的发展做出贡献
                    </p>
                    <p >
                        <img src="http://weditor.duapp.com/php/upload/20131203/13860393112472.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://weditor.duapp.com/php/upload/20131203/13860393105095.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/><img src="http://weditor.duapp.com/php/upload/20131203/13860393134806.png" style="font-size: 1em;width: 60px;height: 60px;margin-right: 2px"/>
                    </p>
                <?php } ?>
            </div>
            <div class="detail">
                <span class="time">今天 11:06</span>
                <a class="comment">评论</a>
                <a class="delete">删除</a>
                <span class="clearfix"></span>
            </div>
        </div>
        <div class="item"> <div class="author"><img class="photo" src="http://weditor.duapp.com/php/upload/20131203/13860406433898.jpg" /> <span class="name">起个很长很长很长的昵称:</span> </div> <div class="post"> m-editor.</div> <div class="detail"> <span class="time">今天 11:05</span> <a class="comment">评论</a> <a class="delete">删除</a> <span class="clearfix"></span> </div> </div>
        <div class="item"> <div class="author"><img class="photo" src="http://weditor.duapp.com/php/upload/20131203/13860406433898.jpg" /> <span class="name">起个很长很长很长的昵称:</span> </div> <div class="post"> world</div> <div class="detail"> <span class="time">今天 10:02</span> <a class="comment">评论</a> <a class="delete">删除</a> <span class="clearfix"></span> </div> </div>
        <div class="item"> <div class="author"><img class="photo" src="http://weditor.duapp.com/php/upload/20131203/13860406433898.jpg" /> <span class="name">起个很长很长很长的昵称:</span> </div> <div class="post"> hello</div> <div class="detail"> <span class="time">今天 10:01</span> <a class="comment">评论</a> <a class="delete">删除</a> <span class="clearfix"></span> </div> </div>
    </div>
</div>

<script>
    $('.item').each(function(i, p){
        var $imgs = $(p).find('.post img'),
            links = [];
        $imgs.each(function(j, img){
            links.push( $(img).attr('src') );
        });
        $imgs.click(function(){
//            slider(links);
        });
    });
</script>
</body>
</html>