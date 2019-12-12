import {reportController} from "../../components/reports";
import eventBus from '../../eventBus'
/**
 * Represents a add report page
 * @class
 */
export class Report {
    /**
     * render add report page
     * @method
     */
    render(parent) {
        const rout =  location.hash;
        reportController.renderReport(rout);
        eventBus.subscribe('renderedReport', rendered => {
            parent.innerHTML = rendered;
            const tab__link = document.querySelectorAll('.tab__link ');
            const info__link = document.querySelectorAll('.graph-info__display-link ');
            Array.from(tab__link).forEach(item => {
                item.addEventListener('click', reportController.renderStatistic.bind(reportController));
            });
            Array.from(info__link).forEach(item => {
                item.addEventListener('click', reportController.renderStatistic.bind(reportController))
            });
            reportController.addActiveTab();
        });
    }
}
