var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
/**
 * Render report in view of Highchair's.
 * @function
 *  @param {array} series - statistic for highchair's.
 *  @param {string} period - shows for which period statistics are given
 */
 function renderHighcharts(series, period) {
    let categories;
    if (period === 'day') {
        categories = ['urgent', ' high', 'middle', 'low', 'faild'];
    } else if (period === 'week') {
        categories = [];
        for (let i = 0; i < 7; i++) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            date = date.toString().slice(0, 3);
            categories.push(date);
        }
        categories.reverse();

    } else if (period === 'month') {
        categories = [];
        for (let i = 1; i < 31; i++) {
            categories.push(i);
        }
    }
    Highcharts.chart('graph-info', {
        chart: {
            type: 'column',
            backgroundColor: '#2A3F50'
        },

        title: {
            text: '',
            style: {
                color: "#fff"
            }
        },

        xAxis: {
            categories: categories,
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            endOnTick: false,
            labels: {
                style: {
                    color: '#fff'
                }
            },
            title: {
                text: ''
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' + 'Total: ' + this.y;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: series,
        exporting: {
            enabled: false
        },
        legend: {
            symbolHeight: 15,
            symbolWidth: 15,
            symbolRadius: 0,
            itemStyle: {
                font: 'normal 300 0.875rem "Roboto Light"',
                color: "#fff",
            }
        },
    });

}
export default renderHighcharts;
