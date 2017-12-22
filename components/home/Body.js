import React from "react"

import Content from "./Content"
import Menu from "./Menu"
import "./Body.css"


export default class Body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="body">
                <Menu></Menu>
                <Content/>
            </div>
        );
    }
}
