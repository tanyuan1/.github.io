<?php
@require_once("config.php");
$key =  $_GET["key"];
$paixu = $_GET["paixu"];
$rank = $_GET["rank"];
$str = "select   count(*)   from  goodslist where goodsname  like '%$key%' order by $paixu $rank";

//$str = "select count(*) from goodslist";

$result= mysql_query($str);

$item = mysql_fetch_array($result);

$obj=array();

$obj["count"]= $item[0];

echo  json_encode($obj);

?>