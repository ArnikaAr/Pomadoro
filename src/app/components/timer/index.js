import {TimerView} from "./timer_view";
import {TimerController} from "./timer_controller";
import {TimerModel} from "./timer_model";


const timerView = new TimerView();
const timerModel = new TimerModel()
const timerController = new TimerController(timerModel, timerView)

export {timerController}