//----------------------------------------------------------------------------
// Налаштавання слайдера
// Якщо слайдер в середині flex або самп є flex то потрібно задати min-width: 0px;
$('.test__slaider').slick({
    accessibility: true,    //Переключення слайдів кнопками
    autoplay: false,        // Авто перегортання слайдів слайдер
    autoplaySpeed: 5000,    // Швидкість авто перегортання
    adaptiveHeight: false,  // Адаптивна висота для влайдера
    arrows: true,           // Стрілочки навігації
    dots: false,            // Крапки навігації
    centerMode: true,       // Головний слайд по центру
    fade: false,            // Спосіб заміни слайдів "появлення"
    focusOnSelect: false,   // Фокус при натисканні на салйд
    easing: 'linear',       // Анімація прокрутки слайдів з бібліотеки JQuery
    infinite: true,         // Нескінченність слайдера
    initialSlide: 0,        // Стартовий слайд
    lazyLoad: 'ondemand',   // Техніка лінивої загрузки "ondemand" чи "progressive"
    pauseOnFocus: true,     // Пауза при фокусі
    pauseOnHover: true,     // Пауза при наведенні
    pauseOnDotsHover: false,// Пауза при наведенні на крапки
    row: 1,                 // Кількість рядків слайдера
    slidesPerRow: 1,        // Кількість слайдів в рядку
    slidesToShow: 1,        // Кількість слайдів які відображаються
    slidesToScroll: 1,      // Кількість слайдів які прокручуються
    speed: 300,             // Швидкість прокурутки слайдів
    swipe: true,            // Можливість свайпа
    swipeToSlide: false,    // Можливість свайпнуть до бажаного слайда
    touchMove: true,        // Можливіть рухати слайди дотиком
    touchThreshold: 5,      // Довжина яку необхідно провести для свайпа (1/touchThreshold)
    vertical: false,        // Вертикальний слайдер
    verticalSwiping: false, // Вертикальний свайп
    waitForAnimate: true,   // Очікування доки закінчиться анімація переходу слайдів
    zIndex: 1000,           // z-index слайдів для IE9 
    mobileFirst: false,     // Mobile first для брекпоынтыв слайдера
    // адаптив слайдера
    responsive: [
        {
            breakpoint: 100,
            settings: {
            }
        }
    ],
    // Зміна материнського блоку для навігації
    appendArrows: 'classblok',
    appendDots: 'classblok',
    // Зв'язує 2 слайдери
    asNavFor: 'slaider_class'
});