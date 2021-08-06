// Об'єкту який анімуємо додаємо клас anim-items
// Задаємо анімації через клас active + transition;
function animateElement () {
    const animItems = document.querySelectorAll(".anim-items")

if ( animItems.length > 0){
    window.addEventListener('scroll', animOnScrol)
    function animOnScrol () {
        for (let i = 0; i < animItems.length; i++) {
            const animItem  = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemPoint > window.innerHeight) {
                let animItemPoint = window.innerHeight - window.innerHeight / animStart;
                
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('active')
            }else {
                if (!animItem.classList.contains('anim-one')){
                    animItem.classList.remove('active')
                }
                
            }
        }
    }

    // Позиція елемента
    function offset (el) {
        

        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop, 
            left: rect.left + scrollLeft 
        }
    }
    setTimeout(() => {
        animOnScrol();
    }, 300)
    
}
}
animateElement();
