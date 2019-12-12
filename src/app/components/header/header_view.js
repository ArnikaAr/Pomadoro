
require('./header.less'); // example of including component's styles

import headerTemplate from './header.hbs';

const header_view = document.querySelector('header');

/**
 * Represents a header.
 * @class
 * @param {string} page - show what page is open now.
 */
export class HeaderView {
    /**
     * Construct a header.
     * @constructor
     * @param {string} page - show what page is open now.
     */
    constructor(page) {
        if (page === '/setting' || page === '/settingscategory') {
            this.options = {
                add: false,
                delete: false,
                task: true,
                statistic: true,
                settings: true,
                active_settings: true
            };
        } else if (page.indexOf('/report') !== -1) {
            this.options = {
                add: false,
                delete: false,
                task: true,
                statistic: true,
                settings: true,
                active_report: true
            }
        } else if (page === '/tasklist') {
            this.options = {
                add: true,
                delete: true,
                task: true,
                statistic: true,
                settings: true,
                active_task: true

            }
        } else if (page === '/timer') {
            this.options = {
                add: false,
                delete: false,
                task: true,
                statistic: true,
                settings: true,
                active_category: true
            };
        }else if(page === '/firstpage'){
            this.options = {
                add: false,
                delete: false,
                task: true,
                statistic: true,
                settings: true,
                active_settings: true
            };
        }
    }

    /**
     * render a header.
     * @method
     */
    render() {
        header_view.innerHTML = headerTemplate(this.options);
    }

    /**
     * Sticky property settings for header
     * @method
     */

    stickyHeader() {
        const header = document.querySelector(".header");
        const wrapper = document.querySelector(".header__wrapper");
        const logo = document.querySelector('.header__logo');
        const add = document.querySelector('.icon-add');
        const sticky = header.offsetTop;


        if (window.pageYOffset > sticky) {
            header.classList.add("sticky-header");
            wrapper.classList.add("sticky-header__centred")
            if(add) {
                add.style.visibility = "visible";
            }
            logo.style.visibility = "visible";

        } else {
            header.classList.remove("sticky-header");
            wrapper.classList.remove("sticky-header__centred");
            if(add) {
                add.style.visibility = "hidden";
            }
            logo.style.visibility = "hidden";
        }
    }
}
