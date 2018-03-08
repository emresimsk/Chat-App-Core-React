import * as $ from "jquery";
import * as React from 'react';
import Cookies from 'universal-cookie';




const cookies: Cookies = new Cookies();
function setCookie(token:any) {
    cookies.set('token', token);
}

function getCookie() {
    cookies.get('token');
}


export class Login extends React.Component {
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
            data:  JSON.stringify({'Username':this.state.username,'Password':this.state.password}),
            dataType: 'json',
            success(data:any) {
                if (data.code === 200) {
                    setCookie(data.tokenResult);
                }
                console.log(data.message);
            },
            error(xhr:any) {
                console.log(xhr);
            }
        });

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
