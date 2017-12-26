import React from "react"
import "./css/Menu.css"
import {
    MENU_INBOX,
    MENU_OUTBOX,
    MENU_RATEOFFLOW,
    MENU_STATISTICS,
    MENU_CART,
    MENU_PAY,
    MENU_NOTIFY
} from './Constant'

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
                    onClick={()=>this.props.onClick(MENU_INBOX)}
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_inbox_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    onClick={()=>this.props.onClick(MENU_OUTBOX)}
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_send_black.png")}
                        className="menu-item-img"/>
                </div>
                <label className="menu-line"></label>
                <div
                    onClick={()=>this.props.onClick(MENU_RATEOFFLOW)}
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_opacity_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    onClick={()=>this.props.onClick(MENU_STATISTICS)}
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_equalizer_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    onClick={()=>this.props.onClick(MENU_PAY)}
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_label_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    onClick={()=>this.props.onClick(MENU_CART)}
                    className="menu-item"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseoutHandle}>
                    <img
                        src={require("../../img/ic_shopping_cart_black.png")}
                        className="menu-item-img"/>
                </div>
                <div
                    onClick={()=>this.props.onClick(MENU_NOTIFY)}
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
