import React from "react"

import {Redirect} from "react-router-dom"

import "./Login.css"
export default  class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mailbox: '',
            pwd: '',
            token: ''
        };

        this.submitHandle = this.submitHandle.bind(this);
        this.fogotHandle = this.fogotHandle.bind(this);
        this.registerHandle = this.registerHandle.bind(this);
        this.mailboxChangeHandle = this.mailboxChangeHandle.bind(this);
        this.pwdChangeHandle = this.pwdChangeHandle.bind(this);
        this.responseHandle = this.responseHandle.bind(this);

    }

    submitHandle(e) {

        let mailBox = this.state.mailbox;
        let pwd = this.state.pwd;

        if (mailBox == "" || pwd == "") {
            alert("参数不完整");
        } else {

            let body = `{
                        "account":"${mailBox}",
                        "password":"${pwd}",
                        "os_type":"android",
                        "os_detail":"android 7.0"
                    }`;

            e.preventDefault();
            // let url="https://www.baidu.com";
            let url = "http://localhost:3333/cydex/api/v1/login";
            fetch(url, {
                method: "POST",
                headers: {
                    "x-us-authtype": "1",
                    "accept-language": "zh-cn",
                    "time-zone": "-8"
                },
                body: body
            })
                .then((response) => response.json())
                .then((json) => {
                    // console.log(`response = ${json.pic_url}`);
                    this.responseHandle(json);
                }).catch((error) => {
                console.log(`error = ${error}`);
            });
        }

    }

    responseHandle(response) {

        if (response.token == null) {
            console.log("token == null");
            alert(`登录失败${response.errno}`);
        } else {
            console.log("token != null");
            alert("登录成功");
            localStorage.setItem("token", response.token);
            this.setState({
                token: response.token
            });
        }
    }

    fogotHandle() {

        alert("忘记密码");
    }

    registerHandle() {
        alert("注册");
    }

    mailboxChangeHandle(e) {
        this.setState({
            mailbox: e.target.value
        });
    }


    pwdChangeHandle(e) {
        this.setState({
            pwd: e.target.value
        });
    }


    render() {

        if (this.state.token == "") {
            return (
                <div className="box">
                    <div className="aaa">
                        <form onSubmit={this.submitHandle} className="form">
                            <label>邮箱</label>
                            <input type="text" onChange={this.mailboxChangeHandle} className="inputmailbox"/>
                            <label>密码</label>
                            <a className="fogotpwd" onClick={this.fogotHandle}>忘记密码</a>
                            <input type="password" onChange={this.pwdChangeHandle} className="inputpassword"/>
                            <input type="submit" value="登录" className="inputlogin"/>
                            <label className="register" onClick={this.fogotHandle}>注册</label>
                        </form>
                    </div>

                </div>
            );
        } else {
            return (
                <Redirect push to="/home"/>
            );

        }

    }
}