<?php

//购物车里面获取数据
@require_once("config.php");
$userid = $_GET["userid"];

$str = "select * from myshopcar where userid = $userid";

$result = mysql_query($str);

$list = array();

while($item = mysql_fetch_array($result)){
    //用户id值不需要
    $obj = array();
    $obj["id"] = $item["id"];
    $obj["goodsid"] = $item["goodsid"];
    $obj["goodsname"]=$item["goodsname"];
    $obj["goodsnum"]=$item["goodsnum"];
    $obj["goodsprice"]=$item["goodsprice"];
    $obj["goodsimg"]=$item["goodsimg"];
    $list[] = $obj;
}
echo json_encode($list);

?>