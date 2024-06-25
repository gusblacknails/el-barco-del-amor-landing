# Landings Beka

## Imatges

- *Logo del Menu*: Tamany lliure en horitzontal
- *Logos* de *Component Logos* i *Footer*: Mínim 400x300px, 800x600px recomanat
- *Hero Desktop*: Mínim 1920x768px
- *Hero Mobile*: Mínim 1250x750px
- *Amplada Completa*: Mínim 1920px d'amplada

## Components' Guidelines

There is a set of components that can be used as sections, besides the menu and the footer. All of them have their own template and can be invoked repetedly and listed in any order.

The components list is composed of the *menu*, the *footer* and a *set of reusable content components*. All them have a list of options in their template files, under `src/components` folder.

List of components:

- *Menu*: Responsive menu
- *Call To Action*: An image and button to a campaign
- *Video*: Iframe to add a video
- *Details*: Technical details and movie poster
- *Follow Us*: Social media links
- *Gallery*: Responsive gallery of pictures using Swiper
- *Hero*: Hero image that accepts logos, buttons and still picture or video options
- *Image*: Simple responsive image for design purposes
- *Logos*: A list of logos, useful for sponsors or movie awards
- *Quotes*: A list of quotes by the media, accepts links, authors, and images
- *Share*: A module with direct links to share in social media
- *Text and Image One*: Text and image (Picture left aligned on desktop devices, but reversible)
- *Text and Image Two*: Text and image (Picture right aligned on desktop devices, but reversible), better with landscape pictures
- *Text Centered*: Big centered text, useful for synopsia
- *Ticketing*: To embed a ticketing specific iframe
- *Footer*: With copyright information.

They are set up using the `data.json` file.

### The data: data.json

The data file has diferent blocks:

Besides the site and config data blocks, the others are references to the diferent components:

- *site*: Required. Global site information.
- *config*: Required. General design config with fonts and colors.
- *menu*: Optional. Navigation contents. If there isn't a "menu" section, it won't appear.
- *sections*: Required. Where all the reusable components are listed.
- *footer*: Required.

In the data JSON they are basically listed like this:

```
"data": {
    "site": {...},
    "config": {...},
    "menu": {...},
    "sections": {
        {"type": "callToAction",...},
        {"type": "video",...},
        {"type": "details",...},
        {"type": "followUs",...},
        {"type": "gallery",...},
        {"type": "hero",...},
        {"type": "image",...},
        {"type": "logos",...},
        {"type": "quotes",...},
        {"type": "share",...},
        {"type": "textAndImageOne",...},
        {"type": "textAndImageTwo",...},
        {"type": "textCentered",...},
        {"type": "ticketing",...}
    }
    "footer": {...}
}
```

Each component has its own documented options in the template. This is an example of the overall data structure with references to the *site* and *config*:

```
{
    "data": {

        "site": {
            "movieName": "Sick of Myself",
            "url": "https://www.sickofmyself.es/",
            "description": "Signe y Thomas...",
            "image": "https://www.sickofmyself.es/assets/images/hero--desktop.jpg"
        },

        "config": {
            "googleFontsURL": "https://fonts.googleapis.com/css2?family=Inter:wght@500;900&family=Poppins:wght@600&display=swap",
            "fontBase": "Inter",
            "fontDisplay": "Poppins",

            "colorBase": "#2c2c2c",
            "colorAccent": "#E4004B",
            "colorBgPrimary": "#F1ECE9",
            "colorBgSecondary": "#ECDFD7"
        },

        "menu": {
            // Optional, delete to disable
            // Documentation in the component
        },

        "sections": [
            // Section list of the site
            // Documentation in each component
        ],

        "footer": {
            // Documentation in the component
        }
    }
}
```

### Hero

The hero can accept optional logo and button. The background images are required, and it can also accept a video (video and poster image).

The aspect ratio of the logo is adaptative. It will appear as big as possible inside a specific area. When there is a button, the area is usually close to a square. Otherwise, it has a portrait layout area. This area can be checked with the browser's developer tools.

The background will always cover the whole area.

## Useful resources to manage texts

- [Online WYSIWYG](https://onlinehtmleditor.dev/)
- [HTML Entities Encoder / Decoder](https://www.web2generators.com/html-based-tools/online-html-entities-encoder-and-decoder)
