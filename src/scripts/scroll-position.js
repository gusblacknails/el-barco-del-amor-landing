/**
 * Scroll Position
**/


function scrollPosition () {

    const body = document.querySelector('body');
    const topMargin = 64; // Distance from the top to consider the page is at the top
    let actualPosition = window.scrollY; // Initial value

    // The function
    documentOnTop = (position) => {
        if (position < topMargin) {
            body.classList.add('--page-at-top');
        } else {
            body.classList.remove('--page-at-top');
        }
    }

    // The listener
    window.addEventListener('scroll', () => {
        actualPosition = window.scrollY;
        documentOnTop(actualPosition);
    });

    // Exec the function at start
    documentOnTop(actualPosition);
}

export { scrollPosition };
