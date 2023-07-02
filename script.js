"use strict"

// перевірка приладу 
const isMobile = {
    Android: () => {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: () => {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    IOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: () => {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: () => {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
}
const iconMenu=document.querySelector('.menu__icon')
const menuBody=document.querySelector('.menu__body')

if(iconMenu){
    iconMenu.addEventListener('click',function (e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    })
}


if (isMobile.any()) {
    document.body.classList.add('_touch')

    let menuArrows = document.querySelectorAll('.menu__arrow')
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function (e) {
                // добавляємо активний клас для батька де розташована стрілочка
                menuArrow.parentElement.classList.toggle('_active')
            })
        }
    }
} else {
    document.body.classList.add('_pc')

}

let menulinks = document.querySelectorAll('.menu__link[data-goto]')
if (menulinks.length > 0) {
    menulinks.forEach(menulink => {
        menulink.addEventListener('click', onMenuLinkClick)
    })
}
function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto)
        // pageYOffset к-сть прокручених пікселів по осі Y
        // document.querySelector('header').offsetHeight віднімаємо висоту шапки
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight

if(iconMenu.classList.contains('_active')){
    document.body.classList.remove('_lock')
    iconMenu.classList.remove('_active')
    menuBody.classList.remove('_active')
}

        window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
        })

        e.preventDefault()
    }
}



