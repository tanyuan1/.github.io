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
    var spanBtn = $("<a href='./html/login.html'>登陆</a><span>|</span><a href='./html/register.html'>注册</a>")
    $("#userdl").append(spanBtn);
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
    window.location.href = "index.html"; //跳转至登陆页面
}