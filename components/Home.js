import React from "react"

import ToolBar from "./home/ToolBar"
import Body from "./home/Body"
import FloatActionButton from "./home/FloatActionButton"
import Shade from "./home/Shade"
import WorkSpace from "./home/WorkSpace"

import "./Home.css"
import Box from "../../demo/Box";


let wsOpen=false;

export default class Home extends React.Component{

    constructor(props){
        super(props)
        this.wsClickHandle=this.wsClickHandle.bind(this);
        this.closeWSHandle=this.closeWSHandle.bind(this);
    }

    wsClickHandle(e){
        if(wsOpen){
            wsOpen=false;
            this.refs.ws.closeHandle();
            this.refs.shade.hiddenHandle();
        }else {
            wsOpen=true;
            this.refs.shade.showHandle();
            this.refs.ws.openHandle();
        }

    }

    closeWSHandle(){
        if(wsOpen){
            wsOpen=false;
            this.refs.ws.closeHandle();
            this.refs.shade.hiddenHandle();
        }else {
            wsOpen=true;
            this.refs.shade.showHandle();
            this.refs.ws.openHandle();
        }
    }

    render(){

        console.log("home render");
        return (
            <div className="global">
                <div className="home">
                    <ToolBar onWSClick={this.wsClickHandle} title="收件箱" projectName="撒旦撒" url="http://pic2.ooopic.com/11/98/31/31bOOOPIC12_1024.jpg"/>
                    <Body></Body>

                </div>
                <FloatActionButton/>
                <Shade onClick={this.closeWSHandle} ref="shade"></Shade>
                <WorkSpace ref="ws"/>
            </div>

        );

    }
}