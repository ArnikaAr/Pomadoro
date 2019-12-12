import {TaskListModel} from "./task_list_model";
import {TaskListController} from "./task_list_controller";
import {TaskListView} from "./task_list_view";


const taskModel =  new TaskListModel();
const taskView = new TaskListView();
const taskController  = new TaskListController(taskModel, taskView);


export {taskController};
