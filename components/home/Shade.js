import React from "react"
import "./Shade.css"

export default class Shade extends React.Component{
    constructor(props){
        super(props);
        this.showHandle=this.showHandle.bind(this);
        this.hiddenHandle=this.hiddenHandle.bind(this);
        this.clickHandle=this.clickHandle.bind(this);
    }

    showHandle(){
        console.log("show");
        this.refs.div.style.visibility="visible";
    }

    hiddenHandle(){
        console.log("hidden");
        this.refs.div.style.visibility="hidden";
    }

    clickHandle(){
        this.props.onClick();
    }

    render(){
        return (
            <div onClick={this.clickHandle} ref="div" className="shade"></div>
        );
    }
}
