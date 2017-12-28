import React from 'react'
import './Select.css'

let focus = false
export default class Select extends React.Component {
    constructor(props) {
        super(props)
        this.blurHandle = this.blurHandle.bind(this);
        this.focusHandle = this.focusHandle.bind(this);
        this.setValue = this.setValue.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }

    blurHandle() {

        let value=this.props.isInSelectTable();

        console.log(`inSelectTable = ${value}`)
        if(!this.props.isInSelectTable()){
            focus = false
            // console.log("blurHandle");
            this.refs.select_div.style.border = '1px solid #DBDBDB';
            this.refs.select_img.src = require("../../img/ic_arrow_drop_down_black.png");
            this.props.closeSelect()
        }

    }

    focusHandle() {
        focus = true
        // console.log("focusHandle");
        this.refs.select_div.style.border = '1px solid #2FA0EC';
        this.refs.select_img.src = require("../../img/ic_arrow_drop_up_black.png");
        this.props.selectClick()
    }

    setValue(value) {
        this.refs.statistic_search_select.value = value;
    }

    clickHandle() {

        // console.log('clickHandle')
        // if (!focus) {
        //     // focus=true
        //     this.refs.statistic_search_select.focus()
        //     // this.focusHandle()
        // }

    }

    render() {
        return (
            <div
                onClick={this.clickHandle}
                ref="select_div"
                className="select-div">
                <input
                    type="text"
                    placeholder="请选择工作区"
                    ref="statistic_search_select"
                    onBlur={this.blurHandle}
                    onFocus={this.focusHandle}
                    className="select-input"/>
                <img
                    ref="select_img"
                    width='20px'
                    height='20px'
                    align="center"
                    className="select-img"
                    src={require("../../img/ic_arrow_drop_down_black.png")}/>
            </div>
        );
    }
}



