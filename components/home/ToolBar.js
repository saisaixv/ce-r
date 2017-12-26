import React from "react"
import "./css/ToolBar.css"

export default class ToolBar extends React.Component{
    constructor(props){
        super(props);
        this.wsClickHandle=this.wsClickHandle.bind(this);
    }

    wsClickHandle(e){
        this.props.onWSClick(e);
    }

    render(){
        return (
            <div className="toolbar">
                <img className="toolbar-menu" src={require('../../img/ic_menu_white.png')}></img>
                <label className="toolbar-title">{this.props.title}</label>
                <label className="toolbar-fill"></label>
                <img
                    onClick={this.wsClickHandle}
                    className="toolbar-projectbg"
                    src={this.props.url}></img>
                <label className="toolbar-project-name">{this.props.projectName}</label>
                <img className="toolbar-arr" src={require("../../img/ic_chevron_right_white.png")}></img>
            </div>
        );
    }
}
