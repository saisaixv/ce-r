import React from "react"

import "./Content.css"

class PackageItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="content-item">
                <img
                    className="content-item-head-img"
                    src={require(this.props.url)}/>
                <label>{this.props.title}</label>
                <label className="content-item-fill"></label>
                <label>{this.props.filenum}</label>
                <label className="content-item-line"></label>
                <label>{this.props.filesize}</label>
            </div>
        );
    }
}


export default class Content extends React.Component{
    constructor(props){
        super(props)

        this.state={
            data:[],
            total_num:0
        };
        this.responseHandle=this.responseHandle.bind(this);
    }

    componentWillMount(){

        // id=59c1d68eca3e760b8e931c58
        let token=localStorage.getItem("token");
        // console.log(`token = ${token}`);
        let url="http://localhost:3333/cydex/api/v1/packages?" +
            "project_id='59c1d68eca3e760b8e931c58'&" +
            "t='r'&" +
            "with_sender=1&" +
            "page_size=20&" +
            "page_num=1";
        fetch(url,{
            method:"GET",
            headers:{
                "x-us-authtype":"1",
                "accept-language":"zh-cn",
                "time-zone":"-8",
                "x-us-token":token
            }
        }) .then((response) => response.json())
            .then((json) => {
                this.responseHandle(json);
            }).catch((error) => {
            console.log(`error = ${error}`);
        });
    }

    responseHandle(response){
        this.setState({
            total_num:response.total_num,
            data:response.packages
        });
    }

    render(){

        if(this.state.total_num==0){

            return (
                <div>Empty</div>
            );
        }else {
            let data=this.state.data;
            const itemList=data.map((item,index)=>{
                // console.log(`id = ${item.id}`);
                <PackageItem
                    url={item.sender.user.pic_url}
                    filenum={item.files_num}
                    filesize={item.size}
                    title={item.title}/>
            });
            return (
                <div>
                    <itemList/>
                </div>
            );
        }

    }
}
