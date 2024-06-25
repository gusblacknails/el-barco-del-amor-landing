/**
 * Menu
**/

function menu() {

    const menu = document.querySelector('.c-menu__nav');

    if (menu) {
        const links = document.querySelectorAll('.c-menu__anchor');
        const toggle = document.querySelector('.c-menu__toggle');
        const modalBg = document.querySelector('.c-modal-bg');

        function checkBreakpoint() {
            // If screensize is bigger than mobile, change a11y params
        };





        // Listeners
        // ========================================

        // Toggle
        toggle.addEventListener('click', () => {
            toggleMenu();
        });

        // Links
        links.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        })

        // Modal
        modalBg.addEventListener('click', () => {
            toggleMenu();
        });





        // Functions
        // ========================================

        function toggleMenu() {
            if (menu.classList.contains('--is-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function openMenu() {
            toggle.classList.add('--is-active');
            menu.classList.add('--is-active');
            menu.setAttribute('aria-expanded', 'true');

            modalBg.style.display = 'block';
            setTimeout(() => {
                modalBg.classList.add('--is-visible');
            }, 50);
        }

        function closeMenu() {
            toggle.classList.remove('--is-active');
            menu.classList.remove('--is-active');
            menu.removeAttribute('aria-expanded');

            modalBg.classList.remove('--is-visible');
            setTimeout(() => {
                modalBg.style.display = 'none';
            }, 400);
        }

    }
};

export { menu };
