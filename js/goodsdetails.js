   //判断本地存储
   var loginId = window.localStorage.getItem("loginId");
   var loginName = window.localStorage.getItem("loginName");
   //对面loginId进行判断
   if (loginId) {
       var spanBtn = $("<a class='userd2'></a><button onclick='existLogin()' class='btn'>退出</button>");
       $("#userdl").append(spanBtn);
       $(".userd2").html("欢迎:" + loginName);
       $(".btn").css({
           "outline": "none",
           "border": "none",
           "width": "34px",
           "height": "20px",
           "font-family": '微软雅黑',
           "font-size": "12px",
           "color": " #FFFFFF",
           "background-color": "#ff611b",
           "text-decoration": " none",
           "display": "inline-block",
           "line-height": "20px",
           "cursor": "pointer",
       });
   } else {

       var spanBtn = $(
           "<a href='javascript:void(0)' id='djtzdl'>登陆</a><span>|</span><a href='../html/register.html'>注册</a>");
       $("#userdl").append(spanBtn);
       $("#djtzdl").on("click", function () {
           gotoLogin();
           window.location.href = "../html/login.html";
       })
   }


   //封装退出函数,删除已经存在的本地储存信息;
   function existLogin() {
       window.localStorage.removeItem("loginId");
       window.localStorage.removeItem("loginName");
       gotoLogin()
   }
   //封装一个函数让页面带页面信息去到登陆页面
   function gotoLogin() {
       window.localStorage.setItem("backUrl", window.location.href); //将本地页面的网站地址丢入本地储存
       window.location.href = "../html/login.html"; //跳转至本页面
   }


   //动态生成商品详情信息
   var id = window.localStorage.getItem("goodsid");
   $.ajax({
       type: "get",
       url: "../php/fordetails.php",
       data: {
           goodsid: id
       },
       dataType: "json",
       success: function (obj) {
           var html = "";
           var str = "";
           var {
               id,
               goodsname,
               goodsnum,
               goodsprice,
               goodsohter,
               goodsimg1,
               goodsimg2,
           } = obj;

           html = `<div class="x-goodsname">
                       <h2 class="t-ellipsis">
                           ${goodsname} </h2>
                   </div>
                   <div class="x-goodsprice">
                       <ul class="x-detail-list">
                           <li class="x-bigger-item">
                               <div class="x-t">价　　格</div>
                               <div class="x-c">
                                   <span class="x-price-new">￥${goodsprice}</span>
                                   <span class="x-price-tips">销售价</span>
                               </div>
                           </li>
                       </ul>
                   </div>
                   <div class="x-goodsnum">
                       <span>销&nbsp;&nbsp;&nbsp;&nbsp;量</span><span>已售出<span class="x-goodsnum-sp">${goodsohter}</span>件</span>
                   </div>
                   <div class="x-goodsdz">
                      <span>配送地址</span>
                   </div>
                   <div class="x-goodsohter">
                       <span>库&nbsp;&nbsp;&nbsp;&nbsp;存</span><span class="x-goodsohter-sp">${goodsnum}</span>
                   </div>
                   <div class="none-border">
                       <div class="none-border1">数量</div>
                       <div class="x-count-bar">
                           <label class="x-count-input">
                               <input type="text" value="1" id="buyTotalNum">
                           </label>
                           <label class="x-count-btn">
                               <a class="x-add">+</a>
                               <a class="x-cut">-</a>
                           </label>
                       </div>
                   </div>
                   <div class="x-product-btn">
                       <button class="ljgm-btn"><i></i>立即购买</button>
                       <button class="jrgwc-btn"><i></i>加入购物车</button>
                   </div>`
           str = ` <li>
                       <div class="small-img">
                       <img src="../images/${goodsimg1}"/>
                       </div>
                   </li>
                   <li>
                       <div class="small-img">
                       <img src="../images/${goodsimg2}"/>
                       </div>
                   </li>`

           $(".animation03").append(str);
           $(".x-intro-left").append(html);
           //放大镜Jq
           $(function () {

               var magnifierConfig = {
                   magnifier: "#magnifier1", //最外层的大容器
                   width: 400, //承载容器宽
                   height: 447, //承载容器高
                   moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
                   zoom: 5 //缩放比例
               };

               var _magnifier = magnifier(magnifierConfig);
           });
           //放大镜Jq

           //点击加号按钮
           $(".x-add").on("click", function () {
               var num = $("#buyTotalNum").val() * 1 + 1;
               $("#buyTotalNum").val(num);
           });

           $(".x-cut").on("click", function () {

               var num = $("#buyTotalNum").val() * 1 - 1;
               $("#buyTotalNum").val(num);

           });

           //,立即购买按钮
           $(".ljgm-btn").on("click", function () {
               if (loginId) {
                   let userId = loginId;
                   let goodsId = id;
                   let goodsName = goodsname;
                   let goodsPrice = goodsprice;
                   let goodsImg = goodsimg1;
                   let goodsnum = $("#buyTotalNum").val() * 1;
                   $.ajax({
                       type: "get",
                       url: "../php/addmyshoppingcar.php",
                       data: {
                           userid: userId,
                           goodsid: goodsId,
                           goodsname: goodsName,
                           goodsnum: goodsnum,
                           goodsprice: goodsPrice,
                           goodsimg: goodsImg
                       },
                       dataType: "json",
                       success: function (obj) {
                           if (obj["code"] == 1) {
                               window.location.href = "../html/myshoppingcar.html"
                           } else {
                               alert(obj["msg"])

                           }
                       }
                   })

               } else {
                   $(".tcshow").show(function () {
                       $(".tcshow-l").click(function () {
                           gotoLogin();
                           window.location.href = "./login.html";
                       })

                       $(".tcshow-r").click(function () {
                           $(".tcshow").hide();
                       })
                   });
               }
           });





           //点击加入购物车
           $(".jrgwc-btn").on("click", function (e) {
               if (loginId) {
                   ($("#ball img").attr("src", `../images/${goodsimg1}`)); //飞入购物车效果
                   var endX = $(".cartbox").offset().left;
                   var endY = $(".cartbox").offset().top;
                   var width = $("#ball").width() / 2;
                   var height = $("#ball").height() / 2;
                   var clientX = e.pageX;
                   var clientY = e.pageY;
                   $("#ball").css({
                       "left": clientX - width,
                       "top": clientY - height
                   }).show(function () {
                       $(this).stop(true, true).animate({
                           "left": endX,
                           "top": endY
                       }, function () {
                           $(this).hide();
                       });
                   })

                   var spz = $(".icon-cartnum").html() * 1 + $("#buyTotalNum").val() * 1;
                   $(".icon-cartnum").html(spz);

                   let userId = loginId;
                   let goodsId = id;
                   let goodsName = goodsname;
                   let goodsPrice = goodsprice;
                   let goodsImg = goodsimg1;
                   let goodsnum = $("#buyTotalNum").val() * 1;
                   $.ajax({
                       type: "get",
                       url: "../php/addmyshoppingcar.php",
                       data: {
                           userid: userId,
                           goodsid: goodsId,
                           goodsname: goodsName,
                           goodsnum: goodsnum,
                           goodsprice: goodsPrice,
                           goodsimg: goodsImg
                       },
                       dataType: "json",
                       success: function (obj) {
                           if (obj["code"] == 1) {

                           } else {
                               alert(obj["msg"])

                           }
                       }
                   })

               } else {
                   $(".tcshow").show(function () {
                       $(".tcshow-l").click(function () {
                           gotoLogin();
                           window.location.href = "./login.html";
                       })

                       $(".tcshow-r").click(function () {
                           $(".tcshow").hide();
                       })
                   });
               }
           });





       }
   });