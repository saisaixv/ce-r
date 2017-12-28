import React from 'react'

import Select from '../../customcomponent/Select'
import SelectTable from '../../customcomponent/SelectTable'
import './css/StatisticWindow.css'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.selectClick = this.selectClick.bind(this);
        this.closeSelect = this.closeSelect.bind(this);
    }

    selectClick() {
        // console.log("selectClick")
        this.props.selectClick()
    }

    closeSelect() {
        // console.log("closeSelect")
        this.props.closeSelect()
    }

    render() {

        console.log(`render ${this.props.inSelectTable}`);
        return (
            <div className="statistic-search-div">
                <Select
                    isInSelectTable={this.props.isInSelectTable}
                    closeSelect={this.closeSelect}
                    selectClick={this.selectClick}/>

            </div>
        );
    }
}

let inSelectTable=false

class Statistic extends React.Component {
    constructor(props) {
        super(props)
        this.selectWS=this.selectWS.bind(this);
        this.selectClick=this.selectClick.bind(this);
        this.closeSelect=this.closeSelect.bind(this);
        this.mouseInHandle=this.mouseInHandle.bind(this);
        this.isInSelectTable=this.isInSelectTable.bind(this);
    }

    selectWS(value){

        console.log(`value = ${value}`);
        this.refs.statistic_div_select_value.style.visibility='hidden'

    }

    selectClick(){
        this.refs.statistic_div_select_value.style.visibility='visible'
    }

    closeSelect(){
        this.refs.statistic_div_select_value.style.visibility='hidden'
    }

    mouseInHandle(value){

        inSelectTable=value
        console.log(`value = ${value}`)
    }

    isInSelectTable(){
        return inSelectTable
    }

    render() {

        let data=[
            {value:'a',selected:true},
            {value:'a',selected:false},
            {value:'a',selected:false},
            {value:'a',selected:false}
            ]
        return (
            <div>
                <Search
                    isInSelectTable={this.isInSelectTable}
                    closeSelect={this.closeSelect}
                    selectClick={this.selectClick}/>
                <div className="statistic-div-chart">

                </div>
                <div ref="statistic_div_select_value" className="statistic-div-select-value">
                    <SelectTable
                        onMouseIn={this.mouseInHandle}
                        select={this.selectWS}
                        data={data}/>
                </div>
            </div>
        );
    }
}

export default class StatisticWindow extends React.Component {
    constructor(props) {
        super(props)
        this.show = this.show.bind(this);
        this.hidden = this.hidden.bind(this);
        this.closeSelect = this.closeSelect.bind(this);
        this.selectClick = this.selectClick.bind(this);
    }

    show() {
        console.log("show")
        this.refs.statisticdiv.style.visibility = "visible"
    }

    hidden() {
        console.log("hidden")
        this.refs.statisticdiv.style.visibility = "hidden"
    }

    closeSelect() {

    }

    selectClick() {

    }

    render() {
        return (
            <div ref="statisticdiv" className="statistic-box-div">
                <h2 className="statistic-h2">统计报表</h2>
                <Statistic
                    closeSelect={this.closeSelect}
                    selectClick={this.selectClick}/>
            </div>
        );
    }
}