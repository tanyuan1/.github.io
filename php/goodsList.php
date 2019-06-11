<?php

// 商品详情页面
@require_once("config.php");
$skipnum = $_GET["skipnum"];
$shownum = $_GET["shownum"];
$str = "select * from  goodslist limit $skipnum,$shownum";
$result = mysql_query($str);

$list = array();
while($item=mysql_fetch_array($result)){
    $obj = array();
    $obj["id"] = $item["id"];
    $obj["goodsname"]=$item["goodsname"];
    $obj["goodsnum"]=$item["goodsnum"];
    $obj["goodsprice"]=$item["goodsprice"];
    $obj["goodsimg"]=$item["goodsimg"];
    $obj["goodsohter"]=$item["goodsohter"];
    $list[]= $obj;
}
echo json_encode($list);

?>