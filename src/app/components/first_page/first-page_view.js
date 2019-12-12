import firstPage from './first_page_template.hbs';

/**
 * Represents a first page view.
 * @class
 */
class FirstPage_view {
    /**
     * render a first page
     * @method
     * @param {string} context - show context for first page
     * @returns {firstPage}  - template for first page
     */
    createPage(context) {
        return firstPage(context);
    }
}

export {FirstPage_view};
