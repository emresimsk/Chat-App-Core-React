import * as $ from "jquery";
import * as React from 'react';
import Cookies from 'universal-cookie';

function getToken() {
    return cookies.get('token');
}

const cookies: Cookies = new Cookies();
function setCookie(token:any,id:any) {
    cookies.set('token', token);
    cookies.set("userid",id);
}

class Login extends React.Component<{handleTokenChange:any}> {
    state: {username:any,password:any};
    constructor(props: any) {
        super(props);
        this.state = { username: '', password: '' };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleUsernameChange(e: any) {
        this.setState({username:e.target.value});
    }

    handlePasswordChange(e: any) {
        this.setState({password:e.target.value});
    }

    handleOnSubmit(event: any) {

        event.preventDefault();
        $.ajax({
            headers: {'Content-Type':'application/json'},
            url: '/api/Auth/Login',
            type: 'POST',
            async:false,
            data:  JSON.stringify({'Username':this.state.username,'Password':this.state.password}),
            dataType: 'json',
            success(data:any) {
                if (data.code === 200) {
                    setCookie(data.tokenResult, data.id);
                } else {
                    alert(data.message);
                }
                console.log(data.message);
            },
            error(xhr:any) {
                console.log(xhr);
            }
        });
        
        this.props.handleTokenChange(getToken());
    }

    render() {

        return (
            <form onSubmit={this.handleOnSubmit}>
                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input type="text" className="form-control" value={this.state.username} onChange={this
                        .handleUsernameChange} required/>
                </div>

                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    <input type="password" className="form-control" value={this.state.password} onChange={this
                        .handlePasswordChange} required/>
                </div>
                <div>
                    <button type="submit" className="btn btn-success pull-right">Login</button>
                </div>
            </form>
        );
    }
}

class Logout extends React.Component<{handleTokenChange:any}> {
    constructor(props: any) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(event: any) {
        event.preventDefault();
        setCookie('','');
        this.props.handleTokenChange(getToken());
    }

    render() {

        return (
            <form onSubmit={this.handleOnSubmit}>
                <div>
                    <button type="submit" className="btn btn-success pull-right">Log out</button>
                </div>
            </form>
        );
    }
}


export class LoginOrLogout extends React.Component<{handleIsLogin:any}> {
    state: {token:any};
    timerID : any;
    constructor(props: any) {
        super(props);
        this.state = { token: '' };

        this.handleTokenChange = this.handleTokenChange.bind(this);
    }

    handleTokenChange(e:any) {
        this.setState({token:getToken()});
        this.props.handleIsLogin(getToken() !== '');
    }

    componentDidMount() {
        this.setState({token:getToken()});  
    }

    render() {

        const loginOrLogout = this.state.token ? <Logout handleTokenChange={this.handleTokenChange}/> : <Login handleTokenChange={this.handleTokenChange}/>;

        return (loginOrLogout);
    }


}