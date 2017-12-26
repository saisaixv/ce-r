import React from "react"
import "./css/FloatActionButton.css"

export default class FloatActionButton extends React.Component{
    constructor(props){
        super(props);
        this.mouseOutHandle=this.mouseOutHandle.bind(this);
        this.mouseOverHandle=this.mouseOverHandle.bind(this);
    }

    mouseOutHandle(e){
        this.refs.img.src=require("../../img/ic_add_white.png");
    }

    mouseOverHandle(e){
        this.refs.img.src=require("../../img/ic_send_white.png");
    }

    render(){
        return (
            <div
                onMouseOut={this.mouseOutHandle}
                onMouseOver={this.mouseOverHandle}
                className="floatactionbutton">
                <img
                    ref="img"
                    className="floatactionbutton-img"
                    src={require("../../img/ic_add_white.png")}/>
            </div>

        );
    }
}
