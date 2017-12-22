import React from "react"
import "./WorkSpace.css"

class Head extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2>{this.props.title}</h2>
        );
    }
}

class WSItem extends React.Component {
    constructor(props) {
        super(props);
        this.mouseOverHandle = this.mouseOverHandle.bind(this);
        this.mouseOutHandle = this.mouseOutHandle.bind(this);
    }

    mouseOverHandle(e) {
        // e.target.style.backgroundColor="#ddf0fb";

        if (!e)
            e = window.event;
        var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;
        while (reltg && reltg != this) reltg = reltg.parentNode;
        if (reltg != this) {
// 这里可以编写 onmouseenter 事件的处理代码
            e.target.style.backgroundColor="#ddf0fb";
        }

    }

    mouseOutHandle(e) {
        // e.target.style.backgroundColor = "#EFF5F7";
        if (!e)
            e = window.event;
        var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (reltg && reltg != this) reltg = reltg.parentNode;
        if (reltg != this) {
// 这里可以编写 onmouseleave 事件的处理代码
            e.target.style.backgroundColor = "#EFF5F7";
        }
    }

    render() {
        return (
            <div
                onMouseOver={this.mouseOverHandle}
                onMouseOut={this.mouseOutHandle}
                className="workspace-item">
                <img
                    src={require("../../img/launcher.png")}
                    className="workspace-item-head"/>
                <div
                    className="workspace-item-content">
                    <label
                        className="workspace-item-title">{this.props.title}</label>
                    <label
                        className="workspace-item-num">{this.props.num}人参与</label>
                </div>
                <label
                    className="workspace-item-fill"></label>
                <img
                    className="workspace-item-more" src={require("../../img/ic_more_vert_black.png")}/>
            </div>
        );
    }
}
export default class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total_num: 0,
            projects: []
        };
        this.openHandle = this.openHandle.bind(this);
        this.closeHandle = this.closeHandle.bind(this);
        this.responseHandle = this.responseHandle.bind(this);

    }

    openHandle() {
        this.refs.div.style.right = "0px";
        // this.setState({
        //     refresh:
        // });
    }

    closeHandle() {
        this.refs.div.style.right = "-260px";
    }

    componentWillMount() {

        // id=59c1d68eca3e760b8e931c58
        let token = localStorage.getItem("token");
        // console.log(`token = ${token}`);
        let url = "http://localhost:3333/cydex/api/v1/projects?" +
            "type=1&" +
            "with_admin_user=1&" +
            "page_size=20&" +
            "page_num=1";
        fetch(url, {
            method: "GET",
            headers: {
                "x-us-authtype": "1",
                "accept-language": "zh-cn",
                "time-zone": "-8",
                "x-us-token": token
            }
        }).then((response) => response.json())
            .then((json) => {
                this.responseHandle(json);
            }).catch((error) => {
            console.log(`error = ${error}`);
        });
    }

    responseHandle(response) {
        this.setState({
            total_num: response.total_num,
            projects: response.projects
        });
    }

    render() {

        console.log(`render total_num = ${this.state.total_num}`);

        if (this.state.total_num == 0) {
            return (
                <div ref="div" className="workspace">Workspace</div>
            );
        } else {
            let data = this.state.projects;
            // console.log(`length = ${data.length}`);
            const ItemList = data.map((item, index) => (
                <WSItem
                    key={index}
                    url={item.pic_url}
                    title={item.name}
                    num={item.members_num}/>
            ));
            console.log(ItemList);
            return (
                <div ref="div" className="workspace">
                    {ItemList}
                </div>
            );
        }

    }
}
