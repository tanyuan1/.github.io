  //首页轮播图banner
  var $li = $(".slider-paging ul li");
  var len = $li.length - 1;
  var _index = 0;
  var $img = $(".slider-container .slider-bar  li");
  var $btn = $(".slider-btn span");
  var timer = null;
  auto();
  $li.hover(function () {
      $(this).addClass("active");
  }, function () {
      $(this).removeClass("active");
  });
  $li.click(function () {
      clearInterval(timer);
      _index = $(this).index();
      play();
  });

  function play() {
      $li.eq(_index).addClass("active").siblings().removeClass("active");
      $img.eq(_index).fadeIn().siblings().fadeOut();
  }

  $btn.click(function () {
      var index = $(this).index();
      if (index) {
          _index++;
          if (_index > len) {
              _index = 0;
          }
          play();
      } else {
          _index--;
          if (_index < 0) {
              _index = len;
          }
          play();
      }
  });

  function auto() {
      timer = setInterval(function () {
          _index++;
          if (_index > len) {
              _index = 0;
          }
          play();
      }, 2000);
  }

  $("#CarouselBanner").hover(function () {
      clearInterval(timer);
  }, function () {
      auto();
  });
  $(".slider-btn span").hover(function () {
      clearInterval(timer);
  })