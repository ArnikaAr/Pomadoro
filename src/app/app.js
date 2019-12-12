require('assets/less/main.less'); // include general styles
require('../jquery-ui-1.12.1/jquery-ui.min');

require('./router'); // include router

require('element-remove');
import 'array-from-polyfill';
import 'element-closest-polyfill';
import 'nodelist-foreach-polyfill';
import 'date-polyfill';
import 'date-input-polyfill';
require("es6-symbol/implement");

/* example of including header component */
require('./components/header/header_view');
require('./components/your_cycle/your_cycle');
require('./pages/settings_page/settings');
require('./components/settings/settings');

require('./components/strat_task_list/add_your_first_task_view');
require('./database');

require('./components/task_list/index');
require('jquery-ui-bundle');

global.$ = $;

$(function (){
    $(document).tooltip({
        track: true,
        position: {
            my: 'center top+25',
            at: 'bottom'
        }
    });
});
