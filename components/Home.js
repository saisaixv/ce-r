import React from "react"

import {Redirect} from "react-router-dom"

import ToolBar from "./home/ToolBar"
import Body from "./home/Body"
import FloatActionButton from "./home/FloatActionButton"
import Shade from "./home/Shade"
import WorkSpace from "./home/WorkSpace"

import "./Home.css"


let wsOpen = false;

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.wsClickHandle = this.wsClickHandle.bind(this);
        this.closeWSHandle = this.closeWSHandle.bind(this);
        this.selectWSHandle = this.selectWSHandle.bind(this);
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
        } else {
            wsOpen = true;
            this.refs.shade.showHandle();
            this.refs.ws.openHandle();
        }
    }

    selectWSHandle(projectId){
        this.refs.bod.selectProjectId(projectId)
    }



    render() {

        let token = localStorage.getItem("token");

        if (token == null) {
            return (
                <Redirect push to="/login"/>
            );
        } else {
            return (
                <div className="global">
                    <div className="home">
                        <ToolBar onWSClick={this.wsClickHandle} title="收件箱" projectName="撒旦撒"
                                 url="http://pic2.ooopic.com/11/98/31/31bOOOPIC12_1024.jpg"/>
                        <Body ref='bod'></Body>

                    </div>
                    <FloatActionButton/>
                    <Shade onClick={this.closeWSHandle} ref="shade"></Shade>
                    <WorkSpace
                        ref="ws"
                        selectWS={this.selectWSHandle}
                        onClose={this.closeWSHandle}/>
                </div>

            );
        }

    }
}