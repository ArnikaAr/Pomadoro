import {addFirstTaskPage} from './pages/addfirstTask_page/addFirstTask_page'
import {FirstPage} from './pages/first_page/first_page'
import {Setting} from './pages/settings_page/settings'
import {Report} from "./pages/reports_page/reports_page";
import {TaskListPage} from "./pages/tasks-list/index";
import {HeaderView} from "./components/header/header_view";
import {SettingsCategory} from "./components/settings_category/setting_category_view";
import {TimerPage} from "./pages/timer_page/timerPage";

let routes = {
    '/addfirsttask': new addFirstTaskPage(),
    '/setting': new Setting(),
    '/report/month/pomodoros': new Report(),
    '/tasklist': new TaskListPage(),
    '/settingscategory': new SettingsCategory(),
    '/firstpage': new FirstPage(),
    '/timer': new TimerPage()
};
let defoulRout = '/tasklist';

class Router {
    rout() {
        const content = null || document.getElementById('content');

        let url = location.hash.slice(1).toLowerCase() || '/';
        let locationNoneExist = true;
        for (let i in routes) {
            if (url === i) {
                let tooltips = document.querySelectorAll('.ui-tooltip');
                if (tooltips) {
                    Array.prototype.slice.call(tooltips).forEach(item => item.remove());
                }
                const head = new HeaderView(i);
                head.render();
                document.addEventListener('scroll', head.stickyHeader);
                routes[i].render(content);
                locationNoneExist = false;
            }
        }
        if(locationNoneExist && location.hash !== '/tasklist'){
            location.hash = defoulRout;
        }
    }

    defaultRout() {
        if (sessionStorage.getItem('firstEntry') === null) {
            sessionStorage.setItem('firstEntry', true);
            location.hash = '/firstpage';
        }
    }

    addRoute(name, route) {
        routes[name] = route;
    }
}

const routItem = new Router();
export default routItem;
// Listen on page load:
window.addEventListener('load', routItem.rout);
window.addEventListener('load', routItem.defaultRout);

// Listen on hash change:
window.addEventListener('hashchange', routItem.rout);
