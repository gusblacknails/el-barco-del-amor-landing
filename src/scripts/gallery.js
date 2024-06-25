/**
 * Gallery
**/

import Swiper, { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/a11y';


function gallery () {

    // Breakpoints
    let breakpoint_xs = window.matchMedia( '(min-width: 0px) and (max-width: 767px)' );
    let breakpoint_md = window.matchMedia( '(min-width: 768px) and (max-width: 1023px)' );
    let breakpoint_lg = window.matchMedia( '(min-width: 1024px) and (max-width: 1279px)' );
    let breakpoint_xl = window.matchMedia( '(min-width: 1280px)' );

    // Find all Gallery Sections
    const galleries = document.querySelectorAll('[data-section="gallery"]');

    // Function for each Gallery
    galleries.forEach(gallery => {

        // Tumbnails
        const galleryThumbnails = gallery.querySelector('[data-slider="galleryThumbnails"]');
        const picturesThumbnails = gallery.querySelectorAll('[data-action="openPopupGallery"]');
        let galleryThumbnailsInit = false;

        // Popup
        const galleryPopup = gallery.querySelector('[data-section="galleryPopup"]');
        const galleryPopupSlider = galleryPopup.querySelector('[data-slider="galleryPopup"]');
        const galleryPopupBtnClose = galleryPopup.querySelector('[data-action="closePopupGallery"]');
        const galleryPopupNavPrev = galleryPopupSlider.querySelector('.c-slider-nav--prev');
        const galleryPopupNavNext = galleryPopupSlider.querySelector('.c-slider-nav--next');
        const transitionDuration = 400; // ms



        // Tumbnail Gallery
        // ==================================================

        const galleryThumbnailsSlider = function () {

            if ((breakpoint_xs.matches || breakpoint_md.matches) && !galleryThumbnailsInit) {

                const galleryThumbnailsNavPrev = galleryThumbnails.querySelector('.c-slider-nav__arrow--prev');
                const galleryThumbnailsNavNext = galleryThumbnails.querySelector('.c-slider-nav__arrow--next');

                let galleryThumbnailsSliderInstance = new Swiper(galleryThumbnails, {
                    modules: [ Navigation ],

                    loop: false,
                    slidesPerView: 1.2,
                    speed: 1000,
                    spaceBetween: 20,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,

                    navigation: {
                        nextEl: galleryThumbnailsNavPrev,
                        prevEl: galleryThumbnailsNavNext,
                    },

                    on: {
                        init: function () {
                            galleryThumbnailsInit = true;
                        },
                        resize: function () {
                            // Destroy instance when...
                            if(!(breakpoint_xs.matches || breakpoint_md.matches)) {
                                this.destroy();
                            }
                        },
                        destroy: function () {
                            galleryThumbnailsInit = false;
                        }
                    },

                    breakpoints: {
                        640: {
                            slidesPerView: 2.4,
                            slidesOffsetBefore: 24,
                            slidesOffsetAfter: 24,
                        },
                        768: {
                            slidesOffsetBefore: 28,
                            slidesOffsetAfter: 28,
                        },
                        960: {
                            slidesPerView: 2.6,
                        },
                    }
                });
            };
        };

        // On Load exec the builder
        window.addEventListener('load', function() {
            galleryThumbnailsSlider();
        });

        // On Resize exec the builder
        window.addEventListener('resize', function() {
            galleryThumbnailsSlider();
        });





        // Popup Gallery Slider
        // ==================================================

        const galleryPopupSliderInstance = new Swiper(galleryPopupSlider, {
            modules: [ Navigation, A11y ],

            loop: false,
            direction: 'horizontal',
            slidesPerView: 'auto',
            // slidesPerView: 1.4,
            speed: 1000,
            centeredSlides: true,
            spaceBetween: 32,

            navigation: {
                prevEl: galleryPopupNavPrev,
                nextEl: galleryPopupNavNext,
            },

            breakpoints: {
                1280: {
                    spaceBetween: 40,
                },
                1536: {
                    spaceBetween: 48,
                }
            }
        });





        // Popup Gallery Actions
        // ==================================================

        // Open Gallery
        function openPopupGallery() {
            galleryPopup.style.visibility = 'visible';
            galleryPopup.setAttribute('aria-hidden', 'false');
            galleryPopup.setAttribute('tabindex', '0');
            galleryPopup.classList.add('-is-visible');
        };

        // Close Gallery
        function closePopupGallery() {
            galleryPopup.classList.remove('-is-visible');
            setTimeout( () => {
                galleryPopup.style.visibility = 'hidden';
                galleryPopup.setAttribute('aria-hidden', 'true');
                galleryPopup.setAttribute('tabindex', '-1');
            }, transitionDuration );
        };





        // Popup Gallery Actions
        // ==================================================

        // Every picture to open the Popup Silder and move to its picture
        // Only on large screens, otherwise image are already big
        picturesThumbnails.forEach( (picture, index) => {
            picture.addEventListener('click', () => {
                if (breakpoint_lg.matches || breakpoint_xl.matches) {
                    galleryPopupSliderInstance.slideTo(index);
                    openPopupGallery();
                };
            })
        });

        // Close Popup - Button
        galleryPopupBtnClose.addEventListener('click', (event) => {
            event.preventDefault();
            closePopupGallery();
        });

        // Close Popup - Clicking Outside a picture or navigation
        galleryPopup.addEventListener('click', (event) => {
            if ( !( event.target.closest('img, .c-slider-nav__arrow') ) ) {
                closePopupGallery();
            }
        });

    });

}

export { gallery };
