//
// JS entry point
// ================================================================================

import { gallery } from './gallery.js';
import { menu } from './menu.js';
import { quotes } from './quotes.js';
import { revealAnimations } from './reveal-animations';
import { scrollPosition } from './scroll-position';



function autorun(){
    gallery();
    menu();
    quotes();
    revealAnimations();
    scrollPosition();
   
    console.log('Scripts Loaded!');
};

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
