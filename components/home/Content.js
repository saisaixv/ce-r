import React from "react"

import "./css/Content.css"
import {crtTimeFtt} from '../../util/DateFormat'

class PackageItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // return (
        //     <div className="content-item">
        //         {this.props.title}
        //     </div>
        // );
        // console.log(`size =${this.props.size}`)
        return (
            <div className="content-item">
                <img
                    className="content-item-head-img"
                    src={this.props.url}/>
                <label className="content-item-sendername">{this.props.sender.user.name}</label>
                <label className="content-item-title">{this.props.title}</label>
                <label className="content-item-fill"></label>
                <label className="content-item-num">{this.props.files_num}</label>
                <label className="content-item-line"></label>
                <label className="content-item-size">{this.props.size}</label>
            </div>
        );
    }
}

class PackageHead extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <label>{this.props.date}</label>
        );
    }
}

export default class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            total_num: 0,
            type:'r',
            projectId:''
        };
        this.responseHandle = this.responseHandle.bind(this);
        this.getItem = this.getItem.bind(this);
        this.loadData = this.loadData.bind(this);
        this.refrersh=this.refrersh.bind(this);
    }

    setType(type){
        this.setState({
            type:type
        });
        this.refrersh(type)
    }

    refrersh(type) {

        let token = localStorage.getItem("token");
        console.log(`type = ${this.state.type}`)
        // console.log(`${this.props.projectId}`)
        let url = "http://localhost:3333/cydex/api/v1/packages?" +
            `project_id=${this.state.projectId}&` +
            `t=${type}&` +
            "with_sender=1&" +
            "page_size=50&" +
            "page_num=1";
        fetch(url, {
            method: "GET",
            headers: {
                "x-us-authtype": "1",
                "accept-language": "zh-cn",
                "time-zone": "-8",
                "x-us-token": token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.responseHandle(json);
            }).catch((error) => {
            // console.log(`error = ${error}`);
        });
    }

    loadData(projectId) {

        this.setState({
            projectId:projectId
        });
        let token = localStorage.getItem("token");
        // console.log(`${token}`)
        // console.log(`${this.props.projectId}`)
        let url = "http://localhost:3333/cydex/api/v1/packages?" +
            `project_id=${projectId}&` +
            `t=${this.state.type}&` +
            "with_sender=1&" +
            "page_size=50&" +
            "page_num=1";
        fetch(url, {
            method: "GET",
            headers: {
                "x-us-authtype": "1",
                "accept-language": "zh-cn",
                "time-zone": "-8",
                "x-us-token": token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.responseHandle(json);
            }).catch((error) => {
            // console.log(`error = ${error}`);
        });
    }

    responseHandle(response) {

        // console.log(`errno = ${response.errno}`);
        this.setState({
            total_num: response.total_num,
            data: response.packages
        });
    }

    getItem(item, index,date) {

        let str=parseFloat(`${item.create_at}000`);
        let newdate = crtTimeFtt(str);
        // console.log(`date = ${date}  newdate = ${newdate}`)

        if (index == 0 || date!==newdate) {

            return (
                <div>
                    <PackageHead date={newdate}/>
                    <PackageItem
                        key={item.id}
                        {...item}/>
                </div>
            );

        } else {
            return (
                <PackageItem
                    key={item.id}
                    {...item}/>
            );

        }

    }

    render() {

        console.log("render");
        if (this.state.total_num == 0) {

            return (
                <div className="content">Empty</div>
            );
        } else {
            let data = this.state.data;
            const itemList = data.map((item, index) => {


                    let date=crtTimeFtt(parseFloat(`${data[index>0?index-1:0].create_at}000`))
                    //使用大括号 之后要用return
                    return this.getItem(item, index,date)
                }
            );
            return (
                <div className="content">
                    {itemList}
                </div>
            );
        }

    }
}
