import {addFisdTaskModel} from '../../components/strat_task_list/index';
/**
 * Represents a add first task page
 * @class
 */
export class addFirstTaskPage{
    /**
     * render add first task page
     * @method
     */
    render(parent){
        parent.innerHTML = addFisdTaskModel.createPage();
    }
}
