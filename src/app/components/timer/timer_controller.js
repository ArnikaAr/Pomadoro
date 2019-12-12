import {pomadoroDatabase} from '../../database';
import {timerController} from "./index";

require('../radialTimer/radialTimer')
const eventBus = require('../../eventBus');

/**
 * Represents a timer controller
 * @class
 */
export class TimerController {
    /**
     * construct a Task list controller.
     * @constructor
     *  @param {object} TimerModel - instance of TimerModel
     *  @param {object} TimerView - instance of TimerView
     */
    constructor(TimerModel, TimerView) {
        this.TimerModel = TimerModel;
        this.TimerView = TimerView;
    }
    /**
     * render a timer
     * @method
     */
    renderTimer() {
        const content = document.querySelector('.timer__content');
        this.TimerModel.getActiveTask();
        eventBus.subscribe('activeTask', task => {
            const rendered = this.TimerView.createPage(task[0]);
            eventBus.post('timerPage', rendered);
            const timer = document.querySelector('.timer');
            timer.id = task[0].id;
            this.borderColor(task[0].category);
        })
    }
    /**
     * draws a circle around the timer with a color that matches the color of the category
     * @method
     * @param {string} category - show color for circle around timer
     */
    borderColor(category) {
        const border = document.querySelector('.timer-time__item');
        border.classList.add('timer-'+ category);
    }
    /**
     * change task status< when user returns to task list for nonactive
     * @method
     */
    returnToTaskList() {
        this.TimerModel.getActiveTaskId();
        eventBus.subscribe('activeTaskID', id => {
            pomadoroDatabase.changeTaskStatusToActive(id, 'nonactive')
        })
    }
    /**
     * start task timer  and add event listeners for button on page, removes the header from the pages
     * @method
     */
    startTask() {
        const type = event.target.textContent;
        const header = document.querySelector('header');
        const content = document.querySelector('#content');
        header.style.display = 'none';
        content.style.marginTop = '100px';
        if (!document.querySelector('.tip').classList.contains('none')) {
            this.TimerView.hideArrow();
        }
        timerController.TimerModel.getSettingsWork();
        timerController.TimerView.renderProcess(type);
        eventBus.subscribe('settingsWork', data => {
            timerController.TimerView.renderProcessContent(type, data[0]);
        });
        const btnArray = document.querySelectorAll('.timerBtn');
        Array.from(btnArray).forEach(elem => {
            elem.addEventListener('click', timerController.continueTask.bind(timerController));
        });
        const plusTomato = document.querySelector('.icon-add');
        plusTomato.addEventListener('click', timerController.addTomato.bind(timerController));
    }
    /**
     * continue task timer  and add event listeners for button on page
     * @method
     */
    continueTask() {
        const type = event.target.textContent;
        this.TimerView.renderProcess(type);
        const emptyTomato = document.querySelectorAll('.emptyTomato');
        if (emptyTomato.length > 0) {
            this.TimerModel.getSettingsBreak();
            eventBus.subscribe('settingsBeak', data => {
                const done = document.querySelectorAll('.done');
                if (type === 'Finish Pomodora' || type === 'Fail Pomodora') {
                    if (done.length % data[0].workIteration === 0) {
                        this.TimerView.renderProcessContent(type, data[0]);
                    } else {
                        this.TimerView.renderProcessContent(type, data[0]);
                    }
                } else if (type === 'Finish Task') {
                    this.TimerView.renderProcessContent(type);
                }
            });
            const btnArray = document.querySelectorAll('.timerBtn');
            Array.from(btnArray).forEach(elem => {
                elem.addEventListener('click', timerController.startTask.bind(timerController));
            });
        } else {
            const header = document.querySelector('header');
            const content = document.querySelector('#content');
            header.style.display = 'block';
            content.style.marginTop = '0px';
        }
    }
    /**
     * add tomato if user click on button "Add tomato"
     * @method
     */
    addTomato() {
        const tomatosParent = document.querySelector('.tomatos');
        const tomatos = document.querySelectorAll('.tomatos img');
        const tomato = document.createElement('img');
        tomato.src = "../images/empty-tomato.svg";
        tomato.classList.add('emptyTomato');
        if (tomatos.length < 10) {
            tomatosParent.append(tomato)
        }
    }
}

