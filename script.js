// UFO Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive elements
    initUFOAnimation();
    initInfoBoxInteractions();
    initIconBarInteractions();
    initResponsiveFeatures();
    initScrollEffects();
    initScrollAnimations();
    initSmoothScrolling();
    
    // UFO Animation Controls
    function initUFOAnimation() {
        const ufo = document.querySelector('.ufo');
        if (!ufo) return;
        
        // Add hover effect to UFO
        ufo.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateX(-50%) translateY(-15px) scale(1.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        ufo.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'translateX(-50%) translateY(0px) scale(1)';
        });
        
        // Add click effect
        ufo.addEventListener('click', function() {
            this.style.transform = 'translateX(-50%) translateY(-20px) scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'translateX(-50%) translateY(0px) scale(1)';
            }, 200);
        });
    }
    
    // Info Box Interactions
    function initInfoBoxInteractions() {
        const infoBox = document.querySelector('.info-box');
        const contentItems = document.querySelectorAll('.content-item');
        const buttons = document.querySelectorAll('.btn');
        
        if (!infoBox) return;
        
        // Add hover effects to content items
        contentItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'all 0.2s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.transform = 'translateX(0)';
            });
            
            // Add click effect
            item.addEventListener('click', function() {
                this.style.transform = 'translateX(5px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateX(5px) scale(1)';
                }, 100);
            });
        });
        
        // Button interactions
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
                
                // Handle different button actions
                if (buttonText === 'Shop') {
                    showNotification('Shop 기능이 곧 추가됩니다!');
                } else if (buttonText === 'IG') {
                    showNotification('Instagram 페이지로 이동합니다!');
                    // In a real implementation, you would redirect to Instagram
                    // window.open('https://instagram.com/yourusername', '_blank');
                }
        });
    });
    
        // Add draggable functionality to info box
        makeDraggable(infoBox);
    }
    
    // Icon Bar Interactions
    function initIconBarInteractions() {
        const iconBar = document.querySelector('.icon-bar');
        const icons = document.querySelectorAll('.icon');
        
        if (!iconBar) return;
        
        // Add hover effects to icons
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(5deg)';
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.backgroundColor = 'transparent';
            });
            
            // Add click effects
            icon.addEventListener('click', function() {
                this.style.transform = 'scale(1.3) rotate(10deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.2) rotate(5deg)';
                }, 150);
                
                // Handle different icon actions
                const iconClass = this.className;
                if (iconClass.includes('apple-icon')) {
                    showNotification('App Store로 이동합니다!');
                } else if (iconClass.includes('play-icon')) {
                    showNotification('재생을 시작합니다!');
                } else if (iconClass.includes('spotify-icon')) {
                    showNotification('Spotify로 이동합니다!');
                } else if (iconClass.includes('number-icon')) {
                    showNotification('알림 1개가 있습니다!');
                }
            });
        });
        
        // Add draggable functionality to icon bar
        makeDraggable(iconBar);
    }
    
    // Responsive Features
    function initResponsiveFeatures() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(handleResize, 500);
        });
        
        function handleResize() {
            const infoBox = document.querySelector('.info-box');
            const iconBar = document.querySelector('.icon-bar');
            
            if (window.innerWidth <= 768) {
                // Mobile adjustments
                if (infoBox) {
                    infoBox.style.position = 'fixed';
                    infoBox.style.top = '10px';
                    infoBox.style.left = '10px';
                    infoBox.style.right = '10px';
                    infoBox.style.width = 'auto';
                }
                
                if (iconBar) {
                    iconBar.style.position = 'fixed';
                    iconBar.style.bottom = '10px';
                    iconBar.style.right = '10px';
                }
            } else {
                // Desktop adjustments
                if (infoBox) {
                    infoBox.style.position = 'fixed';
                    infoBox.style.top = '20px';
                    infoBox.style.left = '20px';
                    infoBox.style.right = 'auto';
                    infoBox.style.width = '400px';
                }
                
                if (iconBar) {
                    iconBar.style.position = 'fixed';
                    iconBar.style.bottom = '20px';
                    iconBar.style.right = '20px';
                }
            }
        }
        
        // Initial resize check
        handleResize();
    }
    
    // Scroll Effects
    function initScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
        
        function updateScrollEffects() {
            const scrollY = window.pageYOffset;
            const ufo = document.querySelector('.ufo');
            const infoBox = document.querySelector('.info-box');
            const iconBar = document.querySelector('.icon-bar');
            
            // Parallax effect for UFO (only in hero section)
            if (ufo && scrollY < window.innerHeight) {
                const ufoOffset = scrollY * 0.3;
                ufo.style.transform = `translateX(-50%) translateY(${ufoOffset}px)`;
            }
            
            // Subtle parallax for info box (only in hero section)
            if (infoBox && scrollY < window.innerHeight) {
                const infoOffset = scrollY * 0.1;
                infoBox.style.transform = `translateY(${infoOffset}px)`;
            }
            
            // Subtle parallax for icon bar (only in hero section)
            if (iconBar && scrollY < window.innerHeight) {
                const iconOffset = scrollY * 0.1;
                iconBar.style.transform = `translateY(${-iconOffset}px)`;
            }
            
            ticking = false;
        }
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all content sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
        
        // Observe timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.animationDelay = `${index * 0.2}s`;
            observer.observe(item);
        });
        
        // Observe gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
        
        // Observe UFO items
        const ufoItems = document.querySelectorAll('.ufo-item');
        ufoItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.animationDelay = `${index * 0.15}s`;
            observer.observe(item);
        });
    }
    
    // Smooth Scrolling
    function initSmoothScrolling() {
        // Add smooth scrolling to all internal links
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                });
            }
        });
    });
    
        // Add scroll to top functionality
        const scrollToTopBtn = createScrollToTopButton();
        document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', '맨 위로 스크롤');
        
        // Style the button
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #FFE135;
            color: #333;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(0) scale(1.1)';
            this.style.background = '#FFD700';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = '#FFE135';
        });
        
        // Add show class styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top.show {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
        
        return button;
    }
    
    // Utility Functions
    function makeDraggable(element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        
        element.addEventListener('mousedown', dragStart);
        element.addEventListener('touchstart', dragStart);
        
        function dragStart(e) {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
            
            if (e.target === element || element.contains(e.target)) {
                isDragging = true;
                element.style.cursor = 'grabbing';
                element.style.transition = 'none';
            }
        }
        
        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            element.style.cursor = 'grab';
            element.style.transition = 'all 0.2s ease';
        }
        
        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }
                
                xOffset = currentX;
                yOffset = currentY;
                
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        }
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }
    
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #FFE135;
            color: #000;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-size: 0.9rem;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'U' to focus UFO
        if (e.key.toLowerCase() === 'u') {
            const ufo = document.querySelector('.ufo');
            if (ufo) {
                ufo.focus();
                ufo.style.outline = '2px solid #FFE135';
                setTimeout(() => {
                    ufo.style.outline = 'none';
                }, 2000);
            }
        }
        
        // Press 'I' to focus info box
        if (e.key.toLowerCase() === 'i') {
            const infoBox = document.querySelector('.info-box');
            if (infoBox) {
                infoBox.focus();
                infoBox.style.outline = '2px solid #FFE135';
                setTimeout(() => {
                    infoBox.style.outline = 'none';
                }, 2000);
            }
        }
        
        // Press 'Escape' to reset all elements
        if (e.key === 'Escape') {
            const elements = document.querySelectorAll('.info-box, .icon-bar, .ufo');
            elements.forEach(el => {
                el.style.transform = '';
                el.style.outline = 'none';
            });
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add performance optimization
    let lastTime = 0;
    function throttle(func, limit) {
        return function() {
            const now = Date.now();
            if (now - lastTime >= limit) {
                func.apply(this, arguments);
                lastTime = now;
            }
        };
    }
    
    // Optimize scroll events
    const optimizedScrollHandler = throttle(function() {
        // Scroll-based animations can be added here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler);
});