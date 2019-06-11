<?php

// php公共样式头部
@header("content-type:text/html;charset=utf8");
@header("Access-Control-Allow-Origin:*");//cros

mysql_connect("localhost:3306","root","root");//睁大眼睛  你们的是3306 不要抄成3308  要挨怼的
mysql_select_db("dswz");//这个1901是数据库的名称  你写的时候 去你的数据库里面 看一看有没有1901
mysql_query("set character set 'utf8'"); //设置执行语句的编码格式  防止中文乱码  求你了 不要抄

?>