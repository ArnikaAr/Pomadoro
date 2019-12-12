import settingsCategory  from '../settings_category/settings_category_template.hbs';
/**
 * Represents a settings category
 * @class
 */

export class SettingsCategory{
    /**
     * render a settings category
     * @method
     * @param {element} parent - parent element for render
     * @param {object} context - context for settings category
     */
    render (parent, context) {
        parent.innerHTML = settingsCategory(context);
    }
}
