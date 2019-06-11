<?php
//  加入购物车的操作
@require_once("config.php");

 $userid= $_GET["userid"]; //获取登陆用户id
 $goodsid= $_GET["goodsid"];//获取点击商品的id
 $goodsname= $_GET["goodsname"];//获取该商品的名称
 $goodsnum= $_GET["goodsnum"];//获取该商品的数量
 $goodsprice= $_GET["goodsprice"];//获取该商品的单价
 $goodsimg= $_GET["goodsimg"];//获取该商品的图片

 //首先进行该商品是否已经存在的判断需要验证用户id和用户所买商品的id一致
$str = "select COUNT(*) from myshopcar where  userid=$userid and goodsid=$goodsid";

$result = mysql_query($str);
$item = mysql_fetch_array($result);   

if($item[0]>0){     //当这个用户买的这个商品存在的时候
    //将这个商品的数量加1
    $str1  = "update myshopcar set goodsnum = goodsnum + $goodsnum where userid =$userid and goodsid=$goodsid";
}else{     //验证之后如果该用户没有购买此商品,就将新增一个
    $str1= "insert into myshopcar(userid,goodsid,goodsname,goodsnum,goodsprice,goodsimg) VALUES ($userid,$goodsid,'$goodsname',$goodsnum,$goodsprice,'$goodsimg')";
}

mysql_query($str1);
$count = mysql_affected_rows();

$obj  = array();
if($count > 0){
    $obj["code"] =1;
    $obj["msg"]="加入成功";
}else{
    $obj["code"]=0;
    $obj["msg"]="加入失败";
}

echo json_encode($obj);
?>