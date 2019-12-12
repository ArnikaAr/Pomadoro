import modal from './handlebars/TaskModal.hbs'

/**
 * Represents a Task list view
 * @class
 */
export class TaskListView {
    /**
     * function render daily list
     * @method
     * @param {array} daily - daily tasks for render
     * @param {template} template - template for daily tasks
     * @returns {template}  - template with daily list
     * */
    renderList(daily, template) {
        return template({
            daily: daily
        });
    }

    /**
     * function render delete list
     * @method
     * @param {array} deleted - deleted tasks for render
     * @param {template} template - template for deleted tasks
     * @returns {template}  - template with deleted tasks list
     */
    renderDeleteList(deleted, template) {
        return template({
            delete: deleted
        });
    }

    /**
     * function render done list
     * @method
     * @param {array} done - done tasks for render
     * @param {template} template - template for done tasks
     * @returns {template}  - template with done tasks list
     */
    renderDoneList(done, template) {
        return template({
            done: done
        });
    }

    /**
     * function for render number of tasks to delete
     * @method
     */
    renderNumber() {
        const toDelet = document.querySelectorAll('.remove');
        const trash = document.querySelector('.number');
        if (toDelet.length >= 1) {
            while (trash.childNodes.length) {
                trash.lastChild.remove();
            }
            trash.style.display = 'block';
            trash.append(toDelet.length)
        } else if (toDelet.length === 0) {
            trash.style.display = 'none';
            trash.lastChild.remove();
        }
    }

    /**
     * function for render global list
     * @method
     * @param {array} work - work tasks for render
     * @param {array} edu - edu tasks for render
     * @param {array} other - other tasks for render
     * @param {array} sport - sport tasks for render
     * @param {array} hobby - hobby tasks for render
     * @param {template} template - template for tasks for global list
     * @returns {template}  - template with global tasks list
     */
    renderGlobalList(work, edu, other, sport, hobby, template) {
        return template({
            work: work,
            edu: edu,
            other: other,
            sport: sport,
            hobby: hobby
        });
    }

    /**
     * function render sort list
     * @method
     * @param {array} sort - sort tasks for render
     * @param {template} template - template for done tasks
        * @returns {template}  - template with sorts tasks list
     */
    renderSortList(sort, template) {
        return template({
            sort: sort
        });
    }

    /**
     * function render daily list task
     * @method
     * @param {object} obj - task for render
     * @param {template} template - template for daily tasks
     * @returns {template}  - template with deleted daily list

     */
    renderDailyList(obj, template) {
        return template(obj);
    }

    /**
     * function render modal window
     * @method
     * @param {string} type - type of modal window
     * @param {string} id - id of current tasks
     */
    renderModal(type, id) {
        const modalParent = document.querySelector('.modal')
        let modalTemplate;
        if (type === 'add') {
            modalTemplate = modal({
                add: true
            });
        } else if (type === 'edit') {
            modalTemplate = modal({
                edit: true,
                id: id
            });
        } else if (type === 'remove') {
            modalTemplate = modal({
                remove: true
            });
        }
        modalParent.innerHTML = modalTemplate;
        const modalDiv = document.querySelector('.task__modal');
        modalDiv.style.display = 'block';
        this.createDatepicker();
    }

    /**
     * function for create datepicker
     * @method
     */
    createDatepicker() {
        const input = $('.deadline__input');
        input.datepicker({
            minDate: new Date()
        });

        input.datepicker('setDate', new Date(input.val()));
    }

    /**
     * function for get data for a new task
     * @method
     * @returns {template}  - template with deleted task
     */
    getTaskData() {
        let titleValue = document.querySelector('.title__input').value;
        let descriptionValue = document.querySelector('.description__value').value;
        let categoryValue = document.querySelector('input[name="radio-category"]:checked').value;
        let date = new Date(document.querySelector('.deadline__input').value);
        let modelDate = date.toLocaleDateString().split('/').reverse();
        let temp = modelDate[1];
        modelDate[1] = modelDate [2];
        modelDate[2] = temp;
        let estimationValue = document.querySelector('input[name="rating"]:checked').value;
        let priorityValue = document.querySelector('input[name="radio-priority"]:checked').value;
        if (titleValue.length !== 0 || descriptionValue.length !== 0) {
            const task = {
                title: titleValue,
                description: descriptionValue,
                category: categoryValue,
                estimation: estimationValue,
                priority: priorityValue,
                date: modelDate.join('-')
            };
            document.querySelector('.title__input').value = '';
            document.querySelector('.description__value').value = '';
            document.querySelector('.deadline__input').value = '';
            return task;
        }
    }

    /**
     * function for get template of list of deleted tasks
     * @method
     * @returns {object}  - array with tasks for deleted

     */
    getDeletedList() {
        const toDeleted = document.querySelectorAll('.remove');
        return toDeleted;
    }
}
