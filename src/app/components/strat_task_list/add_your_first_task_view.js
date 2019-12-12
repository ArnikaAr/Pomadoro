import addfirstTask  from './addFirstTask.hbs';
/**
 * Represents a add first task page
 * @class
 */

 class AddFirstTaskView{
    /**
     * return  a add first task page
     * @method
     * @param {object} context - context for settings category
     *  @returns {template} - template for page with Add first task
     */
    createPage ( context) {
       return  addfirstTask(context);
    }
}
export {AddFirstTaskView}



