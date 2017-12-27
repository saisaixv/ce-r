import React from "react"

import {Redirect} from "react-router-dom"

import ToolBar from "./home/ToolBar"
import Body from "./home/Body"
import FloatActionButton from "./home/FloatActionButton"
import Shade from "./home/Shade"
import WorkSpace from "./home/WorkSpace"

import "./Home.css"

import {
    MENU_INBOX,
    MENU_OUTBOX,
    MENU_RATEOFFLOW,
    MENU_STATISTICS,
    MENU_CART,
    MENU_PAY,
    MENU_NOTIFY
} from './home/Constant'
import RateOfFlowWindow from "./home/floatwindow/RateOfFlowWindow";


let wsOpen = false;

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.wsClickHandle = this.wsClickHandle.bind(this);
        this.closeWSHandle = this.closeWSHandle.bind(this);
        this.selectWSHandle = this.selectWSHandle.bind(this);
        this.menuClickHandle = this.menuClickHandle.bind(this);
        this.showCartHandle = this.showCartHandle.bind(this);
        this.showNotifyHandle = this.showNotifyHandle.bind(this);
        this.showPayHandle = this.showPayHandle.bind(this);
        this.showRateOfFlowHandle = this.showRateOfFlowHandle.bind(this);
        this.showStatisticsHandle = this.showStatisticsHandle.bind(this);
    }

    wsClickHandle(e) {
        if (wsOpen) {
            wsOpen = false;
            this.refs.ws.closeHandle();
            this.refs.shade.hiddenHandle();
        } else {
            wsOpen = true;
            this.refs.shade.showHandle();
            this.refs.ws.openHandle();
        }

    }

    closeWSHandle() {
        if (wsOpen) {
            wsOpen = false;
            this.refs.ws.closeHandle();
            this.refs.shade.hiddenHandle();
            this.refs.RateOfFlow.hidden()
        } else {
            wsOpen = true;
            this.refs.shade.showHandle();
            this.refs.ws.openHandle();

        }

    }

    selectWSHandle(projectId){
        this.refs.bod.selectProjectId(projectId)
    }

    menuClickHandle(event){
        if (wsOpen) {
            wsOpen = false;
            this.refs.shade.hiddenHandle();
        } else {
            wsOpen = true;
            this.refs.shade.showHandle();

            switch (event) {
                case MENU_RATEOFFLOW:
                    this.showRateOfFlowHandle()
                    break;
                case MENU_STATISTICS:
                    this.showStatisticsHandle()
                    break;
                case MENU_PAY:
                    this.showPayHandle()
                    break;
                case MENU_CART:
                    this.showCartHandle()
                    break;
                case MENU_NOTIFY:
                    this.showNotifyHandle()
                    break;
            }
        }
    }

    showRateOfFlowHandle() {
        // console.log("剩余流量");
        this.refs.RateOfFlow.show()
    }

    showStatisticsHandle() {
        console.log("统计报表");
    }

    showPayHandle() {
        console.log("充值");
    }

    showCartHandle() {
        console.log("订单");
    }

    showNotifyHandle() {
        console.log("通知管理");
    }



    render() {

        console.log("Home render");
        let token = localStorage.getItem("token");

        if (token == null) {
            return (
                <Redirect push to="/login"/>
            );
        } else {
            const data = [
                {value: 6, name: "是"},
                {value: 2, name: "否"}
            ]
            return (
                <div className="global">
                    <div className="home">
                        <ToolBar onWSClick={this.wsClickHandle} title="收件箱" projectName="撒旦撒"
                                 url="http://pic2.ooopic.com/11/98/31/31bOOOPIC12_1024.jpg"/>
                        <Body ref='bod' menuClick={this.menuClickHandle}></Body>

                    </div>
                    <FloatActionButton/>
                    <Shade onClick={this.closeWSHandle} ref="shade"></Shade>
                    <WorkSpace
                        ref="ws"
                        selectWS={this.selectWSHandle}
                        onClose={this.closeWSHandle}/>
                    <RateOfFlowWindow ref='RateOfFlow' data={data}></RateOfFlowWindow>
                </div>

            );
        }

    }
}