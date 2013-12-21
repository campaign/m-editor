<?php
header("Content-Type:text/html;charset=utf-8");
error_reporting( E_ERROR | E_WARNING );
date_default_timezone_set("Asia/chongqing");
include "Uploader.class.php";

//print_r($_FILES);
//echo $_FILES['upfile']['name'].'-';
//echo $_FILES['upfile']['size'].'-';
//echo $_FILES['upfile']['tmp_name'].'-';
//echo filesize($_FILES['upfile']['tmp_name']).'-';

//上传配置
$config = array(
    "savePath" => "upload/" ,             //存储文件夹
    "maxSize" => 10000 ,                   //允许的文件最大尺寸，单位KB
    "allowFiles" => array( ".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp", ".mp3", ".m4a", ".wav", ".wma", ".ogg" )  //允许的文件格式
);
//上传文件目录
$Path = "upload/";

//背景保存在临时目录中
$config[ "savePath" ] = $Path;
$up = new Uploader( "upfile" , $config );
$type = $_POST['type'];
$editorId=$_GET['editorid'];

$info = $up->getFileInfo();
/**
 * 返回数据，调用父页面的ue_callback回调
 */
echo $info[ "url" ];


