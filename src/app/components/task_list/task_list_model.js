import { pomadoroDatabase } from '../../database'
import taskListTemplate from "./handlebars/taskList_template.hbs";

const eventBus = require('../../eventBus');

/**
 * Represents a TaskList Model.
 * @class
 */
export class TaskListModel {
    /**
     * get list of tasks
     * @method
     */
    getList() {
        pomadoroDatabase.getData('tasks')
            .then((data) => {
                eventBus.post('tasksData', data)
            })
    }
    /**
     * get list of global tasks
     * @method
     */
    getGlobalList() {
        pomadoroDatabase.getData('tasks')
            .then((data) => {
                eventBus.post('globalData', data)
            })
    }
    /**
     * get list of daily tasks
     * @method
     */
    getDailyList() {
        pomadoroDatabase.getData('tasks')
            .then((data) => {
                eventBus.post('dailyData', data)
            })
    }
    /**
     * get list of tasks for sorts
     * @method
     */
    getSortList() {
        pomadoroDatabase.getData('tasks')
            .then((data) => {
                eventBus.post('sortUrgent', data)
            })
    }
    /**
     * get list of done tasks
     * @method
     */
    getDoneTasks(){
        pomadoroDatabase.getData('tasks')
            .then((data) => {
               const doneData = data.filter(elem => {
                    if(elem.done === true){
                       return elem
                    }
                });
                 eventBus.post('doneTasks', doneData)
            })
    }
    /**
     * sort list of tasks for category
     * @method
     * @param {array} data - tasks for sort
     * @param {string} type - type for sort
     */
    sortCategory(data, type) {
        let arrCategory = [];
        data.forEach(item => {
            if (item.category === type && item.listStatus === "global") {
                arrCategory.push(item)
            }
        });
        return arrCategory
    }
    /**
     * sort list of tasks for daily tasks
     * @method
     * @param {array} data - tasks for sort
     *  @returns {arrCategory}  - object with array with done tasks
     */
    sortDaily(data) {
        let arrCategory = [];
        data.forEach(item => {
            if (item.done === false && item.listStatus === "daily") {
                arrCategory.push(item)
            }
        });
        return arrCategory
    }

    /**
     * sort list of tasks for Urgency
     * @param {array} data - tasks for sort
     * @param {string} targetPriority - type for sort
     * @returns {arrUrgency}  - object with array with sorta tasks by urgency
     */
    sortUrgency(data, targetPriority) {
        let arrUrgency = [];
        data.forEach(item => {
            if (item.priority.toLowerCase() === targetPriority && item.listStatus === "global") {
                arrUrgency.push(item);
            } else if (targetPriority === "all" && item.listStatus === 'global') {
                arrUrgency.push(item)
            }
        });
        return arrUrgency;
    }
    /**
     * remove tasks from database
     * @method
     */
    removeTasks(arr) {
        arr.forEach(elem => {
            pomadoroDatabase.remove(elem);
        })
    }

}
