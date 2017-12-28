import React from 'react'

import './SelectTable.css'

export default class SelectTable extends React.Component {
    constructor(props) {
        super(props)
        this.mouseOverHandle = this.mouseOverHandle.bind(this);
        this.mouseOutHandle = this.mouseOutHandle.bind(this);
        this.divmouseOverHandle = this.divmouseOverHandle.bind(this);
        this.divmouseOutHandle = this.divmouseOutHandle.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }

    mouseOverHandle(e) {
        e.target.style.backgroundColor = '#F5F7FA'
    }

    mouseOutHandle(e) {
        e.target.style.backgroundColor = '#ffffff'
    }
    divmouseOverHandle(e) {

        this.props.onMouseIn(true)

        // if(e.parentNode==this){
        //     console.log("divmouseOverHandle  不等于");
        // }else {
        //     console.log("divmouseOverHandle  等于");
        // }
        // console.log("divmouseOverHandle");
    }

    divmouseOutHandle(e) {
        // console.log("divmouseOutHandle");
        this.props.onMouseIn(false)

    }

    clickHandle(e) {
        console.log("click")
        let value=e.target.innerText.trim();
        console.log(`value = ${value}`);
        this.props.select(value)
    }

    render() {
        let ItemList = this.props.data.map((item, index) => {
            if (item.selected) {
                return <label
                    key={index}
                    onClick={this.clickHandle}
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseOutHandle}
                    className="selecttable-item-label-select">{item.value}</label>
            } else {
                return <label
                    key={index}
                    onClick={this.clickHandle}
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseOutHandle}
                    className="selecttable-item-label">{item.value}</label>
            }
        });
        return (
            <div
                className="selecttable-div"
                onMouseOut={this.divmouseOutHandle}
                onMouseOver={this.divmouseOverHandle}>
                {ItemList}
            </div>
        );
    }
}