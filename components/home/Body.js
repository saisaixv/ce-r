import React from "react"

import Content from "./Content"
import Menu from "./Menu"
import "./css/Body.css"

import {
    MENU_INBOX,
    MENU_OUTBOX,
    MENU_RATEOFFLOW,
    MENU_STATISTICS,
    MENU_CART,
    MENU_PAY,
    MENU_NOTIFY
} from './Constant'
import Shade from "./Shade";

let wsOpen = false;
export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.selectProjectId = this.selectProjectId.bind(this);
        this.showInBoxHandle = this.showInBoxHandle.bind(this);
        this.showOutBoxHandle = this.showOutBoxHandle.bind(this);
        this.menuClickHandle = this.menuClickHandle.bind(this);
        // this.showCartHandle = this.showCartHandle.bind(this);
        // this.showNotifyHandle = this.showNotifyHandle.bind(this);
        // this.showPayHandle = this.showPayHandle.bind(this);
        // this.showRateOfFlowHandle = this.showRateOfFlowHandle.bind(this);
        // this.showStatisticsHandle = this.showStatisticsHandle.bind(this);
        this.showOrHiddenHandle = this.showOrHiddenHandle.bind(this);

    }

    selectProjectId(projectId) {
        this.refs.content.loadData(projectId)
    }

    showInBoxHandle() {
        this.refs.content.setType("r")
        console.log("收件箱");
    }

    showOutBoxHandle() {
        this.refs.content.setType("s")
        console.log("发件箱");
    }

    // showRateOfFlowHandle() {
    //     console.log("剩余流量");
    // }
    //
    // showStatisticsHandle() {
    //     console.log("统计报表");
    // }
    //
    // showPayHandle() {
    //     console.log("充值");
    // }
    //
    // showCartHandle() {
    //     console.log("订单");
    // }
    //
    // showNotifyHandle() {
    //     console.log("通知管理");
    // }

    menuClickHandle(value) {

        switch (value) {
            case MENU_INBOX:
                this.showInBoxHandle()
                break;
            case MENU_OUTBOX:
                this.showOutBoxHandle()
                break;
            default:
                this.props.menuClick(value)
                break
        }
    }

    showOrHiddenHandle(){


        if (wsOpen) {

            console.log("hidden");
            wsOpen = false;
            this.refs.shade.hiddenHandle();
        } else {
            console.log("show");
            wsOpen = true;
            this.refs.shade.showHandle();
        }
    }

    render() {

        return (
            <div className="body">
                <Menu onClick={this.menuClickHandle}></Menu>
                <Content ref="content"/>
            </div>
        );

    }
}
