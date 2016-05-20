import React from 'react';
import ReactHighcharts from 'react-highcharts';
import {render} from 'react-dom';


let title = 'Favorite views';
let subTitle = 'Number of times users looked at analysis favorites';
let colors = ["#CC6600","#CCCC00","#66CC00","#ff0066","#000000","#00CCCC","#9900cc", "#0000FF"];
let count = 0;
let plotOptions = {};


export default React.createClass({

    componentDidUpdate: function () {

        this.drawChart();
    },

    componentDidMount: function () {

        this.drawChart();
    },

    drawChart: function () {
        let chart = this.refs.chart.getChart();
        let data = this.props.data;
        let date = [];

        if (chart.series.length > 0) {
            for (let i = chart.series.length - 1; i > -1; i--) {
                chart.series[i].remove();
            }
        }

        count = 0;
        for(var key in data[1] ){
            if(key == 'Date'){
                data.map(result => {return date.push(result[key])});
                chart.xAxis[0].update({categories: date});
            }
            else{
                chart.addSeries({
                    name: key,
                    data: (data.map((result) => {
                        return result[key];
                    })),
                    color: colors[count],
                    visible: true
                }, false);
                count++;
            }
        }

        if(count == 1){
            plotOptions = {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, colors[5]],
                            [1, colors[0]]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            };
        }

        chart.redraw();
    },

    getConfig: function () {

        return {
            credits: {
                enabled: false
            },
            xAxis: {
                categories: [],
            },
            title: {
                text: title
            },
            subtitle: {
                text: subTitle,
                color:'#88888888'
            },
            yAxis: {min: 0
            },
            plotOptions: plotOptions

        };
    },



    render(){
        if (this.props.category != null) {
            title = this.props.category;
            if(title == 'Favorite views'){
                subTitle = 'Number of times users looked at analysis favorites';
            }
            else if(title == 'Favorite saved'){
                subTitle = 'Number of analysis favorites created by users';
            }
            else if(title == 'Users'){
                subTitle = 'Number of users in the system';
            }
            else if(title == 'Data values'){
                subTitle = 'Number of Data values saved in the system';
            }
        }
        var style = {
            minHeight: 700
        };

        return (
            <div>
                <ReactHighcharts config={this.getConfig()} style={style} ref="chart"/>
            </div>
        );
    }

});


