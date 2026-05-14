import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'
import { phoneMask } from "./phone.js"


const reviewSwiper = document.querySelector('section.reviews div.swiper')
const exampleSwiper = document.querySelector('section.examples div.swiper')
const resultSwiper = document.querySelector('section.results div.swiper')
const select_labels = document.querySelectorAll('fieldset.select label')
const phoneInputs = document.querySelectorAll('input[type=tel]')
const services = document.querySelectorAll('section.services div.service')
const backgrounds = document.querySelectorAll('section.services div.backgrounds img')
const slider = document.querySelector('section.services div.slider')
const intervalTime = 5000
let intervalID



new Swiper(reviewSwiper, {
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
        nextEl: reviewSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
        prevEl: reviewSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
    },
    pagination: {
        el: reviewSwiper?.closest('section').querySelector('div.swiper-pagination'),
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: false
        },
        960: {
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: false
        }
    }
})

new Swiper(exampleSwiper, {
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
        nextEl: exampleSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
        prevEl: exampleSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
    },
    pagination: {
        el: exampleSwiper?.closest('section').querySelector('div.swiper-pagination'),
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: false
        },
        960: {
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: false
        }
    }
})

new Swiper(resultSwiper, {
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
        nextEl: resultSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
        prevEl: resultSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
    },
    pagination: {
        el: resultSwiper?.closest('section').querySelector('div.swiper-pagination'),
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
            autoHeight: false
        },
        960: {
            slidesPerView: 2.5,
            spaceBetween: 10,
            autoHeight: false
        }
    }
})



//  Слайдер
services[0]?.classList.add('active')
backgrounds[0]?.classList.add('active')
if (services.length > 0) {
    function startInterval() {
        intervalID = setInterval(event => {
            const activeService = document.querySelector('section.services div.service.active')
            let index = Array.from(activeService.parentElement.children).indexOf(activeService)

            if (activeService.parentElement.children.length - 1 <= index) index = -1

            services.forEach(service => {
                service.classList.remove('active')
            })
            backgrounds.forEach(background => {
                background.classList.remove('active')
            })

            services[index + 1].classList.add('active')
            backgrounds[index + 1].classList.add('active')
        }, intervalTime)
    }

    services?.forEach(service => {
        service.addEventListener('click', event => {
            services.forEach(service => {
                service.classList.remove('active')
            })
            backgrounds.forEach(background => {
                background.classList.remove('active')
            })
            service.classList.add('active')
            backgrounds[Array.from(service.parentElement.children).indexOf(service)].classList.add('active')
        })
    })

    startInterval()

    slider?.addEventListener('mouseenter', () => {
        clearInterval(intervalID)
    })

    slider?.addEventListener('mouseleave', () => {
        startInterval()
    })
}


// Маска телефона
phoneInputs.forEach(phoneInput => {
    ['input', 'blur', 'focus'].forEach(event => {
        phoneInput.addEventListener(event, phoneMask)
    })
})



// Переключатель попапов в шапке
window.headerPopup = (activeClass) => {
    let classes = ['search', 'menu']
    const header = document.querySelector('header')
    const openedItems = document.querySelectorAll('.open')


    if (activeClass === 'close') {
        activeClass === 'close' && header.classList.remove(...classes)
        openedItems.forEach(item => item.classList.remove('open'))
        return
    }

    if (header.classList[0]) {
        if (header.classList[0] === activeClass) {
            header.classList.remove(activeClass)
            openedItems.forEach(item => item.classList.remove('open'))
        } else {
            header.classList.remove(header.classList[0])
            header.classList.add(activeClass)
        }
    } else {
        header.classList.add(activeClass)
    }

}


// Куки
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}
function initCookies() {
    const banner = document.getElementById('cookie-banner')
    const btn = document.getElementById('accept-cookies')

    if (!getCookie('cookies_accepted')) {
        banner.classList.add('show')
    }

    btn.addEventListener('click', () => {
        setCookie('cookies_accepted', 'true', 365)
        banner.classList.remove('show')
    })
}
initCookies()



// Селект
select_labels.forEach(label => {
    label.addEventListener('click', event => {
        setTimeout(() => {
            document.querySelector('form').focus()
        }, 100)
    })
})



// Проигрыватель видео
const playbuttons = document.querySelectorAll('div.play')
playbuttons.forEach(playbutton => {

    const video = playbutton.previousElementSibling

    playbutton?.addEventListener('click', () => {
        if (video.paused) {
            video.play()
            playbutton.classList.add('playing')
        } else {
            video.pause()
            playbutton.classList.remove('playing')
        }
    })

    video?.addEventListener('ended', () => playbutton.classList.remove('playing'))
    video?.addEventListener('play', () => playbutton.classList.add('playing'))
    video?.addEventListener('pause', () => playbutton.classList.remove('playing'))

})



// Анимация
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // entry.isIntersecting ? entry.target.classList.add('animate') : entry.target.classList.remove('animate')
        if (entry.isIntersecting) {
            entry.target.classList.add('animate')
        } else {
            entry.target.classList.contains('loop') && entry.target.classList.remove('animate')
        }

    })
}, {
    rootMargin: '0px 0px -10% 0px'
})

var animateElements = document.querySelectorAll('div.observe')
animateElements.forEach(element => observer.observe(element))
console.log(animateElements)




gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('span.digit').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const obj = { value: 0 };

    gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power1.out",
        onUpdate: () => {
            counter.innerHTML = Math.ceil(obj.value).toLocaleString();
        },
        scrollTrigger: {
            trigger: counter,
            start: "top 80%"
        }
    });
});










const dots = document.querySelectorAll('img.dots')
dots.forEach(dot => {
    const box = dot.parentNode
    const speed = 0.03;
    const overflowAmount = 250;

    let targetX, targetY;
    let x = 0;
    let y = 0;

    function setNewTarget() {
        const imgWidth = dot.offsetWidth;
        const imgHeight = dot.offsetHeight;
        const boxWidth = box.clientWidth;
        const boxHeight = box.clientHeight;

        // Границы для выхода за все стороны
        const minX = -overflowAmount;
        const maxX = boxWidth - imgWidth + overflowAmount;
        const minY = -overflowAmount;
        const maxY = boxHeight - imgHeight + overflowAmount;

        targetX = minX + Math.random() * (maxX - minX);
        targetY = minY + Math.random() * (maxY - minY);
    }

    function move() {
        x += (targetX - x) * speed;
        y += (targetY - y) * speed;

        dot.style.transform = `translate(${x}px, ${y}px)`;

        if (Math.hypot(targetX - x, targetY - y) < 2) {
            setNewTarget();
        }

        requestAnimationFrame(move);
    }

    setNewTarget();
    move();
})
