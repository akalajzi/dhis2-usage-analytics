import React from 'react';
import log from 'loglevel';

import HeaderBar from 'd2-ui/lib/header-bar/HeaderBar.component';
import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';

import ReactHighcharts from 'react-highcharts';
import Client from './Client.js';
import Chart from './Chart.js';


export default React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        d2: React.PropTypes.object,
    },

    childContextTypes: {
        d2: React.PropTypes.object,
    },

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    },

    _sidebarItemClicked(sideBarItemKey) {
        console.log('Clicked on ', sideBarItemKey);

    },

    render()
    {
        const sideBarSections = [
            {key: 'Chart', label: 'Chart', pressed: false},
            {key: 'Table', label: 'Table', pressed: false},
        ];
        
        return (
            <div className="app-wrapper">
                <HeaderBar />
                <Sidebar
                    sections={sideBarSections}
                    onChangeSection={this._sidebarItemClicked}
                />
                <div className="main-content">
                    <Chart source="http://localhost:8080/api/dataStatistics.json?startDate=2015-01-01&endDate=2016-12-31&interval=MONTH" />
                    <Client source="http://localhost:8080/api/dataStatistics.json?startDate=2014-01-01&endDate=2017-12-31&interval=YEAR"/>
                </div>
            </div>
        );
    }
});



