import timerTemplate from "./handlebars/timer.hbs";
import btn from './handlebars/btn.hbs'
import timer from './handlebars/timer_content.hbs'
import {pomadoroDatabase} from "../../database";
import {timerController} from "./index";

const eventBus = require('../../eventBus');
require('../radialTimer/radialTimer');
/**
 * Represents a timer Model.
 * @class
 */
export class TimerView {
    /**
     * function return template for timer page
     * @method
     * @param {object} context - context for timer page
     * @returns {template}  - template with timer
     */
    createPage(context) {
        return timerTemplate(context);
    }
    /**
     * function for hide arrow on timer page
     * @method
     */
    hideArrow() {
        const arrowRight = document.querySelector('.timer-arrow__right ');
        const arrowLeft = document.querySelector('.timer-arrow__left ');
        arrowLeft.classList.add('none');
        arrowRight.classList.add('none');
    }
    /**
     * function for show arrow on timer page
     * @method
     */
    showArrow() {
        const arrowRight = document.querySelector('.timer-arrow__right ');
        const arrowLeft = document.querySelector('.timer-arrow__left ');
        arrowLeft.classList.remove('none');
        arrowRight.classList.remove('none');
    }
    /**
     * function for render content inside of timer according to period of timer
     * @method
     * @param {string} type - period of timer
     * @param {string} time - period for  timer
     */
    renderProcessContent(type, time) {
        const btnArray = document.querySelectorAll('.timerBtn');
        const content = document.querySelector('.timer__content');
        const mask = document.querySelector('.mask');
        let timerObj = {};
        if (type === 'Start' || type === 'Start Pomodora') {
            let content = timer({
                work: true,
                n: time.workTime
            });
            timerObj.content = content;
            timerObj.time = time.workTime;
            timerObj.renderInterval = 1;
            timerObj.onTimeout = () => {
                const emptyTomato = document.querySelectorAll('.emptyTomato');
                if (emptyTomato.length > 1) {
                    this.renderProcessContent('Finish Pomodora', time);
                    this.renderProcess('Finish Pomodora');
                    Array.from(btnArray).forEach(elem => {
                        elem.addEventListener('click', (event) => {
                            let type = event.target.textContent;
                            console.log(type);
                            this.renderProcessContent(type, time);
                            this.renderProcess(type);
                        });
                    });
                } else {
                    this.renderProcessContent('Finish Task', time);
                    this.renderProcess('Finish Task');
                    Array.from(btnArray).forEach(elem => {
                        elem.addEventListener('click', (event) => {
                            let type = event.target.textContent;
                            this.renderProcessContent(type, time);
                            this.renderProcess(type);
                        });
                    });
                }
            };
            $().radialTimer(timerObj)
        } else if (type === 'Finish Pomodora') {
            timerObj.content = timer({
                break: true,
                n: time.shortBreak
            });
            timerObj.time = time.shortBreak;
            timerObj.renderInterval = 1;
            timerObj.onTimeout = () => {
                this.renderProcessContent('breakOver');
                Array.from(btnArray).forEach(elem => {
                    console.log(time)
                    elem.addEventListener('click', (event) => {
                        let type = event.target.textContent;
                        this.renderProcessContent(type, time);
                        this.renderProcess(type);
                    });
                });
            };
            $().radialTimer(timerObj);
        } else if (type === 'Fail Pomodora') {
            let content = timer({
                break: true,
                n: time.shortBreak
            });
            timerObj.content = content;
            timerObj.time = time.shortBreak;
            timerObj.renderInterval = 1;
            timerObj.onTimeout = () => {
                this.renderProcessContent('breakOver');
            };
            $().radialTimer(timerObj);
        } else if (type === 'Finish Task') {
            this.finishTask(content);
            let content  = timer({
                completed: true
            });
            timerObj.content = content;
            timerObj.time = 0;
            timerObj.renderInterval = 0;
            timerObj.onTimeout = () => {
            };
            $().radialTimer(timerObj);
        } else if (type === 'breakOver') {
            mask.style.zIndex = 0;
            Array.from(btnArray).forEach(elem => {
                elem.addEventListener('click', (event) => {
                    let type = event.target.textContent;
                    this.renderProcessContent(type, time);
                    this.renderProcess(type);
                });
            });
            let content = timer({
                breakOver: true
            });
            timerObj.content = content;
            timerObj.time = 0;
            timerObj.renderInterval = 0;
            timerObj.onTimeout = () => {
            };
            $().radialTimer(timerObj);
        }
    }
    /**
     * function for render button of timer according to period of timer
     * @method
     * @param {string} type - period of timer
     */
    renderProcess(type) {
        const btnParent = document.querySelector('.timer-time__btn');
        const content = document.querySelector('.timer__content');

        if (type === 'Start' || type === 'Start Pomodora') {
            btnParent.innerHTML = btn({
                process: true
            })
        } else if (type === 'Fail Pomodora') {
            const emptyTomato = document.querySelectorAll('.emptyTomato');
            if (emptyTomato.length < 1) {
                this.finishTask(content);
            } else {
                this.faildPomadoro();
                btnParent.innerHTML = btn({
                    breakFail: true
                })
            }
        } else if (type === 'Finish Pomodora') {
            const emptyTomato = document.querySelectorAll('.emptyTomato');
            if (emptyTomato.length === 1) {
                this.finishPomadoro();
                this.finishTask(content);
            } else {
                this.finishPomadoro();
                btnParent.innerHTML = btn({
                    breakFinish: true
                })
            }
        } else if (type === 'Finish Task') {
            this.finishTask(content)
        }
    }
    /**
     * function for failed 1 period of timer
     * @method
     */
    faildPomadoro() {
        const emptyTomato = document.querySelector('.emptyTomato');
        emptyTomato.src = '../images/tomato-failed.svg';
        emptyTomato.classList.remove('emptyTomato');
        emptyTomato.classList.add('faildTomato')
        emptyTomato.classList.add('done')
    }
    /**
     * function for finish 1 period of timer
     * @method
     */
    finishPomadoro() {
        const emptyTomato = document.querySelector('.emptyTomato');
        emptyTomato.src = '../images/fill-tomato.svg';
        emptyTomato.classList.remove('emptyTomato');
        emptyTomato.classList.add('finishTomato')
        emptyTomato.classList.add('done')
    }
    /**
     * function for finish current task
     * @method
     */
    finishTask() {
        const btnParent = document.querySelector('.timer-time__btn');
        const id = document.querySelector('.timer').id;
        const tomatos = document.querySelectorAll('.tomatos img');
        const fail = document.querySelectorAll('.faildTomato');
        const finish = document.querySelectorAll('.finishTomato');
        const completeDate = new Date;
        let faild;
        if (finish.length > fail.length) {
            faild = false
        } else {
            faild = true
        }
        pomadoroDatabase.setDoneTask(id, tomatos.length, fail.length, finish.length, faild, completeDate);
        this.showArrow();
        const plus = document.querySelector('.icon-add');
        plus.style.display = 'none';
        btnParent.innerHTML = ' ';
    }
}
