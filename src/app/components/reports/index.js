import {ReportView} from "./report_view";
import {ReportController} from "./report_Controller";
import {ReportModel} from "./report_model";

const reportView = new ReportView();
const reportModel = new ReportModel();
const reportController = new ReportController(reportModel, reportView);

export {reportController}