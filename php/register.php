<?php
//用户注册
@require_once("config.php");
$username = $_GET["username"];
$userpwd = $_GET["userpwd"];
$usertel = $_GET["usertel"];
$stryan = "select * from  userinfo where username = '$username'  or usertel='$usertel'" ;
$resultyan = mysql_query($stryan);
$itemyan = mysql_fetch_array($resultyan);

$obj = array();

if($itemyan){
    $obj["code"] = 0;
    $obj["msg"] = "用户名或者手机号已经存在";
}else{
    $str = "insert  into  userinfo(username,userpwd,usertel) VALUES('$username','$userpwd','$usertel')";
    mysql_query($str);
    $count = mysql_affected_rows();
    if($count > 0){
        $obj["code"] =1;
        $obj["msg"] = "注册成功";
    }else{
        $obj["code"] = 0;
        $obj["msg"]  = "注册失败";
    }

}
echo json_encode($obj);

?>
  