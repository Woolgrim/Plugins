//----------------------------------------------------------------------------
// Обробка натискання на любий елемент сторінки
window.onload = function(){
    document.addEventListener('click', documentActions);
    
    function documentActions (a){
        const targetElement = a.target;

        if (targetElement.classList.contains('btn_clas')){
            // Подія
        }
    }
}