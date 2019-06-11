<?php

//  删除我的购物车里面的数据的东西
@require_once("config.php");

$id = $_GET["id"];

$str = "delete from  myshopcar  where id =$id";
mysql_query($str);

$count = mysql_affected_rows();
 // $count = mysql_affected_rows();

$obj = array();
if($count>0){
    $obj["code"] =1 ;
    $obj["msg"] = "删除成功";
}else{
    $obj["obj"] =  0;
    $obj["msg"] = "删除失败";
}

echo json_encode($obj);
?>