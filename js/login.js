$("#loginBtn").click(function () {
    var username = $("#loginName").val();
    var userpwd = $("#pwd").val();
    $.ajax({
        type: "get",
        url: "../php/login.php",
        data: {
            username: username,
            userpwd: userpwd,
        },
        dataType: "json",
        success: function (item) {
            if (item["code"] == 1) {



                //登陆成功之后设置本地储存
                localStorage.setItem("loginId", item["userid"]); //跟cookie一样作用将用户id设置到本地储存
                localStorage.setItem("loginName", username); //跟cookie一样做用将用户名设置到本地储存
                //对页面本地存储进行获取判断 ↓↓↓
                var backUrl = window.localStorage.getItem("backUrl"); //获取本地存储的商品列表的网站信息;
                if (backUrl) { // 如果这个网站存在
                    window.location.href = backUrl; //如果此本地存储存在就直接跳转到它的界面;
                } else { //如果这个网站不存在
                    window.location.href = "../index.html";
                }


            } else {
                $(".tcshow").show();
                $(".tcshow p").html(item["msg"]);
                $(".tcshow-l").on("click", function () {
                    $(".tcshow").hide();
                })
            }
        }
    })
})