import taskTemplate from './handlebars/task_template.hbs';
import taskListTemplate from './handlebars/taskList_template.hbs'
import taskListItem from './handlebars/taskListItem.hbs'
import noTasks from './handlebars/noTasks.hbs'
import deleteList from './handlebars/deleteList_template.hbs'
import doneListTemplate from './handlebars/doneList_template.hbs'

const eventBus = require('../../eventBus');
import {pomadoroDatabase} from '../../database'
import {taskController} from "./index";
/**
 * Represents a Task list controller
 * @class
 */
class TaskListController {
    /**
     * construct a Task list controller.
     * @constructor
     *  @param {object} taskListModel - instance of taskListModel
     *  @param {object} taskListView - instance of taskListView
     */
    constructor(taskListModel, taskListView) {
        this.taskListModel = taskListModel;
        this.taskListView = taskListView;
    }
    /**
     * render a daily task list.
     * @method
     */
    render() {
        this.taskListModel.getList();
        eventBus.subscribe('tasksData', data => {
            let daily = this.taskListModel.sortDaily(data);
            if (data.length === 0) {
                let rendered = noTasks({});
                eventBus.post('renderedTaskList', rendered);
            } else if (daily.length === 0) {
                let rendered = this.taskListView.renderList(daily, taskListTemplate);
                eventBus.post('renderedTaskList', rendered);
                let title = document.querySelector('.task-added__title');
                title.classList.remove('none');
            } else {
                let rendered = this.taskListView.renderList(daily, taskListTemplate);
                eventBus.post('renderedTaskList', rendered);
            }
            const toTimer = document.querySelectorAll('.task-list_item-urgency a');
            for (let i = 0; i < toTimer.length; i++) {
                toTimer[i].addEventListener('click', this.changeStatus.bind(this));
            }
            const toDo = document.querySelector('.toDo');
            const done = document.querySelector('.done');
            toDo.firstChild.classList.add('active-tab');
            done.firstChild.classList.remove('active-tab');
        });
    }
    /**
     * change status of task for active
     * @method
     */
    changeStatus() {
        const target = event.target;
        let id = target.closest('.taskItem').id;
        pomadoroDatabase.changeTaskStatusToActive(id, "active");
    }
    /**
     * move global task to daily list
     * @method
     *  @param {event} event - show task to go for a daly list
     */
    toDaily(event) {
        let target = event.target;
        const id = target.closest('.taskItem').id;
        const dailyList = document.querySelector('.dailyList');
        this.taskListModel.getDailyList();
        let checkArr = [];
        eventBus.subscribe('dailyData', data => {
            data.forEach(item => {
                if (item.id === id) {
                    dailyList.insertAdjacentHTML("afterBegin", this.taskListView.renderDailyList(item, taskTemplate));
                    let addTask = document.querySelector('.main__title');
                    addTask.style.display = 'none';
                }
            });
        });
        pomadoroDatabase.setCurrentStatus(id);
        taskController.renderGloballist();
    }
    /**
     * render list with tasks for delete
     * @method
     */
    renderDeleteList() {
        if (event.target.classList.contains('deleteMode')) {
            const toDeleted = this.taskListView.getDeletedList();
            if (toDeleted.length < 1) {
                event.target.classList.remove('deleteMode');
                const allTasks = document.querySelectorAll('.task-list__item ');
                Array.from(allTasks).forEach(elem => {
                    elem.classList.remove('deleted-task')
                });
            } else {
                this.getModal(event);
                const removeBtn = document.querySelector('.modal__button-remove');
                removeBtn.addEventListener('click', this.removeTasks.bind(this))
            }
        } else {
            event.target.classList.add('deleteMode');
            const allTasks = document.querySelectorAll('.task-list__item ');
            Array.from(allTasks).forEach(elem => {
                elem.classList.add('deleted-task')
            });
            const toCart = document.querySelectorAll('.task-list__item-date');
            toCart.forEach(elem => {
                elem.addEventListener('click', this.addTaskToCart.bind(this))
            });

            const tabs = document.querySelector('.navDel');
            tabs.style.visibility = 'visible';
            const selectAll = document.querySelector('.select');
            console.log(selectAll)
            selectAll.addEventListener('click', this.selectAll.bind(this));
            const deseectAll = document.querySelector('.deselect');
            deseectAll.addEventListener('click', this.deselectAll.bind(this));

            const edit = document.querySelectorAll('.icon-edit');
            edit.forEach(elem => {
                elem.addEventListener('click', this.getModal.bind(this))
            });
        }
    }
    /**
     * function for select all tasks for delete
     * @method
     */
    selectAll() {
        const tasksList = document.querySelectorAll('.task-list__item-date');
        console.log(tasksList)
        Array.from(tasksList).forEach(elem => {
            elem.classList.remove('task-list__item-date');
            elem.classList.add('remove');
            this.taskListView.renderNumber();
        })
    }
    /**
     * function for deselect all tasks for delete
     * @method
     */
    deselectAll() {
        const tasksList = document.querySelectorAll('.remove');
        Array.from(tasksList).forEach(elem => {
            elem.classList.add('task-list__item-date');
            elem.classList.remove('remove');
            this.taskListView.renderNumber();
        })
    }
    /**
     * function for deleted selected tasks
     * @method
     */
    removeTasks() {
        const taskToRemove = document.querySelectorAll('.task-list__item-date');
        let removeArr = [];
        taskToRemove.forEach(item => {
            removeArr.push(item.parentElement.parentElement.id);
        });
        this.taskListModel.removeTasks(removeArr);
        this.closeModal();
        const numberOfdeleted = document.querySelector('.number');
        numberOfdeleted.textContent = '';
        this.render();
    }
    /**
     * function for select tasks for delete
     * @method
     */
    addTaskToCart() {
        let target = event.target;
        if (target.classList.contains('task-list__item-date')) {
            target.classList.add('remove');
            target.classList.remove('task-list__item-date');
            this.taskListView.renderNumber();
        } else {
            target.classList.add('task-list__item-date');
            target.classList.remove('remove');
            this.taskListView.renderNumber();
        }
    }
    /**
     * function for render global tasks list
     * @method
     */
    renderGloballist() {
        this.taskListModel.getGlobalList();
        const globalList = document.querySelector('.globalList');
        const dailyTasks = document.querySelectorAll('.dailyList > li');
        eventBus.subscribe('globalData', data => {
            let edu = this.taskListModel.sortCategory(data, "category__education");
            let work = this.taskListModel.sortCategory(data, "category__work");
            let hobby = this.taskListModel.sortCategory(data, "category__hobby");
            let other = this.taskListModel.sortCategory(data, "category__other");
            let sport = this.taskListModel.sortCategory(data, "category__sport");
            let rendered = this.taskListView.renderGlobalList(work, edu, other, sport, hobby, taskListItem);
            globalList.innerHTML = rendered;
            const toDailyList = document.querySelectorAll('.toDaily');
            const edit = document.querySelectorAll('.icon-edit');
            if(dailyTasks.length < 5) {
                toDailyList.forEach(item => {
                    item.addEventListener('click', this.toDaily.bind(this))
                });
            }
            edit.forEach(elem => {
                elem.addEventListener('click', this.getModal.bind(this))
            })
        });
    }
    /**
     * function for render tasks list filtered for urgent
     * @method
     * @param {string} type - show type urgent for filter
     */
    renderSortUrgent(type) {
        this.taskListModel.getSortList();
        eventBus.subscribe('sortUrgent', data => {
            const globalList = document.querySelector('.globalList');
            const urgentArr = this.taskListModel.sortUrgency(data, type);
            let rendered = this.taskListView.renderSortList(urgentArr, taskListItem);
            globalList.classList.add('open');
            globalList.innerHTML = rendered;
            eventBus.eventCallbackPairs.sortUrgent = [];
             eventBus.eventCallbackPairs.tasksData = [];
        })
    }
    /**
     * function for save task data
     * @method
     */
    saveDataEvent() {
        const taskObj = this.taskListView.getTaskData();
        pomadoroDatabase.setTask(taskObj);
        if (document.querySelector('.first-page__main')) {
            this.render()
        }
        if (document.querySelector('.globalList')) {
            this.renderGloballist();
        }
        this.closeModal();
    }
    /**
     * function for close modal window
     * @method
     */
    closeModal() {
        const modalDiv = document.querySelector('.task__modal')
        modalDiv.style.display = 'none';
    }
    /**
     * function for render modal window
     * @method
     * @param {event} event - show type of modal window
     */
    getModal(event) {
        let target = event.target;
        if (target.classList.contains('icon-add') || (target.classList.contains('openModal'))){
            this.taskListView.renderModal('add');
            let add = document.querySelector('.icon-check');
            add.addEventListener('click', this.saveDataEvent.bind(this));
        } else if (target.classList.contains('icon-edit')) {
            let id = target.closest('li').id;
            this.taskListView.renderModal('edit', id);
            let add = document.querySelector('.icon-check');
            add.addEventListener('click', this.editTask.bind(this));
            const removeBtn = document.querySelector('.icon-trash');
            removeBtn.addEventListener('click', this.removeTasks.bind(this))
        } else if (target.classList.contains('icon-trash')) {
            this.taskListView.renderModal('remove');
        }
        const close = document.querySelectorAll('.close');
        for (let i = 0; i < close.length; i++) {
            close[i].addEventListener('click', this.closeModal);
        }
    }
    /**
     * function for edit task
     * @method
     */
    editTask() {
        const target = event.target;
        const taskObj = this.taskListView.getTaskData();
        const id = target.id;
        pomadoroDatabase.editTask(taskObj, id);
        this.closeModal();
    }
    /**
     * function for render list with done tasks
     * @method
     */
    renderDoneList() {
        const toDo = document.querySelector('.toDo');
        const done = document.querySelector('.done');
        toDo.firstChild.classList.remove('active-tab');
        done.firstChild.classList.add('active-tab');
        this.taskListModel.getDoneTasks();
        const dailyCont = document.querySelector('.dailyList');
        eventBus.subscribe('doneTasks', doneData => {
            const doneList = this.taskListView.renderDoneList(doneData, doneListTemplate);
            dailyCont.innerHTML = doneList;
            if (document.querySelector('.addTask')) {
                document.querySelector('.addTask').style.display = "none";
            }

        })
    }

}
export {TaskListController}
