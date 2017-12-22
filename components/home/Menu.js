import React from "react"
import "./Menu.css"

export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.mouseOverHandle=this.mouseOverHandle.bind(this);
        this.mouseoutHandle=this.mouseoutHandle.bind(this);
    }

    mouseOverHandle(e){
        e.target.style.backgroundColor="#ddf0fb";
    }
    mouseoutHandle(e){
        e.target.style.backgroundColor="#EFF5F7";
    }

    render(){
        return (
            <div className="menu">
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_inbox_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_send_black.png")}
                        className="menu-item-img"/>
                </div>
                <label className="menu-line"></label>
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_opacity_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_equalizer_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_label_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_shopping_cart_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_playlist_add_check_black.png")}
                        className="menu-item-img"/>
                </div>

            </div>
        );
    }
}
