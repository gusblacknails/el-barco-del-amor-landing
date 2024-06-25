/**
 * Animations
**/

function revealAnimations () {

    const elements = document.querySelectorAll('[data-reveal]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add('revealed');
            }
        })
    }, { threshold: 0 })

    elements.forEach((element) => {
        if (element.getBoundingClientRect().y < 0) {
            element.classList.add('revealed');
        } else {
            animationObserver.observe(element);
        }
    });
}

export { revealAnimations };
