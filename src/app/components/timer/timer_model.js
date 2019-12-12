import {pomadoroDatabase} from "../../database";

const eventBus = require('../../eventBus');
/**
 * Represents a timer Model.
 * @class
 */
export class TimerModel {
    /**
     * get active task id from database
     * @method
     */
    getActiveTaskId() {
        pomadoroDatabase.getData('tasks')
            .then((data) => {
                let activeTask = data.filter(item => {
                    return item.status === 'active';
                });
                eventBus.post('activeTaskID', activeTask[0].id);
            })
    }
    /**
     * get active task from database
     * @method
     */
    getActiveTask() {
        pomadoroDatabase.getData('tasks')
            .then((data) => {
                let activeTask = data.filter(item => {
                    return item.status === 'active';
                });
                eventBus.post('activeTask', activeTask);
            })
    }
    /**
     * get settings work from database
     * @method
     */
    getSettingsWork() {
        pomadoroDatabase.getData('settings')
            .then((data) => {
                eventBus.post('settingsWork',data);
            })
    }
    /**
     * get settings break from database
     * @method
     */
    getSettingsBreak() {
        pomadoroDatabase.getData('settings')
            .then((data) => {
                eventBus.post('settingsBeak',data);
            })
    }
}