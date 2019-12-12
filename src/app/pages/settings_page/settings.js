const eventBus = require('../../eventBus');
const renderCycle = require('../../components/your_cycle/your_cycle');
const changeSettings = require('../../components/settings/settings');

import mainSettings from '../../components/settings/settings_template.hbs'

import {pomadoroDatabase} from "../../database";
/**
 * Represents a add settings page
 * @class
 */
export class Setting {
    /**
     * render add settings page
     * @method
     */
    render(parent) {
        pomadoroDatabase.getData("settings")
            .then((data) => {
                let dataSettings = data[0];
                eventBus.subscribe('change-data', function (item) {
                    for (let index in dataSettings) {
                        if (index === item.name) {
                            dataSettings[index] = +item.curItem;
                        }
                    }
                    renderCycle(dataSettings)
                });
                parent.innerHTML = mainSettings(dataSettings);
                const save = document.querySelector('.save');
                save.addEventListener('click', () => this.saveData(dataSettings));
                renderCycle(dataSettings)
            });
    }

    saveData(data) {
        pomadoroDatabase.setSetting(data);
    }
}




