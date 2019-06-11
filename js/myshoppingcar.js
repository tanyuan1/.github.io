  //判断本地存储 是否存在值
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
      var spanBtn = $("<a href='../html/login.html'>登陆</a><span>|</span><a href='../html/register.html'>注册</a>")
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
      window.location.href = "./goodsList.html"; //跳转至本页面
  }


  //购物车主体内容开始

  //判断是否有用户值传进来
  if (loginId) {

      //调用封装ajax;
      $.ajax({
          type: "get",
          url: "../php/myshoppingcar.php", //php1
          data: {
              userid: loginId
          },
          dataType: "json",
          success: function (obj) {
              var html = "";
              obj.forEach((item) => {
                  var {
                      id,
                      goodsid,
                      goodsname,
                      goodsnum,
                      goodsprice,
                      goodsimg
                  } = item;
                  html += `<ul id="tr">
                                        <li>
                                         <input class="check-one" type="checkbox" data-id="${id}">
                                        </li>
                                        <li class="goods">
                                         <img src="../images/${goodsimg}">
                                         <span>${goodsname}</span>
                                        </li>
                                        <li>${goodsprice}</li>
                                        <li>
                                            <span class="reduce" onclick="reduceNum(${id},this,'${goodsprice}')"> ${goodsnum>1?"-":""}</span>
                                            <input class="count-input" value="${goodsnum}">
                                            <span class="add" onclick="addNum(${id},this,'${goodsprice}')">+</span>
                                        </li>
                                        <li class="subtotal">${(goodsprice*goodsnum).toFixed(2)}</li>
                                        <li><span onclick="deleteNum(${id},this,${goodsid})">删除</span></li>
                                    </ul>`;

              });
              $("#tbody").append(html);
              //给全选和单选写点击事件 ↓↓↓
              var countNum = 0;
              //点击全选事件,下面所有按钮都被选中状态
              $(".check-all").click(function () { //末尾[0]不能加
                  var flag = $(this).prop("checked");
                  $(".check-one").prop("checked", flag);
                  countNum = flag ? $(".check-one").length : 0;
                  getTotal();
              });
              //当单选按钮全部被选中的时候全选按钮被选中
              $(".check-one").click(function () {
                  if ($(this).prop("checked")) {
                      countNum++;
                  } else {
                      countNum--;
                  }
                  if (countNum == $(".check-one").length) {
                      $(".check-all").prop("checked", true);
                  } else {
                      $(".check-all").prop("checked", false);
                  }
                  getTotal();
              })
              //点击事件一阶段结束↑↑↑
              //给删除按钮写点击事件对象对应的值进行删除
              // var deleteSpan = document.getElementById("deleteAll");
              $("#deleteAll").click(function () {
                  var idList = [];
                  $(".check-one").each(function (index, item) {
                      var id = $(item).attr("data-id");
                      idList.push(id);
                      $(item).parent().parent().remove();
                      getTotal();
                      countNum = 0; //判断当countNum 的时候
                      index = $(".check-one").length; //最大下标数为现有的长度更新
                  })
                  var ids = idList.join(",");
                  $.ajax({
                      type: "get",
                      url: "../php/delmyshoppingcarbyid.php", //php2
                      data: {
                          id: ids
                      },
                      dataType: "json",
                      success: function (obj) {
                          if (obj["code"] == 1) {

                          } else {
                              alert(obj["msg"]);
                          }
                      }
                  });
              })
              //点击结算
              $("#jiesuan li").eq(3).on("click", function () {
                  var len = $(".check-one:checked").length;
                  if (len > 0) {
                      if ($("#dianjish1").prop("checked")) {
                          if ($("#control-labeltxt").val() != "" && $("#control-labeltxt1")
                              .val() != "" || $("#control-labeltxt2").val() != "") {

                              window.location.href = "./js.html";

                          } else {

                              $(".tcshow").show(function () {
                                  $(".tcshow p").html("收货地址未按照要求填写");
                                  $(".tcshow-l").html("填写").click(function () {
                                      $(".tcshow").hide();
                                  });
                                  $(".tcshow-r").html("继续逛逛").click(function () {
                                      $(".tcshow").hide();
                                  });
                              })
                          }
                      } else {

                          $(".tcshow").show(function () {
                              $(".tcshow p").html("亲!向上看!请选择你的收货地址哦!");
                              $(".tcshow-l").html("立即选择").click(function () {
                                  $(".tcshow").hide();
                              });
                              $(".tcshow-r").html("继续逛逛").click(function () {
                                  $(".tcshow").hide();
                              });
                          })



                      }


                  } else {
                      $(".tcshow").show(function () {
                          $(".tcshow p").html("你没选中任何商品");
                          $(".tcshow-l").html("立即选择").click(function () {
                              $(".tcshow").hide();
                          });
                          $(".tcshow-r").html("继续逛逛").click(function () {
                              $(".tcshow").hide();
                          });
                      })
                  }
              });





          }
      });

  } else { //此处需要更改信息
      window.localStorage.setItem("backUrl", window.location.href);
      window.location.href = "./login.html";
  }

  //给加号写操作事件S ↓↓↓
  function addNum(id, span, price) {
      span.onclick = null; //开始点击时span为空;
      span.style.color = "red"; //点击之后加号变为红色;
      var countInp = span.previousElementSibling; //查找此元素的上一级元素;
      countInp.value = countInp.value * 1 + 1; //找到元素点击时候元素内的值加1;
      var total = countInp.value * price; //将点击加号后的值乘以元素的单价得到小计里面的单价;
      var totalLi = span.parentNode.nextElementSibling; //找到加号元素父元素的下个元素将小计丢入到里面去;
      totalLi.innerHTML = total.toFixed(2); //将值丢入到小计里面去;
      var reduceSpan = countInp.previousElementSibling; //当点击加号的时候获取减号框的值
      reduceSpan.innerHTML = "-"; //将减号赋值给减号框;
      $.ajax({ //调用ajax
          type: "get",
          url: "../php/changenum.php", //php3
          data: {
              id: id, //传2个值进去
              num: countInp.value
          },
          dataType: "json",
          success: function (obj) {
              if (obj["code"] == 1) {
                  span.style.color = "blue";
                  span.onclick = function () {
                      addNum(id, span, price);
                  }
              } else {
                  alert(obj["msg"]);
              }
          }
      });
      getTotal()
  }

  //给减号附加点击事件↓↓↓
  function reduceNum(id, span, price) {
      span.onclick = null;
      span.style.color = "red"; //点击的时候颜色变为红色
      var countInp = span.nextElementSibling; //找到点击元素的下一个元素
      if (countInp.value * 1 > 1) {
          countInp.value = countInp.value * 1 - 1; //将里面的数值进行减1;
          var total = countInp.value * price; //将点击减号后的值乘以元素的单价得到小计里面的单价;
          var totalLi = span.parentNode.nextElementSibling; //找到减号元素父元素的下个元素将小计丢入到里面去;
          totalLi.innerHTML = total.toFixed(2); //将值丢入到小计里面去;
          //调用ajax将值进行数据库传递
          $.ajax({
              type: "get",
              url: "../php/changenum.php", //php3
              data: {
                  id: id, //传2个值进去
                  num: countInp.value
              },
              dataType: "json",
              success: function (obj) {
                  if (obj["code"] == 1) {
                      span.style.color = "blue";
                      span.onclick = function () {
                          reduceNum(id, span, price);
                      }
                  } else {
                      alert(obj["msg"]);
                  }
              }
          });
          if (countInp.value * 1 == 1) {
              span.innerHTML = "";
          }
      } else {
          span.innerHTML = "";
      }
      getTotal();
  }



  // 给删除元素写点击事件将此行信息删除并且在数据库内也删除该信息
  function deleteNum(id, span) {
      $.ajax({
          type: "get",
          url: "../php/deletenum.php", // php4
          data: {
              id: id
          },
          dataType: "json",
          success: function (obj) {
              if (obj["code"] == 1) {
                  span.parentNode.parentNode.remove();
              } else {
                  alert(obj["msg"]);
              }
          }

      });
  }


  //封装函数计算总共买了多少件商品,以及总价的金额是多少元
  function getTotal() {
      var selectedSpan = document.getElementById("selected"); //找到页面对应购买件数的值
      var footingSpan = document.getElementById("footing"); //找到页面对应购买总金额的值

      // var $(".check-one") = document.getElementsByClassName("check-one");
      var count = 0; //设置一个购买件数为空
      var subtotal = 0; //设置一个购买总金额为空
      for (var i = 0; i < $(".check-one").length; i++) { //循环check-one元素
          if ($(".check-one")[i].checked) { //当哪个被选中的时候
              var ul = $(".check-one")[i].parentNode.parentNode; //找到该元素的父元素
              var countInput = ul.getElementsByClassName("count-input")[0]; //找到对应的个数
              var subtotalTd = ul.getElementsByClassName("subtotal")[0]; //找到对应的小计总价

              count = count + countInput.value * 1; //得到总共购买的件数;
              subtotal = subtotal + subtotalTd.innerHTML * 1;
          }
      }
      //循环找值结束后
      selectedSpan.innerHTML = count;
      footingSpan.innerHTML = subtotal;
  }

  //购物车主体内容完毕



  //省市联动开始
  $(function () {
      var html = "<option value=''>== 请选择 ==</option>";
      $("#input_city").append(html);
      $("#input_area").append(html);
      $.each(pdata, function (idx, item) {
          if (parseInt(item.level) == 0) {
              html += "<option value='" + item.names + "' exid='" + item.code + "'>" + item.names +
                  "</option>";
          }
      });
      $("#input_province").append(html);

      $("#input_province").change(function () {
          if ($(this).val() == "") return;
          $("#input_city option").remove();
          $("#input_area option").remove();
          var code = $(this).find("option:selected").attr("exid");
          code = code.substring(0, 2);
          var html = "<option value=''>== 请选择 ==</option>";
          $("#input_area").append(html);
          $.each(pdata, function (idx, item) {
              if (parseInt(item.level) == 1 && code == item.code.substring(0, 2)) {
                  html += "<option value='" + item.names + "' exid='" + item.code + "'>" +
                      item.names + "</option>";
              }
          });
          $("#input_city").append(html);
      });

      $("#input_city").change(function () {
          if ($(this).val() == "") return;
          $("#input_area option").remove();
          var code = $(this).find("option:selected").attr("exid");
          code = code.substring(0, 4);
          var html = "<option value=''>== 请选择 ==</option>";
          $.each(pdata, function (idx, item) {
              if (parseInt(item.level) == 2 && code == item.code.substring(0, 4)) {
                  html += "<option value='" + item.names + "' exid='" + item.code + "'>" +
                      item.names + "</option>";
              }
          });
          $("#input_area").append(html);
      });
      //绑定
      $("#input_province").val("");
      $("#input_province").change();
      $("#input_city").val("");
      $("#input_city").change();
      $("#input_area").val("");

  });