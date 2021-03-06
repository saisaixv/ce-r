import React from "react"
import "./css/WorkSpace.css"

class Head extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h3 className="workspace-title">{this.props.title}</h3>
        );
    }
}

class WSItem extends React.Component {
    constructor(props) {
        super(props);
        this.mouseOverHandle = this.mouseOverHandle.bind(this);
        this.mouseOutHandle = this.mouseOutHandle.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
        this.select = this.select.bind(this);
        this.createWSHandle = this.createWSHandle.bind(this);
    }

    mouseOverHandle(e) {
        if (e.target == this.refs.div) {
            e.target.style.backgroundColor = "#ddf0fb";
        } else {
            this.refs.div.style.backgroundColor = "#ddf0fb";
        }
    }

    mouseOutHandle(e) {
        if (!this.props.selected) {

            if (e.target == this.refs.div) {
                e.target.style.backgroundColor = "#ffffff";
            } else {
                this.refs.div.style.backgroundColor = "#ddf0fb";
            }
        }

    }

    clickHandle() {
        this.props.onClick(this.props.id)
    }

    createWSHandle() {

        alert("创建工作区");
    }

    select(value) {
        this.setState({
            selected: value
        });
    }

    render() {
        if (this.props.url != null) {
            if (this.props.selected) {
                return (
                    <div
                        onClick={this.clickHandle}
                        ref="div"
                        onMouseOver={this.mouseOverHandle}
                        onMouseOut={this.mouseOutHandle}
                        className="workspace-item-select">
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
            } else {
                return (
                    <div
                        onClick={this.clickHandle}
                        ref="div"
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

        } else {
            return (
                <div
                    onClick={this.createWSHandle}
                    ref="div"
                    onMouseOver={this.mouseOverHandle}
                    onMouseOut={this.mouseOutHandle}
                    className="workspace-item">
                    <div
                        className="workspace-item-head-bg">
                        <img
                            src={require("../../img/ic_add_white.png")}
                            className="workspace-item-head-img"/>
                    </div>

                    <div
                        className="workspace-item-content">
                        <label
                            className="workspace-item-title">创建工作区</label>
                        <label
                            className="workspace-item-num">每月赠送10GB</label>
                    </div>
                    <label className="workspace-item-fill"></label>
                </div>
            );
        }

    }
}
export default class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empty: true,
            myProject: [],
            joinProject: [],
            selectId: ''
        };
        this.openHandle = this.openHandle.bind(this);
        this.closeHandle = this.closeHandle.bind(this);
        this.responseHandle = this.responseHandle.bind(this);
        this.getItem = this.getItem.bind(this);
        this.selectWsHandle = this.selectWsHandle.bind(this);

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
        console.log(`token = ${token}`);
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
                let myProject = json.projects;
                let url = "http://localhost:3333/cydex/api/v1/projects?" +
                    "type=2&" +
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
                        let joinProject = json.projects;
                        // this.responseHandle(myProject, joinProject);
                        this.setState({
                            empty: false,
                            myProject: myProject,
                            joinProject: joinProject
                        });

                    }).catch((error) => {
                    console.log(`error = ${error}`);
                });
            }).catch((error) => {
            console.log(`error = ${error}`);
        });
    }

    responseHandle(myProject, joinProject) {

        let projectID = localStorage.getItem("selectProjectID");

        console.log(`projectId = ${projectID}`);

        if (projectID == null) {
            if (myProject != null) {
                projectID = myProject[0].id;
                localStorage.setItem("selectProjectID", projectID);
            } else if (joinProject != null) {
                projectID = joinProject[0].id;
                localStorage.setItem("selectProjectID", projectID);
            }

        } else {

            let exist = false;
            if (myProject != null) {
                for (let i = 0; i < myProject.length; i++) {
                    if (myProject[i].id == projectID) {
                        exist = true;
                        break;
                    }
                }
            }

            if (!exist && joinProject != null) {

                for (let i = 0; i < joinProject.length; i++) {
                    if (joinProject[i].id == projectID) {
                        exist = true;
                        break;
                    }
                }
            }

            if (!exist) {
                if (myProject != null) {
                    projectID = myProject[0].id;
                    localStorage.setItem("selectProjectID", projectID);
                } else if (joinProject != null) {
                    projectID = joinProject[0].id;
                    localStorage.setItem("selectProjectID", projectID);
                } else {
                    localStorage.removeItem("selectProjectID");
                    projectID = null;
                }
            }

        }

        if (projectID != null) {


        }

        let ItemList = [<Head key="0" title="我创建的工作区"/>];

        console.log(`length = ${ItemList.length}`);

        if (myProject != null) {
            let myItems = myProject.map((item, index) => (
                this.getItem(item, index, projectID)
            ));

            ItemList = myItems.reduce(function (coll, item) {
                coll.push(item);
                return coll;
            }, ItemList);
        }

        ItemList.push(<WSItem key="1"/>);

        if (joinProject != null) {
            ItemList.push(<Head key="2" title="我加入的工作区"/>);

            let joinItems = joinProject.map((item, index) => (
                this.getItem(item, index, projectID)
            ));

            ItemList = joinItems.reduce(function (coll, item) {
                coll.push(item);
                return coll;
            }, ItemList);
        }

        return ItemList;
    }

    getItem(item, index, selectId) {
        if (selectId != null && item.id == selectId) {
            console.log("true");
            return (
                <WSItem
                    {...item}
                    onClick={this.selectWsHandle}
                    key={item.id}
                    url={item.pic_url}
                    title={item.name}
                    num={item.members_num}
                    selected={true}/>
            );
        } else {
            return (
                <WSItem
                    {...item}
                    onClick={this.selectWsHandle}
                    key={item.id}
                    url={item.pic_url}
                    title={item.name}
                    num={item.members_num}
                    selected={false}/>
            );
        }

    }

    selectWsHandle(projectId) {

        this.props.onClose()
        localStorage.setItem("selectProjectID", projectId);
        this.setState({
            selectId: projectId
        });
        this.props.selectWS(projectId)
    }


    render() {
        if (this.state.empty == true) {
            return (
                <div ref="div" className="workspace">
                    <h2>工作区</h2>
                </div>
            );
        } else {

            let ItemList = this.responseHandle(this.state.myProject, this.state.joinProject)
            return (
                <div ref="div" className="workspace">
                    <h2 className="workspace-title">工作区</h2>
                    {ItemList}
                </div>
            );
        }

    }
}
