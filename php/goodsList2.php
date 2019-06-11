<?php

// 商品详情页面
@require_once("config.php");
$key =  $_GET["key"];
$paixu = $_GET["paixu"];
$rank = $_GET["rank"];
$skipnum = $_GET["skipnum"];
$shownum = $_GET["shownum"];
$jg1 = $_GET["jg1"];
$jg2 = $_GET["jg2"];
$str = "select * from  goodslist where goodsname  like '%$key%' and goodsprice between $jg1 and $jg2 order by $paixu $rank limit $skipnum,$shownum";
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