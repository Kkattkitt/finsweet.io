$(function () {
  // Инициализация рейтинга
  $("#rateYo").rateYo({
    starSvg: '<svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3662 1.82936C13.5032 -0.255461 16.4968 -0.255466 17.6338 1.82936L19.9256 6.03174C20.3571 6.82292 21.1214 7.37822 22.0072 7.5441L26.7121 8.42517C29.0463 8.86228 29.9713 11.7093 28.3399 13.4349L25.0514 16.9132C24.4323 17.5681 24.1404 18.4666 24.2563 19.3603L24.8723 24.1072C25.1779 26.4621 22.756 28.2217 20.6107 27.2034L16.2865 25.1507C15.4724 24.7642 14.5276 24.7642 13.7135 25.1507L9.38927 27.2034C7.24399 28.2217 4.82214 26.4621 5.12772 24.1072L5.74367 19.3603C5.85964 18.4666 5.5677 17.5681 4.94858 16.9132L1.66009 13.4349C0.0286615 11.7093 0.953722 8.86228 3.28786 8.42517L7.99278 7.5441C8.87858 7.37822 9.64288 6.82293 10.0744 6.03174L12.3662 1.82936Z" fill="currentColor" /></svg>',
    rating: 4.5,
    starWidth: "30px",
    ratedFill: "#FFB648",
    normalFill: "#D7D1C7",
    halfStar: true,
    spacing: "8px"
  });

  // Инициализация mixitup если элемент существует
  if ($('.blog__list').length) {
    var mixer = mixitup('.blog__list');

    $('.blog__filter-btn').on('click', function () {
      $('.blog__filter-btn').removeClass('blog__filter-btn--active');
      $(this).addClass('blog__filter-btn--active');
    });
  }

  // Инициализация слайдера если элемент существует
  if ($('.recall__slider').length) {
    $('.recall__slider').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false,
      dots: true,
      appendDots: $('.recall__dots'),
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]
    });

    // Навигация слайдера
    $('.recall__arrow-prev').on('click', function (e) {
      e.preventDefault();
      $('.recall__slider').slick('slickPrev');
    });

    $('.recall__arrow-next').on('click', function (e) {
      e.preventDefault();
      $('.recall__slider').slick('slickNext');
    });
  }

  // Аккордеон вопросов
  $('.questions__link').on('click', function (e) {
    e.preventDefault();

    if ($(this).hasClass('questions__link--active')) {
      $(this).removeClass('questions__link--active');
      $(this).children('.questions__text').slideUp();
    } else {
      $('.questions__link').removeClass('questions__link--active');
      $('.questions__text').slideUp();
      $(this).addClass('questions__link--active');
      $(this).children('.questions__text').slideDown();
    }
  });

  // Плавная прокрутка к якорям
  $(".header__nav-list a, .header__top a").on("click", function (e) {
    var href = $(this).attr('href');

    // Проверяем, является ли ссылка якорем (начинается с #)
    if (href && href.charAt(0) === '#') {
      e.preventDefault();
      var target = $(href);

      if (target.length) {
        var top = target.offset().top;
        $('body, html').animate({
          scrollTop: top
        }, 800);
      }
    }
  });

  // Бургер-меню и оверлей
  let scrollTimer;

  function updateBurgerVisibility() {
    const scrollTop = $(window).scrollTop();
    const isMenuOpen = $('.header__top').hasClass('header__top--open');

    if (scrollTop > 0 && !isMenuOpen) {
      $('.burger').addClass('burger--follow');
    } else {
      $('.burger').removeClass('burger--follow');
    }
  }

  // Используем throttling для оптимизации
  $(window).on('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateBurgerVisibility, 10);
  });

  // Инициализация при загрузке
  updateBurgerVisibility();

  // Управление меню
  $('.burger, .overlay, .header__top a').on('click', function (e) {
    var $this = $(this);
    var href = $this.attr('href');

    // Если это ссылка с якорем, делаем плавную прокрутку и закрываем меню
    if (href && href.charAt(0) === '#') {
      e.preventDefault();

      var target = $(href);
      if (target.length) {
        // Закрываем меню
        $('.header__top').removeClass('header__top--open');
        $('.overlay').removeClass('overlay--show');
        $('body').removeClass('no-scroll');

        // Плавная прокрутка
        var top = target.offset().top;
        $('body, html').animate({
          scrollTop: top
        }, 800);
      }
    }
    // Если это бургер или оверлей (не ссылка с якорем)
    else if (!$this.is('a[href*="#"]')) {
      e.preventDefault();
      $('.header__top').toggleClass('header__top--open');
      $('.overlay').toggleClass('overlay--show');
      $('body').toggleClass('no-scroll');
    }

    updateBurgerVisibility();
  });

  // Закрытие меню при ресайзе окна
  $(window).on('resize', function() {
    if ($(window).width() > 768) {
      $('.header__top').removeClass('header__top--open');
      $('.overlay').removeClass('overlay--show');
      $('body').removeClass('no-scroll');
      updateBurgerVisibility();
    }
  });
});