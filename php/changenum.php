<?php
//根据传入的id 和数量改变对应id值的数量
@require_once("config.php");

$id  = $_GET["id"];
$num = $_GET["num"];


$str = "update  myshopcar SET goodsnum = $num where  id=$id";

mysql_query($str);

$count = mysql_affected_rows();

$obj = array();
if($count > 0){
    $obj["code"] = 1;
    $obj["msg"] = "成功";
}else{  
    $obj["code"] = 0;
    $obj["msg"] = "失败"; 
}
echo json_encode($obj);
?>