window.onload = function(){
    document.addEventListener('click', documentActions);
    
    function documentActions (a){
        const targetElement = a.target;
        const pluginsCode = document.getElementById('pluginsCode');
        const pluginsCodeBurger = document.getElementsByClassName('plugins__code-burger');
        const pluginsCodeHover1 = document.getElementsByClassName('plugins__code-hover1');
        const pluginsCodeGotop = document.getElementsByClassName('plugins__code-gotop');
        const shadow = document.getElementById('shadow');
        
        if (targetElement.classList.contains('plugins__btn-burger')){
            pluginsCode.classList.add('active');
            shadow.classList.add('active');
            pluginsCodeBurger[0].classList.add('active');
            
        }

        if (targetElement.classList.contains('plugins__btn-hover1')){
            pluginsCode.classList.add('active');
            shadow.classList.add('active');
            pluginsCodeHover1[0].classList.add('active');
        }
        if (targetElement.classList.contains('plugins__btn-gotop')){
            pluginsCode.classList.add('active');
            shadow.classList.add('active');
            pluginsCodeGotop[0].classList.add('active');
        }

        if (targetElement.classList.contains('shadow')){
            pluginsCode.classList.remove('active');
            shadow.classList.remove('active');
            pluginsCodeBurger[0].classList.remove('active');
            pluginsCodeHover1[0].classList.remove('active');
            pluginsCodeGotop[0].classList.remove('active');
            
        }
    }
}
// burger menu
function burger () {
    let burger = document.getElementById('burger');
    burger.classList.toggle('active');
}


    





