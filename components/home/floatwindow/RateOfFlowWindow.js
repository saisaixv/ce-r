import React from 'react'
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');

import './css/RateOfFlowWindow.css'

class RateOfFlowChart extends React.Component {
    constructor(props) {
        super(props)
        this.initPie = this.initPie.bind(this);
        this.setPieoption = this.setPieoption.bind(this);
    }

    componentDidMount() {
        this.initPie()
    }

    componentDidUpdate() {
        this.initPie()
    }


    initPie() {

        let {data} = this.props;
        let myChart = echarts.init(this.refs.pieReact);
        //
        let options = this.setPieoption(data);
        myChart.setOption(options)
    }

    setPieoption(data) {

        return {
            legend: {
                show: true,
                zlevel: 0,
                z: 4,
                orient: 'horizontal',
                x: 'center',
                y: 'top',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#ccc',
                borderWidth: 0,
                padding: 5,
                itemGap: 10,
                itemWidth: 20,
                itemHeight: 14,
                data: [{name: data[0].name}, {name: data[1].name}]
            },
            series: [
                {
                    name: '流量统计',
                    type: 'pie',
                    center: ["60%", "50%"],
                    radius: ['0', '60%'],
                    clockWise: true,
                    startAngle: 90,
                    minAngle: 0,
                    selectedOffset: 10,
                    // avoidLabelOverlap: true,
                    selectedMode: 'single',//可选中
                    legendHoverLink: true,
                    data: data,
                    itemStyle: {
                        normal: {
                            //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function (params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#3FB1E3', '#6BE6C1', '#FCCE10', '#E87C25', '#27727B',
                                    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                ];
                                // console.log(`index = ${params.dataIndex}`);
                                return colorList[params.dataIndex]
                            },
                            borderColor: '#fff',
                            borderWidth: 0,
                            label: {
                                show: true,
                                position: 'outer'
                            },
                            labelLine: {
                                show: true,
                                length: 20,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                        emphasis: {
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true,
                                length: 20,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        }
                    }
                }
            ]
        };

    }

    render() {
        return (
            <div className="RateOfFlowWindow-div">
                <h2>剩余流量</h2>
                <div className="RateOfFlowWindow-all">
                    <div className="RateOfFlowWindow-all-label">
                        <label>概览</label>
                        <label>免费流量和已购流量包的总和</label>
                    </div>
                    <label className="RateOfFlowWindow-all-fill"></label>
                    <label className="RateOfFlowWindow-all-flow-label">剩余{this.props.data[1].value}</label>
                </div>
                <div className="freeflow">
                    <div className="freeflow-label">
                        <label>免费流量</label>
                        <label>所有注册用户均享受每月10GB免费流量，月底清零。</label>
                    </div>
                    <div
                        className="freeflow-chart"
                        ref="pieReact"></div>

                </div>
            </div>
        );
    }
}

export default class RateOfFlowWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
        this.show = this.show.bind(this);
        this.hidden = this.hidden.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {

        let token = localStorage.getItem("token");
        let url = "http://localhost:3333/cydex/api/v1/query_quota_detail"
        fetch(url, {
            method: "GET",
            headers: {
                "x-us-authtype": "1",
                "accept-language": "zh-cn",
                "time-zone": "-8",
                "x-us-token": token
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.errno === null) {
                    console.log(`RateOfFlowWindow errno = ${json.errno}`);
                } else {
                    let value=json.user_quota.detail[0].traffic_all - json.user_quota.available_traffic;
                    this.setState({
                        data: [{
                            name: '已用',
                            value: `${value}`
                        }, {
                            name: '剩余',
                            value: json.user_quota.available_traffic
                        }]
                    });
                }
            })
            .catch(error => {
                console.log(`RateOfFlowWindow refresh ${error}`);
            })
    }

    show() {
        this.refs.div.style.visibility = "visible"
    }

    hidden() {
        this.refs.div.style.visibility = "hidden"
    }

    render() {
        let data=this.state.data;
        // return (
        //     <div ref="div" className="box-div">
        //         {
        //             <h2>ascsakdksadkhk</h2>
        //         }
        //     </div>
        // );
        return (
            <div ref="div" className="box-div">
                {
                    data.length==0?<h2>Loading...</h2>:<RateOfFlowChart data={data}/>
                }
            </div>
        );
    }


}