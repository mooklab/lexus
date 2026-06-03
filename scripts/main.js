import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'
import { phoneMask } from "./phone.js"
import { Accordion } from './accordion.js'


// gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(TextPlugin)

const reviewSwiper = document.querySelector('section.reviews div.swiper')
const exampleSwiper = document.querySelector('section.examples div.swiper')
const resultSwiper = document.querySelector('section.results div.swiper')
const select_labels = document.querySelectorAll('fieldset.select label')
const select_choices = document.querySelectorAll('fieldset.select div.select_choice')
const phoneInputs = document.querySelectorAll('input[type=tel]')
const services = document.querySelectorAll('section.services div.service')
const backgrounds = document.querySelectorAll('section.services div.backgrounds img')
const slider = document.querySelector('section.services div.slider')
const accordions = document.querySelectorAll('div.accordion')
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
            document.querySelector('section.services div.counter span.current').textContent = '0' + (index + 2)
        }, intervalTime)
    }

    services?.forEach(service => {
        service.addEventListener('mouseenter', event => {
            services.forEach(service => {
                service.classList.remove('active')
            })
            backgrounds.forEach(background => {
                background.classList.remove('active')
            })
            service.classList.add('active')
            document.querySelector('section.services div.counter span.current').textContent = '0' + (Array.from(service.parentElement.children).indexOf(service) + 1)
            setTimeout(function () {
                backgrounds[Array.from(service.parentElement.children).indexOf(service)].classList.add('active')
            }, 250)
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





// Аккордионы
accordions && accordions.forEach(element => {
    const button = element.querySelector('div.accordion_caption')
    const content = element.querySelector('div.accordion_content')
    new Accordion(element, button, content, 500)
})

// Селект
select_labels.forEach(label => {
    label.addEventListener('click', event => {
        setTimeout(() => {
            label.closest('form').focus()
        }, 100)
    })
})

select_choices.forEach(choice => {
    choice.addEventListener('click', event => {
        setTimeout(() => {
            choice.closest('form').focus()
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



// Анимация при скролле
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // entry.isIntersecting ? entry.target.classList.add('animate') : entry.target.classList.remove('animate')
        if (entry.isIntersecting) {
            entry.target.classList.add('animate')
        } else {
            entry.target.classList.contains('languageTimeline') && entry.target.classList.remove('animate')
        }

    })
}, {
    rootMargin: '0px 0px -10% 0px'
})

var animateElements = document.querySelectorAll('div.observe')
animateElements.forEach(element => observer.observe(element))







// const dots = document.querySelectorAll('img.dots')
// dots.forEach(dot => {
//     const box = dot.parentNode
//     const speed = 0.03;
//     const overflowAmount = 250;

//     let targetX, targetY;
//     let x = 0;
//     let y = 0;

//     function setNewTarget() {
//         const imgWidth = dot.offsetWidth;
//         const imgHeight = dot.offsetHeight;
//         const boxWidth = box.clientWidth;
//         const boxHeight = box.clientHeight;

//         // Границы для выхода за все стороны
//         const minX = -overflowAmount;
//         const maxX = boxWidth - imgWidth + overflowAmount;
//         const minY = -overflowAmount;
//         const maxY = boxHeight - imgHeight + overflowAmount;

//         targetX = minX + Math.random() * (maxX - minX);
//         targetY = minY + Math.random() * (maxY - minY);
//     }

//     function move() {
//         x += (targetX - x) * speed;
//         y += (targetY - y) * speed;


//         if (window.innerWidth <= 960) {
//             dot.style.transform = `scale(0.5) translate(${x}px, ${y}px)`;
//         } else {
//             dot.style.transform = `translate(${x}px, ${y}px)`;
//         }

//         if (Math.hypot(targetX - x, targetY - y) < 2) {
//             setNewTarget();
//         }

//         requestAnimationFrame(move);
//     }

//     setNewTarget();
//     move();
// })




function createTimeline(target) {
    return gsap.timeline({
        scrollTrigger: {
            trigger: target,
            invalidateOnRefresh: true,
            start: "top center",
            toggleActions: "play none none none"
        }
    })
}




// GSAP - Common Main

const ease = 'cubic-bezier()'
const timelineIndexMain = gsap.timeline()
const header = document.querySelectorAll('header')
const headerDivide = document.querySelectorAll('header hr.divide')

const mainTitle = document.querySelectorAll('section.main div.container > h1')
const mainBreadcrumbs = document.querySelectorAll('section.main div.breadcrumbs')
const mainDivide = document.querySelectorAll('section.main hr.divide')
const mainGroup = document.querySelectorAll('section.main div.group > *')
const mainPreview = document.querySelectorAll('section.main img.preview')
const mainForm = document.querySelectorAll('section.main form')

function safeTimeline(target, vars, delay) {
    if (target) timelineIndexMain.to(target, vars, delay)
}

gsap.set(header, { y: -100 })
gsap.set(headerDivide, { width: 0 })
gsap.set(mainBreadcrumbs, { opacity: 0, y: 50 })
gsap.set(mainTitle, { opacity: 0, y: 50 })
gsap.set(mainDivide, { width: 0 })
gsap.set(mainGroup, { opacity: 0, y: 50 })
gsap.set(mainPreview, { opacity: 0, x: 50 })
gsap.set(mainForm, { opacity: 0, y: 50 })

safeTimeline(header, { y: 0, duration: 0.7 })
safeTimeline(mainBreadcrumbs, { opacity: 1, y: 0, duration: 0.5 })
safeTimeline(headerDivide, { width: '100%', duration: 0.7 })
safeTimeline(mainTitle, { opacity: 1, y: 0, duration: 0.65 }, '<')
safeTimeline(mainDivide, { width: '100%', duration: 0.35 })
safeTimeline(mainGroup, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1 })
safeTimeline(mainPreview, { opacity: 1, x: 0, duration: 0.35 }, '-=0.25')
safeTimeline(mainForm, { opacity: 1, y: 0, duration: 0.35 }, '-=0.25')


// Смена языков

const mainLanguage = document.querySelector('section.main span.language')
const languages = ['中文', '한국어', '日本語', 'العربية']
const chars = "アイウエオカキクケコ1234567890@#$%"

let hovered = false
let current = 0

const languageTimeline = gsap.timeline({ repeat: true })

languages.forEach(lang => {
    languageTimeline.to(mainLanguage, { duration: 0.3, text: lang, ease: "none" })
    languageTimeline.to({}, { duration: 1 })
    languageTimeline.to(mainLanguage, { duration: 0.5, text: "", ease: "none" })
})

// рандомные символы
function scrambleTo(word) {
    hovered = true
    languageTimeline.pause()

    let iteration = 0

    gsap.to({}, {
        duration: 1,

        onUpdate() {
            mainLanguage.textContent = word
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return word[index]
                    }

                    return chars[
                        Math.floor(Math.random() * chars.length)
                    ]
                })
                .join("")

            iteration += 0.3
        },

        onComplete() {
            mainLanguage.textContent = word
        }
    })
}

// hover
mainLanguage?.addEventListener("mouseenter", () => {
    scrambleTo("Русский")
})

// уход курсора
mainLanguage?.addEventListener("mouseleave", () => {
    hovered = false
    current = 0

    gsap.delayedCall(0.5, () => {
        if (!hovered) {
            languageTimeline.resume()
        }
    })
})



// GSAP - Index Services

const indexServicesTitle = document.querySelectorAll('section.services div.title h2')
const indexServicesList = document.querySelectorAll('section.services div.slider')
const indexServicesCounter = document.querySelectorAll('section.services div.counter')
const timelineIndexServices = createTimeline('section.services')

gsap.set(indexServicesTitle, { opacity: 0, y: 50 })
gsap.set(indexServicesList, { opacity: 0, y: 50 })
gsap.set(indexServicesCounter, { opacity: 0, y: 50 })

timelineIndexServices
    .to(indexServicesTitle, { opacity: 1, y: 0, duration: 0.25 })
    .to(indexServicesCounter, { opacity: 1, y: 0, duration: 0.25 })
    .to(indexServicesList, { opacity: 1, y: 0, duration: 0.25 })





// GSAP - Common Digits

const digitsTitle = document.querySelector('section.digits h3')
const digitsImage = document.querySelector('section.digits div.preview')
const digitsCounterBlocks = document.querySelectorAll('section.digits div.item')
const digitsCounterNumbers = document.querySelectorAll('section.digits span.digit')
const digitsText = digitsTitle?.textContent
const digitValue = { number: 0 }
const timelineDigits = createTimeline('section.digits')

gsap.set(digitsImage, { opacity: 0 })
gsap.set(digitsTitle, { text: '' })
gsap.set(digitsCounterBlocks, { opacity: 0, y: 50 })

timelineDigits
    .to(digitsImage, { opacity: 1, duration: 0.5 })
    .to(digitsTitle, { duration: 2, ease: 'linear', text: digitsText }, '<')
    .to(digitsCounterBlocks, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, '-=1.5')

digitsCounterBlocks.forEach((counter, index) => {
    const digit = counter.querySelector('span.digit')
    const target = digit.getAttribute('data-target')
    const value = { number: 0 }

    timelineDigits.to(value, {
        number: target,
        duration: 1.5,
        ease: "power1.out",
        onUpdate: () => {
            digit.textContent = Math.floor(value.number)
        }
    }, '<')

})




// GSAP - Common Advantages

const advantagesTitle = document.querySelectorAll('section.advantages h2')
const advantagesListItem = document.querySelectorAll('section.advantages div.advantage')
const timelineAdvantages = createTimeline('section.advantages')

gsap.set(advantagesTitle, { opacity: 0, y: 50 })
gsap.set(advantagesListItem, { opacity: 0, x: -50 })

timelineAdvantages.to(advantagesTitle, { opacity: 1, y: 0, duration: 0.5 })
timelineAdvantages.to(advantagesListItem, { opacity: 1, x: 0, stagger: 0.1 })



// GSAP - Common Titles
const sectionTitles = document.querySelectorAll(':is(section.example, section.decision, section.navigation, section.choose) div.text')
sectionTitles.forEach(title => {

    const timeline = createTimeline(title)

    gsap.set(title.children, { opacity: 0, y: 50 })
    timeline.to(title.children, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 })
})



// GSAP - Common Footer

const footerTopColumns = document.querySelectorAll('footer div.top > *, footer div.top div.menus > *')
const footerDivide = document.querySelectorAll('footer hr.divide')
const footerBottomColumns = document.querySelectorAll('footer div.bottom > *')
const timelineFooter = createTimeline('footer')

gsap.set(footerTopColumns, { opacity: 0, y: 50 })
gsap.set(footerDivide, { width: 0 })
gsap.set(footerBottomColumns, { opacity: 0 })

timelineFooter.to(footerTopColumns, { opacity: 1, y: 0, stagger: 0.05 })
timelineFooter.to(footerDivide, { width: '100%' })
timelineFooter.to(footerBottomColumns, { opacity: 1, stagger: 0.05 })



// GSAP - Common consulting

const consultingText = document.querySelectorAll('section.consulting div.text > *, section.consulting button')
const consultingImage = document.querySelectorAll('section.consulting img.hand')
const timelineConsulting = createTimeline('section.consulting')

gsap.set(consultingText, { opacity: 0, y: 50 })
gsap.set(consultingImage, { opacity: 0, y: 50 })

timelineConsulting.to(consultingText, { opacity: 1, y: 0, stagger: 0.15 })
timelineConsulting.to(consultingImage, { opacity: 1, y: 0 }, '<')




// GSAP - Reviews

const reviewsTitle = document.querySelectorAll('section.reviews h2')
const reviewsList = document.querySelectorAll('section.reviews div.swiper-slide')
const timelineReviews = createTimeline('section.reviews')

gsap.set(reviewsTitle, { opacity: 0, y: 50 })
gsap.set(reviewsList, { opacity: 0, x: 50 })

timelineReviews.to(reviewsTitle, { opacity: 1, y: 0 })
timelineReviews.to(reviewsList, { opacity: 1, x: 0, stagger: 0.1 })





// GSAP - Faq

const faqTitle = document.querySelectorAll('section.faq div.description > *')
const faqCallback = document.querySelectorAll('section.faq div.callback > *')
const faqList = document.querySelectorAll('section.faq div.list > *')
const timelineFaq = createTimeline('section.faq')

gsap.set(faqTitle, { opacity: 0, x: -50 })
gsap.set(faqCallback, { opacity: 0, x: -50 })
gsap.set(faqList, { opacity: 0, y: 50 })

timelineFaq.to(faqTitle, { opacity: 1, x: 0, stagger: 0.15 })
timelineFaq.to(faqCallback, { opacity: 1, x: 0, stagger: 0.15 }, '<')
timelineFaq.to(faqList, { opacity: 1, y: 0, stagger: 0.15 },)






// GSAP - About

const aboutTitle = document.querySelectorAll('section.about h2')
const aboutDivide = document.querySelectorAll('section.about hr.divide')
const AboutText = document.querySelectorAll('section.about div.text > *')
const timelineAbout = createTimeline('section.about')

gsap.set(aboutTitle, { opacity: 0, y: 50 })
gsap.set(aboutDivide, { width: 0 })
gsap.set(AboutText, { opacity: 0, y: 50 })

timelineAbout.to(aboutTitle, { opacity: 1, y: 0 })
timelineAbout.to(aboutDivide, { width: '100%', duration: 1 })
timelineAbout.to(AboutText, { opacity: 1, y: 0, stagger: 0.15 }, '-=0.5')




// GSAP - Examples

const examplesTitle = document.querySelectorAll('section.examples h2')
const examplesList = document.querySelectorAll('section.examples div.swiper-slide')
const timelineExamples = createTimeline('section.examples')

gsap.set(examplesTitle, { opacity: 0, y: 50 })
gsap.set(examplesList, { opacity: 0, x: 50 })

timelineExamples.to(examplesTitle, { opacity: 1, y: 0 })
timelineExamples.to(examplesList, { opacity: 1, x: 0, stagger: 0.1 })





// GSAP - GET

const getTitle = document.querySelectorAll('section.get h2')
const getList = document.querySelectorAll('section.get div.list > *')
const getDividers = document.querySelectorAll('section.get hr.divide')
const timelineGet = createTimeline('section.get')

gsap.set(getTitle, { opacity: 0, y: 50 })
gsap.set(getList, { opacity: 0, x: 50 })
gsap.set(getDividers, { width: 0 })

timelineGet.to(getTitle, { opacity: 1, y: 0 })
timelineGet.to(getList, { opacity: 1, x: 0, stagger: 0.1 })
timelineGet.to(getDividers, { width: '100%', stagger: 0.15 }, '-=0.7')



// GSAP - Search

const searchBreadcrumbs = document.querySelectorAll('section.search div.breadcrumbs')
const searchTitle = document.querySelectorAll('section.search h2')
const searchForm = document.querySelectorAll('section.search div.form')
const searchResults = document.querySelectorAll('section.search div.results')
const timelineSearch = createTimeline('section.search')

gsap.set(searchBreadcrumbs, { opacity: 0, y: 50 })
gsap.set(searchTitle, { opacity: 0, y: 50 })
gsap.set(searchForm, { opacity: 0, y: 50 })
gsap.set(searchResults, { opacity: 0, y: 50 })

timelineSearch.to(searchBreadcrumbs, { opacity: 1, y: 0 })
timelineSearch.to(searchTitle, { opacity: 1, y: 0, stagger: 0.1 })
timelineSearch.to(searchForm, { opacity: 1, y: 0 }, '-=0.3')
timelineSearch.to(searchResults, { opacity: 1, y: 0 }, '-=0.3')













const svg = document.querySelector(".dots")
const gradient = document.querySelector("#gradient")

const width = 1920
const height = 1920
const radius = 600

const state = {
    t: 0
}

const speed = 0.005
const ratio = Math.sqrt(3)

gsap.ticker.add(() => {

    state.t += speed

    // безопасные границы
    const minX = radius
    const maxX = width - radius

    const minY = radius
    const maxY = height - radius

    // нормализованные синусы
    const sinX = (Math.sin(state.t * 1.2) + 1) / 2
    const sinY = (Math.sin(state.t * ratio) + 1) / 2

    // движение внутри границ
    const x = minX + sinX * (maxX - minX)
    const y = minY + sinY * (maxY - minY)

    gradient.setAttribute("cx", x)
    gradient.setAttribute("cy", y)
})


window.addEventListener('resize', () => {
    ScrollTrigger.refresh()
})