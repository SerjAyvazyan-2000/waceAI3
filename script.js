document.addEventListener('DOMContentLoaded',()=>{

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
    function updateImages(theme) {
    const images = document.querySelectorAll("img[data-light][data-dark]");
    images.forEach(img => {
        const newSrc = theme === "dark" ? img.dataset.dark : img.dataset.light;
        img.src = newSrc;
    });
    }
    const initialTheme = document.documentElement.getAttribute("data-theme");
    updateImages(initialTheme);

    document.querySelectorAll('.menu-list-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    
    function toggleAccordion(element) {
        const column = element.closest('.faq__column');
        const wrapper = column.querySelector('.faq__wrapper');
        const textElement = wrapper.querySelector('p');
        const indicator = column.querySelector('.faq__indicator');
        const allColumns = document.querySelectorAll('.faq__column');

        allColumns.forEach(col => {
            if (col !== column && col.classList.contains('active')) {
                col.classList.remove('active');
                col.querySelector('.faq__indicator').classList.remove('active');
                col.querySelector('.faq__wrapper p').style.maxHeight = null;
            }
        });

        const isActive = column.classList.contains('active');
        indicator.classList.toggle('active', !isActive);

        if (isActive) {
            textElement.style.maxHeight = null;
            column.classList.remove('active');
        } else {
            textElement.style.maxHeight = textElement.scrollHeight + 'px';
            column.classList.add('active');
        }
    }

    document.querySelectorAll('.faq__indicator').forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAccordion(indicator);
        });
    });

    document.querySelectorAll('.faq__wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            toggleAccordion(wrapper);
        });
    });



    const tabButtons = document.querySelectorAll('.primary__tab-button');
    const tabs = document.querySelectorAll('.primary__swiper');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
        const targetId = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.toggle('active', btn === button));

        tabs.forEach(tab => {
            if (tab.id === targetId) {
            tab.classList.remove('hide');
            } else {
            tab.classList.add('hide');
            }
        });
        });
    });

    const swiper = new Swiper(".how-work-swiper", {
        spaceBetween: 20,
        slidesPerView:3,
        pagination: {
            el: ".work-swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            320: { slidesPerView: 1 },
            490: { slidesPerView: 1.2 },
            620: { slidesPerView: 1.5 , },
            810: { slidesPerView: 2 },
            992: { slidesPerView: 2.5 },
            1263: { slidesPerView: 2.6 },
            1300: { slidesPerView: 3 },
        },
    });


    let swiperWork = null
    let swiperPrimary = []

    function initSwipers() {
        const width = window.innerWidth


        if (width <= 768 && swiperPrimary.length === 0) {
            document.querySelectorAll('.primary__swiper').forEach(swiperEl => {
                const swiperInstance = new Swiper(swiperEl, {
                    slidesPerView: 'auto',
                    pagination: {
                        el: swiperEl.querySelector('.primary__swiper-controls'),
                        clickable: true,
                    },
                })
                swiperPrimary.push(swiperInstance)
            })
        } else if (width > 768 && swiperPrimary.length > 0) {
            swiperPrimary.forEach(sw => sw.destroy(true, true))
            swiperPrimary = []
        }
    }
    initSwipers()

    window.addEventListener('resize', () => {
        initSwipers()
    })


})



document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-top, .fade-bottom"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        
        }
      });
    },
    {
      threshold: 0.15, 
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});

