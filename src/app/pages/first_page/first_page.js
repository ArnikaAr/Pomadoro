import {firstPage} from "../../components/first_page/index";
/**
 * Represents a add first task page
 * @class
 */

export class FirstPage{
    /**
     * render add first page
     * @method
     */
    render(parent){
        parent.innerHTML = firstPage.createPage();
    }
}
