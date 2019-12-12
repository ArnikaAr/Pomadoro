/**
 * @description function render cycle for settings
 * @param {object} data - object with settings
 */
function renderCycle(data){
    let cycle = document.querySelector('.cycle__item');
    let postCycle = document.querySelector('.post__cycle');
    let preCycle = document.querySelector('.pre__cycle');

    let cycleFragment = document.createDocumentFragment();
    let cycleFragment2 = document.createDocumentFragment();
    let timeMarkBlock = document.createDocumentFragment();
    let cycleMarkBlock = document.createDocumentFragment();


    let workIteration = data.workIteration;

    while (cycle.children.length){
        cycle.removeChild(cycle.lastChild);
    }


    let workLine = [];
    for (let i = 0; i < workIteration; i++){
        workLine.push(data.workTime, data.shortBreak);
    }

    renderTimeMark(workLine);
    renderCycleMark();

    for (let i = 0; i <= workLine.length; i++){
        let div = document.createElement('div');

        if (i % 2 === 0){
            createWorkLine('workTime', data.workTime, div);
        } else if (i % 2 !== 0){
            createWorkLine('shortBreak', data.shortBreak, div);
        }
        if (i === workLine.length - 1){
            createWorkLine('longBreak', data.longBreak, div);
        }


        cycleFragment.appendChild(div);
    }


    /**
     * @description render a workline of cycle
     * @param {string}className
     * @param {number}time
     * @param {object} div
     */
    function createWorkLine(className, time, div){
        div.classList.add(className);
        let widthLine = (workIteration * 2 * time) / workIteration - 1;
        div.style.width = '' + widthLine + '%';
    }

    /**
     * @description function render time Mark on cycle
     */
    function renderTimeMark(){
        // eslint-disable-next-line max-len
        let allTime = ((data.workTime * data.workIteration + data.shortBreak * (data.workIteration - 1) + data.longBreak) * 2) - data.longBreak;
        let colOfMark = (allTime / 30).toFixed(0);
        while (postCycle.children.length){
            postCycle.removeChild(postCycle.lastChild);
        }
        let time = +30;
        for (let i = 0; i < colOfMark - 1; i++){
            let timeMark = document.createElement('div');
            timeMark.classList.add('timeMark');
            timeMark.style.width = '' + cycle.offsetWidth / colOfMark + 'px';
            timeMark.textContent = getTimeFromMins(time);
            time = time + 30;
            timeMarkBlock.append(timeMark);
        }

        postCycle.appendChild(timeMarkBlock);
    }

    /**
     * @description return time in hours
     * @param mins
     * @returns {string}
     */
    function getTimeFromMins(mins){
        if (mins <= 30) return mins + 'm';
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        return hours + 'h ' + minutes + 'm';
    }

    /**
     * function render cycle mark
     */
    function renderCycleMark(){
        // eslint-disable-next-line max-len
        let allTime = ((data.workTime * data.workIteration + data.shortBreak * (data.workIteration - 1) + data.longBreak) * 2) - data.longBreak;
        // eslint-disable-next-line max-len
        let firstCycle = data.workTime * data.workIteration + data.shortBreak * (data.workIteration - 1) + data.longBreak;
        while (preCycle.children.length){
            preCycle.removeChild(preCycle.lastChild);
        }
        for (let i = 0; i < 3; i++){
            let cycleMark = document.createElement('div');
            cycleMark.classList.add('cycleMark');
            if (i === 0){
                cycleMark.textContent = '0 m';
                cycleMark.style.width = '100px';
            } else if (i === 1){
                let cycleTime = getTimeFromMins(firstCycle);
                let width = ((cycle.offsetWidth * firstCycle) / allTime) - 100;
                cycleMark.style.marginLeft = '' + width + 'px';
                cycleMark.style.width = '400px';
                cycleMark.textContent = 'First cycle: ' + cycleTime + '';
            } else {
                cycleTime = getTimeFromMins(allTime);
                cycleMark.style.width = '100%';
                cycleMark.textContent = '' + cycleTime + '';
            }
            cycleMarkBlock.appendChild(cycleMark);
        }
        preCycle.appendChild(cycleMarkBlock);
    }

    cycleFragment2 = cycleFragment.cloneNode(true);
    cycleFragment2.firstChild.remove();
    cycleFragment2.lastChild.remove();
    cycleFragment2.lastChild.remove();
    cycle.appendChild(cycleFragment);
    cycle.appendChild(cycleFragment2);
}


module.exports = renderCycle;
