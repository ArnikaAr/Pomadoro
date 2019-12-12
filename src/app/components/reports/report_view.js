import report from "./handlebars/reports_template.hbs";
import eventBus from '../../eventBus'
/**
 * Represents a report view.
 * @class
 */
export class ReportView {
    /**
     * generate a report page and post event render Report.
     * @method
     */
    createPage() {
        const header = document.querySelector('header');
        if(!header) {
            header.style.display = 'block';
        }
        eventBus.post('renderedReport', report());
    }
}