import {timerController} from '../../components/timer/index'

const eventBus = require('../../eventBus');

/**
 * Represents a timer page
 * @class
 */
export class TimerPage {
    /**
     * render timer page
     * @method
     */
    render(parent) {
        timerController.renderTimer();
        eventBus.subscribe('timerPage', rendered => {
            parent.innerHTML = rendered;
            const toTaskList = document.querySelector('.timer-arrow__left');
            toTaskList.addEventListener('click', timerController.returnToTaskList.bind(timerController));
            const start = document.querySelector('.timerBtn');
            start.addEventListener('click', timerController.startTask.bind(timerController));
        });
    }
}
