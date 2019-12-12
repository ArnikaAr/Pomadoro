const eventBus = require('../../eventBus');
const main = document.querySelectorAll('.main-item__settings');
const counter = document.querySelectorAll('.settings__counter');


document.addEventListener('click', inputChangeValue);

/**
 * determines the current counter
 * @method
 * @param {string} name - name of counter
 * @param {number} curItem - value of counter
 */
function CounterItem(name, curItem) {
    this.name = name;
    this.curItem = curItem;
}

/**
 * get value of the current counter
 * @method
 * @param {object} item - current counter
 *  @returns {CounterItem}  - object with id and value of counter
 */
function getValue(item) {
    for (let elem of item.children) {
        if (elem.classList.contains('settings__counter-input')) {
            return new CounterItem(elem.id, elem.value);
        }
    }

}

/**
 * change of input value
 * @method
 * @param {event} event - witch button was clicked
 */
function inputChangeValue(event) {
    let target = event.target;
    if (location.hash === '#/setting') {
        if (target.classList.contains('icon-add')) {
            +target.previousElementSibling.value;
            if (target.previousElementSibling.value !== target.previousElementSibling.max) {
                // eslint-disable-next-line max-len
                target.previousElementSibling.value = +target.previousElementSibling.value + +target.previousElementSibling.step;
                const curDataPlus = getValue(target.parentElement);
                eventBus.post('change-data', curDataPlus);

            }
        } else if (target.classList.contains('icon-minus')) {
            if (target.nextElementSibling.value !== target.nextElementSibling.min) {
                // eslint-disable-next-line max-len
                target.nextElementSibling.value = +target.nextElementSibling.value - +target.nextElementSibling.step;
                const curDataMinus = getValue(target.parentElement);
                eventBus.post('change-data', curDataMinus);
            }
        }
    }
}

/**
 * custom settings
 * @method
 * @param {string} name - name of counter
 * @param {number} step - step for counter
 * @param {number} max - max value of counter
 * @param {number} min - min value of counter
 * @param {number} value - current value of counter
 */
function changeSettings(name, step, max, min, value) {
    counter.forEach(function (item) {
        for (let index of item.children) {
            if (index.id === name) {
                const minutes = document.createElement('strong');
                if (value < max) {
                    index.value = value;
                    index.max = max;
                    index.min = min;
                    index.step = step;
                    minutes.textContent = ' MINUTES';
                    // eslint-disable-next-line max-len
                    index.parentElement.parentElement.nextElementSibling.textContent = 'PLEASE SELECT A VALUE BETWEEN ' + min + ' AND ' + max + '';
                    index.parentElement.parentElement.nextElementSibling.append(minutes);
                } else {
                    throw new Error('Not valid value');
                }

            }
        }
    });

}

