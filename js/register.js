  //验证码的生成   密码强度没有做
  var array = [
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
          "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
          "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
      ],
      ["0", "1", "2", "3", "4", "6", "7", "8", "9"]
  ]; //生成验证码需要的元素
  var str = "";
  randomCode();
  $(".sccode").click(function () {
      randomCode();
  })


  function randomCode() {
      str = "";
      for (var i = 0; i < 4; i++) {
          var temp = Math.random();
          temp = temp < 0.5 ? Math.floor(temp) : Math.ceil(temp);
          var length = array[temp].length;
          var index = parseInt(Math.random() * length);
          str += array[temp][index];
      }
      $(".sccode").html(str);
  }


  //用户名的注册验证
  var usernameReg = /^[a-zA-Z0-9]{6,12}$/;
  var usernameOk = false;
  $("#username").focus(function () {
      $(this).attr("placeholder", "");

  });
  $("#username").blur(function () {
      if ($(this).val() == "") {
          $(".ui-input").eq(0).css("border", "1px solid #FF611B");
          $("#usernamemessage").show();
          usernameOk = false;
      } else if ($(this).val().length < 6 || $(this).val().length > 12) {
          $(".ui-input").eq(0).css("border", "1px solid #FF611B");
          $("#usernamemessage").show().html("<i class='icon'></i>" + "用户名长度不合法");
          usernameOk = false;
      } else if (!$(this).val().match(usernameReg)) {
          $(".ui-input").eq(0).css("border", "1px solid #FF611B");
          $("#usernamemessage").show().html("<i class='icon'></i>" + "用户名中含有非法字符");
          usernameOk = false;
      } else {
          $("#usernamemessage").show().html("用户名可用 √").css("color", "green");
          usernameOk = true;
      }
  });
  //注册手机号码
  var phoneRge = /^1[|3|4|5|6|7|8|9]\d{9}$/;
  var phoneOk = false;
  $("#usertel").focus(function () {
      $(this).attr("placeholder", "");
  });
  $("#usertel").blur(function () {
      if ($(this).val() == "") {
          $(".ui-input").eq(1).css("border", "1px solid #FF611B");
          $("#phoneoremailmessage").show();
          phoneOk = false;
      } else if ($(this).val().length != 11) {
          $(".ui-input").eq(1).css("border", "1px solid #FF611B");
          $("#phoneoremailmessage").show().html("<i class='icon'></i>" + "手机号长度不合法");
          phoneOk = false;
      } else if (!$(this).val().match(phoneRge)) {
          $(".ui-input").eq(1).css("border", "1px solid #FF611B");
          $("#phoneoremailmessage").show().html("<i class='icon'></i>" + "手机号格式不合法");
          phoneOk = false;
      } else {
          $("#phoneoremailmessage").show().html("手机号可用 √").css("color", "green");
          phoneOk = true;
      }
  });


  //密码框验证
  var userpwdReg = /^[0-9a-z_$]{6,20}$/ig;
  var userpwdok = false;
  $("#userpwd").focus(function () {
      $(this).attr("placeholder", "");
  })
  $("#userpwd").blur(function () {
      if ($(this).val() == "") {
          $(".ui-input").eq(2).css("border", "1px solid #FF611B");
          $("#pwdmessage").show();
          userpwdok = false;
      } else if ($(this).val().length < 6 || $(this).val().length > 20) {
          $(".ui-input").eq(2).css("border", "1px solid #FF611B");
          $("#pwdmessage").show().html("<i class='icon'></i>" + "密码长度不合法");
          userpwdok = false;
      } else if (!$(this).val().match(userpwdReg)) {
          $(".ui-input").eq(2).css("border", "1px solid #FF611B");
          $("#pwdmessage").show().html("<i class='icon'></i>" + "密码含有非法字符");
          userpwdok = false;
      } else {
          $("#pwdmessage").show().html("密码可用 √").css("color", "green");

          var numCount = (/[0-9]/g).test($("#userpwd").val()) ? 1 : 0;
          var upperCount = (/[A-Z]/g).test($("#userpwd").val()) ? 1 : 0;
          var lowerCount = (/[a-z]/g).test($("#userpwd").val()) ? 1 : 0;

          switch (numCount + upperCount + lowerCount) {
              case 1:
                  $(".level-1").css("background", "#ff611b");
                  $(".level-txt").html("弱");
                  break;
              case 2:
                  $(".level-1").css("background", "#ff611b");
                  $(".level-2").css("background", "#ff611b");
                  $(".level-txt").html("中");
                  break;
              case 3:
                  $(".level-1").css("background", "#ff611b");
                  $(".level-2").css("background", "#ff611b");
                  $(".level-3").css("background", "#ff611b");
                  $(".level-txt").html("强");
                  break;

                  userpwdok = true;

          }
      }
  });





  //再次验证密码
  var userpwdok2 = false;
  $("#userpwd2").focus(function () {
      $(this).attr("placeholder", "");
      $(this).css("color", "");
  });
  $("#userpwd2").blur(function () {
      if ($(this).val() == "") {
          $(".ui-input").eq(3).css("border", "1px solid #FF611B");
          $("#pwd2message").show();
          userpwdok2 = false
      } else if ($(this).val() != $("#userpwd").val()) {
          $(".ui-input").eq(3).css("border", "1px solid #FF611B");
          $("#pwd2message").show().html("<i class='icon'></i>" + "2次输入密码不一样,请重新输入");
          userpwdok2 = false
      } else {
          $("#pwd2message").show().html("密码一致 √").css("color", "green");
          userpwdok2 = true;
      }
  })


  //验证码效验
  var numsCode = false;
  $("#Nums").focus(function () {
      $(this).attr("placeholder", "");
  });
  $("#Nums").blur(function () {
      if ($(this).val() == "") {
          $(".ui-input").eq(4).css("border", "1px solid #FF611B");
          $("#verificationcodemessage").show();
          numsCode = false;
      } else if ($(this).val().toUpperCase() != str.toUpperCase()) {
          $(".ui-input").eq(4).css("border", "1px solid #FF611B");
          $("#verificationcodemessage").show().html("<i class='icon'></i>" + "验证码错误请重新输入");
          randomCode();
          numsCode = false;
      } else {
          $("#verificationcodemessage").show().html("验证码输入正确 √").css("color", "green");
          numsCode = true;
      }
  });

  //是否同意协议
  $("#J-chkbox-readMe").click(function () {
      if ($(this).attr('checked')) {
          $(this).attr('checked', false);

      } else {
          $(this).attr('checked', true);
          $("#registrationagreementmessage").show().html("已勾选用户协议 √").css("color", "green");

      }
  });

  //点击注册
  $("#ljzc").click(function (event) {
      if ($("#J-chkbox-readMe").attr('checked') && usernameOk && phoneOk && userpwdok2 &&
          numsCode) {
          $.ajax({
              type: "get",
              url: "../php/register.php",
              data: {
                  username: $("#username").val(),
                  usertel: $("#usertel").val(),
                  userpwd: $("#userpwd").val()
              },
              dataType: "json",
              success: function (result) {
                  if (result["code"] == 1) {
                      window.location.href = "./login.html";
                  } else {
                      $(".tcshow").show();
                      $(".tcshow p").html(result["msg"]);
                      $(".tcshow-l").on("click", function () {
                          $(".tcshow").hide();
                          window.location.href = "register.html";
                      })
                  }
              }
          });
      } else {
          $(".tcshow").show();
          $(".tcshow p").html("请勾选用户协议");
          $(".tcshow-l").on("click", function () {
              $(".tcshow").hide();
          })
          $("#registrationagreementmessage").show();

      }
  });