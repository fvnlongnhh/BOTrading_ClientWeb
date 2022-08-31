$(function () {
  // 手機版
  // header hamburger 點擊後大選單秀出來
  $('header button').click(function () {
      $('header button').toggleClass('is-active');
      $('.index-link-block').slideToggle().toggleClass('show');
  })
  
  // menu展開
  $('.unfold-btn .open, .unfold-btn .close').click(function(){
      $('.main-item .open').addClass('show');
      $('.main-item .close').removeClass('show');
      $(this).removeClass('show');
      $(this).siblings().addClass('show');
      $('.secondary-item').slideUp().removeClass('show');

      // 會員中心一開始為展開狀態
      // $('.member-center .secondary-item').toggleClass('show');

      if($(this).hasClass('open')) {
          if(!$(this).hasClass('show')) {
              $(this).closest('.main-item').siblings().slideDown().addClass('show');
          }
      }

  })

    $('.index .unfold-btn .open').removeClass('show');
    $('.index .unfold-btn .close').addClass('show');
    $('.index .secondary-item').addClass('show');

    // 把會員中心的改變成合起來的狀態
    $('.member-center .unfold-btn .close').removeClass('show');
    $('.member-center .unfold-btn .open').addClass('show');
    $('.member-center .secondary-item').removeClass('show');

})

