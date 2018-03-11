import * as React from 'react';
import './../css/chat.css';
import * as SignalR from "@aspnet/signalr-client";
import Cookies from 'universal-cookie';


const cookies: Cookies = new Cookies();

function Message(props:any) {
    return (
        <div className={'chat-bubble ' + props.class}>
            <div className={props.class+'-mouth'}>{props.name}</div>
            <div className="content">{props.message}</div>
            <div className="time">{props.date}</div>
        </div>
    );
}

function getCookie() {
   return cookies.get('token');
}

export class Chat extends React.Component {
    state: {message:any;messageList:any,connection:any};
    constructor(props: any) {
        super(props);
        this.state = { message: "", messageList: [] ,connection: new SignalR.HubConnection('/chat')};

        this.handleChange = this.handleChange.bind(this);
        this.handleSendPress = this.handleSendPress.bind(this);
    }

    componentDidMount() {

        this.state.connection
            .start()
            .then(() => console.log('Connection started!'))
            .catch((err:any) => console.log('Error while establishing connection :('));

        this.state.connection.on('getMessage',
            (message: any, date: any,token:any) => {
                const messageList = this.state.messageList;
                messageList.push({ message: message, date: date , token:token });
                this.setState({ messageList: messageList });
            });

    }

    handleChange(e: any) {
        this.setState({ message: e.target.value });
    }

    handleSendPress(e: any) {
        if (e.key === 'Enter') {
            if (this.state.message !=="") {
                this.state.connection.invoke('sendMessage', this.state.message, getCookie());
                this.setState({message:""});
            }
        } else {
            this.setState({ message: e.target.value });
        }
    }

    render() {
        return (
            <section className="right">
                <div className="chat-head">
                    profilepicture
                    <div className="chat-name">
                        <h1 className="font-name"></h1>
                        <p className="font-online"></p>
                    </div>
                    <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                    <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                    <i className="fa fa-bars fa-lg" aria-hidden="true" id="show-contact-information"></i>
                    <i className="fa fa-times fa-lg" aria-hidden="true" id="close-contact-information"></i>
                </div>
                <div className="wrap-chat">
                    <div className="chat">
                        {
                            this.state.messageList.map((item: any, index: any) => (
                                <Message key={index} name="" class={(item.token === getCookie()? 'me':'you')} message={item.message} date={ item.date} />
                            ))
                        }
                    </div>
                    <div className="information"></div>
                </div>
                <div className="wrap-message">
                    <i className="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                    <div className="message">
                        <input type="text" className="input-message" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleSendPress} />
                    </div>
                    <i className="fa fa-microphone fa-lg" aria-hidden="true"></i>
                </div>
            </section>
        );
    }
}


