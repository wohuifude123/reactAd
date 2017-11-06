import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/pie';

// <div id="advertise01" style={{ width: 400, height: 400 }}></div>
class Advertise extends Component {
    componentDidMount() {
        var dom = document.getElementById("advertise01");
        var myChart = echarts.init(dom);
        var app = {};
        let option = null;
        option = {
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:235, name:'超级视频123'},
                        {value:274, name:'无限灵魂321'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:700, name:'搜索引擎'}
                    ]
                }
            ]
        };

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    }
    render() {
        return (
            <div id="advertise01"></div>
        );
    }
}

export default Advertise;


// http://blog.csdn.net/u012907049/article/details/73240865
