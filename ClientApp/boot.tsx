import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Layout} from "./component/Layout";
import {Chat} from "./component/Chat";
import {Persons} from "./component/Persons";
import {LoginOrLogout} from "./component/Login";


//ReactDOM.render(<Layout><Persons/><Chat/></Layout>, document.getElementById('react-app'));


class App extends React.Component {
    state: {isLogin:boolean}
    constructor(props: any) {
        super(props);
        this.state = { isLogin: false };
        this.handleIsLogin = this.handleIsLogin.bind(this);
    }

    handleIsLogin(e:any) {
        this.setState({ isLogin: e });
    }

    render() {
        return (
            <Layout login={<LoginOrLogout handleIsLogin={this.handleIsLogin}/>}><Persons/><Chat isLogin={this.state.isLogin}/></Layout>        
            );
    }

}


ReactDOM.render(<App/>, document.getElementById('react-app'));