<?php
@require_once("config.php");
$goodsid = $_GET["goodsid"];

$str = "select * from goodslist where id = $goodsid";

$result = mysql_query($str);

while($item = mysql_fetch_array($result)){
    //用户id值不需要
    $obj = array();
    $obj["id"] = $item["id"];
    $obj["goodsname"]=$item["goodsname"];
    $obj["goodsnum"]=$item["goodsnum"];
    $obj["goodsprice"]=$item["goodsprice"];
    $obj["goodsohter"]=$item["goodsohter"];
    $obj["goodsimg1"]=$item["goodsimg1"];
    $obj["goodsimg2"]=$item["goodsimg2"];
    $list[] = $obj;
}
echo json_encode($obj);

?>