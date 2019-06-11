 //点击不同楼层的li页面滚动到该楼层所在的位置
 var index = 0;
 $("nav li:not(li[class='top'])").click(function () { //选取nav里面除了top的li;
     index = $(this).index(); //点击谁获取谁的下标
     $("nav li").eq(index).addClass("select").siblings().removeClass("select"); //点击谁设置谁的属性并且将其他li上面的属性清除;
     let scrollTop = $(".floor-bar").eq(index).position().top; //获取该div距离上面的top距离
     $("html,body").animate({ //点击之后设置html和body的距离滚动到该距离
         "scrollTop": scrollTop
     });
 });

 //点击top回到页面最顶端;
 $(".top").eq(0).click(function () {
     $("html,body").animate({
         "scrollTop": 0
     })
 });

 //页面滚动到几楼,几楼的状态被选定
 $(window).scroll(function () {
     var top = $(this).scrollTop();
     if (top > $(".header").height() / 2 + 100) {
         $("nav").show();
     } else {
         $("nav").hide();
     }
     $(".floor-bar").each(function (index) {
         var scrollTop = $(this).position().top + $(this).height() / 2;
         if (scrollTop > top) {
             $("nav li").eq(index).addClass("select").siblings().removeClass("select");
             return false;
         }
     });
 });