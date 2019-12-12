import {taskController} from '../../components/task_list/index';




const eventBus = require('../../eventBus');

/**
 * Represents a add task list page
 * @class
 */
export class TaskListPage {
    /**
     * render add task list page
     * @method
     */
    render(parent) {
        taskController.render();
        eventBus.subscribe('renderedTaskList', rendered => {
            parent.innerHTML = rendered;
            const plusTask = document.querySelector('.openModal');
            plusTask.addEventListener('click', taskController.getModal.bind(taskController));
            const globalList = document.querySelector('.urgency-tab__globalList');
            if (globalList) {
                globalList.addEventListener('click', this.showGlobalList.bind(this));
            }
            const urgencyTab = document.querySelectorAll('.urgency-tab__link');
            urgencyTab.forEach(element => {
                element.addEventListener('click', this.sortUrgent);
            });
            const edit = document.querySelectorAll('.icon-edit');
            edit.forEach(elem => {
                elem.addEventListener('click', taskController.getModal.bind(taskController))
            })
            const deleteBtn = document.querySelector('.delete');
            deleteBtn.addEventListener('click', taskController.renderDeleteList.bind(taskController));
            const done = document.querySelector('.done');
            done.addEventListener('click', taskController.renderDoneList.bind(taskController));
            const  toDo = document.querySelector('.toDo');
            toDo.addEventListener('click', taskController.render.bind(taskController))
        });
    }

    /**
     * show global task list
     * @method
     */
    showGlobalList(event) {
        let target = event.target;
        taskController.renderGloballist();


        const globalList = document.querySelector('.globalList');
        if (!globalList.classList.contains('open')) {
            globalList.classList.add('open');
        } else {
            globalList.classList.remove('open');
        }
    }
    /**
     * show sort tasks list
     * @method
     */
    sortUrgent(event) {
        let target = event.target.textContent;
        const urgencyTabs = document.querySelectorAll('.urgency-tab__link');
        urgencyTabs.forEach(elem =>{
            elem.classList.remove('active-tab');
        });
        event.target.classList.add('active-tab');
        taskController.renderSortUrgent(target);
    }
}
