<?php

//登陆判断页面
@require_once("config.php");

$key = $_GET["username"];
$userpwd = $_GET["userpwd"];

$str = "select * from userinfo where username='$key' or usertel='$key'";

$result = mysql_query($str);
$item = mysql_fetch_array($result);

$obj = array();
if($item){
    if($item["userpwd"] == $userpwd){
        $obj["code"] = 1;
        $obj["msg"] = "登陆成功";
        $obj["userid"] = $item["id"];
    }else{
        $obj["code"] = 0;
        $obj["msg"] = "用户名和密码不一致";
    }
}else{
    $obj["code"]=0;
    $obj["msg"] = "用户名不存在";
}

echo json_encode($obj);

?>