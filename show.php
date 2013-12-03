<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>M-Editor内容展示页</title>
    <script src="third-party/zepto.js"></script>
    <style>
        .content{
            max-width: 300px;
        }
        .author .photo{

        }
        .author .name{
            font-size:14px;
            color: #0145a5;
        }
        .post {
            word-wrap: break-word;
            -webkit-appearance: none;
            -webkit-border-radius: 3px;
            width: 100%;
            padding: 10px;
            -webkit-box-sizing: border-box;
            display: block;
            font-size: 1em;
            border: 1px solid #c6c6c6;
            font-weight: 600;
            color: #999;
        }
        .post p{
            margin:0;
            padding:0;
        }
    </style>
</head>
<body>
<div class="content">
    <div class="author">
        <img class="photo" src="http://weditor.duapp.com/php/upload/20131203/13860406433898.jpg" alt="" width="32" heigth="32"/>
        <span class="name">Jinqn</span>
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
        <p>
            <br/>
        </p>
    <?php } ?>
    </div>
</div>
</body>
</html>