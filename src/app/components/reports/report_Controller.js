import eventBus from '../../eventBus'
import routItem from "../../router";
import {Report} from "../../pages/reports_page/reports_page";
import renderHighcharts from '../highcharts/highcharts_view';
/**
 * Represents a report Controller.
 * @class
 */
export class ReportController {
    /**
     * construct a report Controller.
     * @constructor
     *  @param {object} reportModel - instance of reportModel
     *  @param {object} reportView - instance of reportView
     */
    constructor(reportModel, reportView) {
        this.reportModel = reportModel;
        this.reportView = reportView;
    }
    /**
     * render a report reports.
     * @method
     *  @param {string} hash - shows for what period and in what format statistics are given
     */
    renderReport(hash) {
        const hashArr = hash.split('/');
        const period = hashArr[2];
        const type = hashArr[3];
        this.reportModel.getDoneTasks();
        eventBus.subscribe('doneTask', done => {
            done.sort(function (a, b) {
                var c = new Date(a.data);
                var d = new Date(b.data);
                return d - c;
            });
            const forPeriod = this.reportModel.filterPeriod(done, period);
            const reportArr = this.reportModel.filterType(forPeriod, type);
            const arrForCharts = this.reportModel.generateSeries(period, reportArr);
            this.reportView.createPage();
            renderHighcharts(arrForCharts, period);
            eventBus.eventCallbackPairs.doneTask = [];
        });

    }
    /**
     * render a report reports page.
     * @method
     */
    renderStatistic() {
        const target = event.target;
        const parent = target.closest('ul');
        const activeTab = parent.querySelector('.active-tab');
        activeTab.classList.remove('active-tab');
        target.classList.add('active-tab');

        const period = document.querySelector('.tab__list .active-tab').textContent.toLowerCase();
        const type = document.querySelector('.graph-info__display-list .active-tab').textContent.toLowerCase();

        const rout = "/reports/" + period + "/" + type + "";

        routItem.addRoute(rout, new Report());
        location.hash = rout;
    }

    /**
     * shows for what period and in what format statistics are given as a tabs on a page
     * @method*/

    addActiveTab() {
        let locationHash = window.location.hash;
        if (locationHash.indexOf('week') !== -1) {
            document.querySelector('.tab__link.week').classList.add('active-tab');
        }
        if (locationHash.indexOf('day') !== -1) {
            document.querySelector('.tab__link.day').classList.add('active-tab');
        }
        if (locationHash.indexOf('month') !== -1) {
            document.querySelector('.tab__link.month').classList.add('active-tab');
        }
        if (locationHash.indexOf('tasks') !== -1) {
            document.querySelector('.graph-info__display-link.tasks').classList.add('active-tab');
        }
        if (locationHash.indexOf('pomodoros') !== -1) {
            document.querySelector('.graph-info__display-link.pomodoros').classList.add('active-tab');
        }
    }
}
