    //判断本地存储

    var loginId = window.localStorage.getItem("loginId");
    var loginName = window.localStorage.getItem("loginName");

    //封装退出函数,删除已经存在的本地储存信息;
    function existLogin() {
        window.localStorage.removeItem("loginId");
        window.localStorage.removeItem("loginName");
        gotoLogin()
    }
    //封装一个函数让页面带页面信息去到登陆页面
    function gotoLogin() {
        window.localStorage.setItem("backUrl", window.location.href); //将本地页面的网站地址丢入本地储存
        window.location.href = "../html/goodsList.html"; //跳转至本页面
    }



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
            "<a href='javascript:void(0)' id='djtzdl'>登陆</a><span>|</span><a href='../html/register.html'>注册</a>")
        $("#userdl").append(spanBtn);
        $("#djtzdl").on("click", function () {
            gotoLogin()
            window.location.href = "../html/login.html";
        })
    }
    var key = "";
    var paixu = "id";
    var rank = "asc";


    productList(key, paixu, rank);
    //销量从高到底排列
    $(".sort-li").eq(0).on("click", function () {
        $("#page").html("");
        var key = "";
        var paixu = "goodsohter";
        var rank = "desc";
        productList1(key, paixu, rank);
    });

    //销量从底到高
    $(".sort-li").eq(1).on("click", function () {
        $("#page").html("");
        var key = "";
        var paixu = "goodsohter";
        var rank = "asc";
        productList1(key, paixu, rank);
    })

    //点击搜索框搜素
    $(".ui-btn").on("click", function () {
        $("#page").html("");
        var key = $(".ui-input").val();
        var paixu = "id";
        var rank = "asc";
        productList1(key, paixu, rank);

    });

    //价格区间以下
    $(".price-sort-span").eq(1).on("click", function () {
        $("#page").html("");
        var key = "";
        var paixu = "goodsprice";
        var rank = "asc";
        var jg1 = 0;
        var jg2 = 100;
        productList2(key, paixu, rank, jg1, jg2);

    });
    $(".price-sort-span").eq(2).on("click", function () {
        $("#page").html("");
        var key = "";
        var paixu = "goodsprice";
        var rank = "asc";
        var jg1 = 100;
        var jg2 = 300;
        productList2(key, paixu, rank, jg1, jg2);

    });
    $(".price-sort-span").eq(3).on("click", function () {
        $("#page").html("");
        var key = "";
        var paixu = "goodsprice";
        var rank = "asc";
        var jg1 = 300;
        var jg2 = 30000;
        productList2(key, paixu, rank, jg1, jg2);

    })



    //搜索排序
    function productList1(key, paixu, rank) {
        var productsUl = $(".products-1")[0];
        $.ajax({
            type: "get",
            data: {
                key: key,
                paixu: paixu,
                rank: rank,
            },
            url: "../php/getallgoodslistcount.php",
            dataType: "json",
            success: function (obj) {
                var count = obj["count"];
                new Page("#page", {

                    count: count,
                    shownum: 16,
                    showpage: 5,
                    callback: function (pageIndex) {
                        $.ajax({
                            type: "get",
                            url: "../php/goodsList1.php",
                            data: {
                                key: key,
                                paixu: paixu,
                                rank: rank,
                                skipnum: (pageIndex - 1) * 16,
                                shownum: 16,
                            },
                            dataType: "json",
                            success: function (list) {
                                var html = "";
                                list.forEach(item => {
                                    var {
                                        id,
                                        goodsname,
                                        goodsnum,
                                        goodsprice,
                                        goodsimg,
                                        goodsohter
                                    } = item;
                                    html += `<li class="products-items">
                                                <div class="product-photo" data-id=${id}>
                                                 <img src="../images/${goodsimg}" alt="">
                                                </div>

                                                <div class="product-info">
                                                    <div class="product-price">
                                                        <span>￥ ${(goodsprice*1).toFixed(2)}</span>
                                                    </div>
                                                    <div style="color: purple;margin-bottom: 5px;margin-top:5px;">商品库存 ${goodsnum} 件</div>
                                                    <div class="product-name">
                                                        <span>${goodsname}</span>
                                                    </div>
                                                    <div class="product-ohter">
                                                        <span>成交 ${goodsohter} 笔</span>
                                                    </div>
                                                    <div class="product-jrgwc" data-id=${id}  data-src="../images/${goodsimg}" data-name=${goodsname} data-price=${goodsprice}>
                                                     加入购物车
                                                    </div>
                                                </div>
                                            </li>`
                                });
                                productsUl.innerHTML = html;

                                $(".product-photo").on("click", function () {
                                    var goodsId = $(this).attr("data-id");
                                    localStorage.setItem("goodsid",
                                        goodsId);
                                    window.location.href =
                                        "./goodsdetails.html";
                                });

                                $(".product-jrgwc").on("click", function (
                                    e) {
                                    if (loginId) {
                                        var userId = loginId;
                                        var goodsId = $(this).attr(
                                            "data-id");
                                        var goodsName = $(this).attr(
                                            "data-name");
                                        var goodsprice = $(this).attr(
                                            "data-price");
                                        var goodsimg = $(this).attr(
                                            "data-src").split("/")[2];

                                        var goodsImg = $(this).attr(
                                            "data-src");
                                        ($("#ball img").attr("src",
                                            goodsImg
                                        )); //飞入购物车效果
                                        var endX = $(".cartbox").offset()
                                            .left;
                                        var endY = $(".cartbox").offset()
                                            .top;
                                        var width = $("#ball").width() / 2;
                                        var height = $("#ball").height() /
                                            2;
                                        var clientX = e.pageX;
                                        var clientY = e.pageY;
                                        $("#ball").css({
                                            "left": clientX - width,
                                            "top": clientY - height
                                        }).show(function () {
                                            $(this).stop(true, true)
                                                .animate({
                                                    "left": endX,
                                                    "top": endY
                                                }, function () {
                                                    $(this)
                                                        .hide();
                                                });
                                        })

                                        var spz = $(".icon-cartnum")
                                            .html() * 1 + 1;
                                        $(".icon-cartnum").html(spz);
                                        //利用ajax往数据库内传递数据
                                        $.ajax({
                                            type: "get",
                                            url: "../php/addmyshoppingcar.php",
                                            data: {
                                                userid: userId,
                                                goodsid: goodsId,
                                                goodsname: goodsName,
                                                goodsnum: 1,
                                                goodsprice: goodsprice,
                                                goodsimg: goodsimg
                                            },
                                            dataType: "json",
                                            success: function (
                                                obj) {
                                                if (obj[
                                                        "code"
                                                    ] == 1) {

                                                } else {
                                                    alert(obj[
                                                        "msg"
                                                    ])

                                                }
                                            }
                                        })
                                    } else {
                                        $(".tcshow").show(function () {
                                            $(".tcshow-l").click(
                                                function () {
                                                    gotoLogin();
                                                    window
                                                        .location
                                                        .href =
                                                        "./login.html";
                                                })
                                            $(".tcshow-r").click(
                                                function () {
                                                    $(".tcshow")
                                                        .hide();
                                                })
                                        });

                                    }

                                })
                            }
                        })
                    }
                })
            }
        })
    }







    //页面打开动态生成元素
    function productList(key, paixu, rank) {
        var productsUl = $(".products-1")[0];
        $.ajax({
            type: "get",
            data: {
                key: key,
                paixu: paixu,
                rank: rank,
            },
            url: "../php/getallgoodslistcount.php",
            dataType: "json",
            success: function (obj) {
                var count = obj["count"];
                new Page("#page", {

                    count: count,
                    shownum: 16,
                    showpage: 5,
                    callback: function (pageIndex) {
                        $.ajax({
                            type: "get",
                            url: "../php/goodsList.php",
                            data: {
                                skipnum: (pageIndex - 1) * 16,
                                shownum: 16,
                            },
                            dataType: "json",
                            success: function (list) {
                                var html = "";
                                list.forEach(item => {
                                    var {
                                        id,
                                        goodsname,
                                        goodsnum,
                                        goodsprice,
                                        goodsimg,
                                        goodsohter
                                    } = item;
                                    html += `<li class="products-items">
                                                <div class="product-photo" data-id=${id}>
                                                 <img src="../images/${goodsimg}" alt="">
                                                </div>

                                                <div class="product-info">
                                                    <div class="product-price">
                                                        <span>￥ ${(goodsprice*1).toFixed(2)}</span>
                                                    </div>
                                                    <div style="color: purple;margin-bottom: 5px;margin-top:5px;">商品库存 ${goodsnum} 件</div>
                                                    <div class="product-name">
                                                        <span>${goodsname}</span>
                                                    </div>
                                                    <div class="product-ohter">
                                                        <span>成交 ${goodsohter} 笔</span>
                                                    </div>
                                                    <div class="product-jrgwc" data-id=${id}  data-src="../images/${goodsimg}" data-name=${goodsname} data-price=${goodsprice}>
                                                     加入购物车
                                                    </div>
                                                </div>
                                            </li>`
                                });
                                productsUl.innerHTML = html;

                                $(".product-photo").on("click", function () {
                                    var goodsId = $(this).attr("data-id");
                                    localStorage.setItem("goodsid",
                                        goodsId);
                                    window.location.href =
                                        "./goodsdetails.html";
                                });

                                $(".product-jrgwc").on("click", function (
                                    e) {
                                    if (loginId) {
                                        var userId = loginId;
                                        var goodsId = $(this).attr(
                                            "data-id");
                                        var goodsName = $(this).attr(
                                            "data-name");
                                        var goodsprice = $(this).attr(
                                            "data-price");
                                        var goodsimg = $(this).attr(
                                            "data-src").split("/")[2];

                                        var goodsImg = $(this).attr(
                                            "data-src");
                                        ($("#ball img").attr("src",
                                            goodsImg
                                        )); //飞入购物车效果
                                        var endX = $(".cartbox").offset()
                                            .left;
                                        var endY = $(".cartbox").offset()
                                            .top;
                                        var width = $("#ball").width() / 2;
                                        var height = $("#ball").height() /
                                            2;
                                        var clientX = e.pageX;
                                        var clientY = e.pageY;
                                        $("#ball").css({
                                            "left": clientX - width,
                                            "top": clientY - height
                                        }).show(function () {
                                            $(this).stop(true, true)
                                                .animate({
                                                    "left": endX,
                                                    "top": endY
                                                }, function () {
                                                    $(this)
                                                        .hide();
                                                });
                                        })

                                        var spz = $(".icon-cartnum")
                                            .html() * 1 + 1;
                                        $(".icon-cartnum").html(spz);
                                        //利用ajax往数据库内传递数据
                                        $.ajax({
                                            type: "get",
                                            url: "../php/addmyshoppingcar.php",
                                            data: {
                                                userid: userId,
                                                goodsid: goodsId,
                                                goodsname: goodsName,
                                                goodsnum: 1,
                                                goodsprice: goodsprice,
                                                goodsimg: goodsimg
                                            },
                                            dataType: "json",
                                            success: function (
                                                obj) {
                                                if (obj[
                                                        "code"
                                                    ] == 1) {

                                                } else {
                                                    alert(obj[
                                                        "msg"
                                                    ])

                                                }
                                            }
                                        })
                                    } else {
                                        $(".tcshow").show(function () {
                                            $(".tcshow-l").click(
                                                function () {
                                                    gotoLogin();
                                                    window
                                                        .location
                                                        .href =
                                                        "./login.html";
                                                })
                                            $(".tcshow-r").click(
                                                function () {
                                                    $(".tcshow")
                                                        .hide();
                                                })
                                        });

                                    }

                                })
                            }
                        })
                    }
                })
            }
        })
    }
    //动态生成完毕之后




    function productList2(key, paixu, rank, jg1, jg2) {
        var productsUl = $(".products-1")[0];
        $.ajax({
            type: "get",
            data: {
                key: key,
                paixu: paixu,
                rank: rank,
            },
            url: "../php/getallgoodslistcount.php",
            dataType: "json",
            success: function (obj) {
                var count = obj["count"];
                new Page("#page", {
                    count: count,
                    shownum: 16,
                    showpage: 3,
                    callback: function (pageIndex) {
                        $.ajax({
                            type: "get",
                            url: "../php/goodsList2.php",
                            data: {
                                key: key,
                                paixu: paixu,
                                rank: rank,
                                jg1: jg1,
                                jg2: jg2,
                                skipnum: (pageIndex - 1) * 16,
                                shownum: 16,
                            },
                            dataType: "json",
                            success: function (list) {
                                var html = "";
                                list.forEach(item => {
                                    var {
                                        id,
                                        goodsname,
                                        goodsnum,
                                        goodsprice,
                                        goodsimg,
                                        goodsohter
                                    } = item;
                                    html += `<li class="products-items">
                                                <div class="product-photo" data-id=${id}>
                                                 <img src="../images/${goodsimg}" alt="">
                                                </div>

                                                <div class="product-info">
                                                    <div class="product-price">
                                                        <span>￥ ${(goodsprice*1).toFixed(2)}</span>
                                                    </div>
                                                    <div style="color: purple;margin-bottom: 5px;margin-top:5px;">商品库存 ${goodsnum} 件</div>
                                                    <div class="product-name">
                                                        <span>${goodsname}</span>
                                                    </div>
                                                    <div class="product-ohter">
                                                        <span>成交 ${goodsohter} 笔</span>
                                                    </div>
                                                    <div class="product-jrgwc" data-id=${id}  data-src="../images/${goodsimg}" data-name=${goodsname} data-price=${goodsprice}>
                                                     加入购物车
                                                    </div>
                                                </div>
                                            </li>`
                                });
                                productsUl.innerHTML = html;

                                $(".product-photo").on("click", function () {
                                    var goodsId = $(this).attr("data-id");
                                    localStorage.setItem("goodsid",
                                        goodsId);
                                    window.location.href =
                                        "./goodsdetails.html";
                                });

                                $(".product-jrgwc").on("click", function (
                                    e) {
                                    if (loginId) {
                                        var userId = loginId;
                                        var goodsId = $(this).attr(
                                            "data-id");
                                        var goodsName = $(this).attr(
                                            "data-name");
                                        var goodsprice = $(this).attr(
                                            "data-price");
                                        var goodsimg = $(this).attr(
                                            "data-src").split("/")[2];

                                        var goodsImg = $(this).attr(
                                            "data-src");
                                        ($("#ball img").attr("src",
                                            goodsImg
                                        )); //飞入购物车效果
                                        var endX = $(".cartbox").offset()
                                            .left;
                                        var endY = $(".cartbox").offset()
                                            .top;
                                        var width = $("#ball").width() / 2;
                                        var height = $("#ball").height() /
                                            2;
                                        var clientX = e.pageX;
                                        var clientY = e.pageY;
                                        $("#ball").css({
                                            "left": clientX - width,
                                            "top": clientY - height
                                        }).show(function () {
                                            $(this).stop(true, true)
                                                .animate({
                                                    "left": endX,
                                                    "top": endY
                                                }, function () {
                                                    $(this)
                                                        .hide();
                                                });
                                        })

                                        var spz = $(".icon-cartnum")
                                            .html() * 1 + 1;
                                        $(".icon-cartnum").html(spz);
                                        //利用ajax往数据库内传递数据
                                        $.ajax({
                                            type: "get",
                                            url: "../php/addmyshoppingcar.php",
                                            data: {
                                                userid: userId,
                                                goodsid: goodsId,
                                                goodsname: goodsName,
                                                goodsnum: 1,
                                                goodsprice: goodsprice,
                                                goodsimg: goodsimg
                                            },
                                            dataType: "json",
                                            success: function (
                                                obj) {
                                                if (obj[
                                                        "code"
                                                    ] == 1) {

                                                } else {
                                                    alert(obj[
                                                        "msg"
                                                    ])

                                                }
                                            }
                                        })
                                    } else {
                                        $(".tcshow").show(function () {
                                            $(".tcshow-l").click(
                                                function () {
                                                    gotoLogin();
                                                    window
                                                        .location
                                                        .href =
                                                        "./login.html";
                                                })
                                            $(".tcshow-r").click(
                                                function () {
                                                    $(".tcshow")
                                                        .hide();
                                                })
                                        });

                                    }

                                })
                            }
                        })
                    }
                })
            }
        })

    }