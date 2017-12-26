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


export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.selectProjectId = this.selectProjectId.bind(this);
        this.showInBoxHandle = this.showInBoxHandle.bind(this);
        this.showOutBoxHandle = this.showOutBoxHandle.bind(this);
        this.menuClickHandle = this.menuClickHandle.bind(this);
        this.showCartHandle = this.showCartHandle.bind(this);
        this.showNotifyHandle = this.showNotifyHandle.bind(this);
        this.showPayHandle = this.showPayHandle.bind(this);
        this.showRateOfFlowHandle = this.showRateOfFlowHandle.bind(this);
        this.showStatisticsHandle = this.showStatisticsHandle.bind(this);

    }

    selectProjectId(projectId) {
        this.refs.content.loadData(projectId)
    }

    showInBoxHandle(){

    }

    showOutBoxHandle(){

    }
    showRateOfFlowHandle(){

    }
    showStatisticsHandle(){

    }
    showPayHandle(){

    }
    showCartHandle(){

    }
    showNotifyHandle(){

    }

    menuClickHandle(value){

        switch (value){
            case MENU_INBOX:
                this.showInBoxHandle()
                break;
            case MENU_OUTBOX:
                this.showOutBoxHandle()
                break;
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

    render() {

        return (
            <div className="body">
                <Menu onClick={this.menuClickHandle}></Menu>
                <Content ref="content"/>
            </div>
        );

    }
}
