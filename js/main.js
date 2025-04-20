// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    initMobileMenu();
    
    // 轮播图功能
    initSlider();
    
    // 客户评价轮播
    initTestimonials();
});

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // 切换菜单图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 点击导航链接后关闭菜单
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // 窗口大小改变时处理菜单状态
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// 轮播图功能
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // 如果没有轮播元素，则退出
    if (!slides.length) return;
    
    // 设置轮播图
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 移除所有点的激活状态
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 显示当前幻灯片和点
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // 更新当前幻灯片索引
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }
    
    // 自动轮播
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // 停止自动轮播
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // 事件监听
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            // 点击后重置自动轮播计时器
            stopSlideInterval();
            startSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            // 点击后重置自动轮播计时器
            stopSlideInterval();
            startSlideInterval();
        });
    }
    
    // 点击指示点切换幻灯片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            // 点击后重置自动轮播计时器
            stopSlideInterval();
            startSlideInterval();
        });
    });
    
    // 鼠标悬停时暂停自动轮播
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideInterval);
        sliderContainer.addEventListener('mouseleave', startSlideInterval);
    }
    
    // 触摸事件处理（移动端滑动支持）
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            stopSlideInterval();
        }, { passive: true });
        
        sliderContainer.addEventListener('touchmove', function(e) {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', function() {
            const touchDiff = touchStartX - touchEndX;
            
            // 判断滑动方向
            if (touchDiff > 50) {
                // 向左滑动，显示下一张
                nextSlide();
            } else if (touchDiff < -50) {
                // 向右滑动，显示上一张
                prevSlide();
            }
            
            startSlideInterval();
        }, { passive: true });
    }
    
    // 启动自动轮播
    startSlideInterval();
}

// 客户评价轮播功能
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    // 如果没有评价元素，则退出
    if (!testimonials.length) return;
    
    // 显示指定评价
    function showTestimonial(index) {
        // 隐藏所有评价
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // 移除所有点的激活状态
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // 显示当前评价和点
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        // 更新当前评价索引
        currentTestimonial = index;
    }
    
    // 下一个评价
    function nextTestimonial() {
        let next = currentTestimonial + 1;
        if (next >= testimonials.length) {
            next = 0;
        }
        showTestimonial(next);
    }
    
    // 上一个评价
    function prevTestimonial() {
        let prev = currentTestimonial - 1;
        if (prev < 0) {
            prev = testimonials.length - 1;
        }
        showTestimonial(prev);
    }
    
    // 自动轮播
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }
    
    // 停止自动轮播
    function stopTestimonialInterval() {
        clearInterval(testimonialInterval);
    }
    
    // 事件监听
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevTestimonial();
            // 点击后重置自动轮播计时器
            stopTestimonialInterval();
            startTestimonialInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextTestimonial();
            // 点击后重置自动轮播计时器
            stopTestimonialInterval();
            startTestimonialInterval();
        });
    }
    
    // 点击指示点切换评价
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
            // 点击后重置自动轮播计时器
            stopTestimonialInterval();
            startTestimonialInterval();
        });
    });
    
    // 启动自动轮播
    startTestimonialInterval();
}

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // 获取目标元素
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        e.preventDefault();
        
        // 计算滚动位置
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // 平滑滚动
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// 滚动时显示返回顶部按钮
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    }
});

// 页面滚动动画效果
window.addEventListener('scroll', function() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.classList.add('animate');
        }
    });
}); 