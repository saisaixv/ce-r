import React from 'react'
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');

import './css/RateOfFlowWindow.css'

export default class RateOfFlowWindow extends React.Component {
    constructor(props) {
        super(props)
        this.show = this.show.bind(this);
        this.hidden = this.hidden.bind(this);
        this.setPieoption = this.setPieoption.bind(this);
        this.initPie = this.initPie.bind(this);
    }

    componentDidMount() {
        this.initPie()
    }

    componentDidUpdate() {
        this.initPie()
    }

    show() {
        this.refs.div.style.visibility = "visible"
    }

    hidden() {
        this.refs.div.style.visibility = "hidden"
    }

    render() {

        // return (
        //     <div ref="div" className="RateOfFlowWindow-div">
        //         <h2>Heello</h2>
        //     </div>
        // );
        return (
            <div ref="div" className="RateOfFlowWindow-div">
                <h2>剩余流量</h2>
                <div className="RateOfFlowWindow-all">
                    <div className="RateOfFlowWindow-all-label">
                        <label>概览</label>
                        <label>免费流量和已购流量包的总和</label>
                    </div>
                    <label className="RateOfFlowWindow-all-fill"></label>
                    <label className="RateOfFlowWindow-all-flow-label">剩余10GB</label>
                </div>
                <div className="freeflow">
                    <div className="freeflow-label">
                        <label>免费流量</label>
                        <label>所有注册用户均享受每月10GB免费流量，月底清零。</label>
                    </div>
                    <div
                        className="freeflow-chart"
                        ref="pieReact"
                        style={{width: '100%', height: '300px'}}></div>

                </div>
            </div>
        );
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
                x: 'left',
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
                    center: ["70%", "60%"],
                    radius: ['0', '75%'],
                    clockWise: true,
                    startAngle: 90,
                    minAngle: 0,
                    selectedOffset: 10,
                    avoidLabelOverlap: true,
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
                            borderWidth: 1,
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
                            borderWidth: 1,
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
}