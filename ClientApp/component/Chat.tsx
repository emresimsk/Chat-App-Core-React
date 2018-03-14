import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './../css/chat.css';
import * as SignalR from "@aspnet/signalr-client";
import Cookies from 'universal-cookie';
import * as $ from "jquery";


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

function getToken() {
   return cookies.get('token');
}

function getId() {
    return cookies.get('userid'); 
}

export class Chat extends React.Component<{isLogin:any}> {
    state: {message:any;messageList:any,connection:any};
    
    el: any;
    constructor(props: any) {
        super(props);
        this.state = { message: "", messageList: [] ,connection: new SignalR.HubConnection('/chat')};

        this.handleChange = this.handleChange.bind(this);
        this.handleSendPress = this.handleSendPress.bind(this);
        this.getAllMessages = this.getAllMessages.bind(this);
        this.handleScrollToElement = this.handleScrollToElement.bind(this);
    }

    componentDidMount() {
        
        this.getAllMessages();

        this.state.connection
            .start()
            .then(() => console.log('Connection started!'))
            .catch((err:any) => console.log('Error while establishing connection :('));

        this.state.connection.on('getMessageAll',
            (message: any, date: any,id:any) => {
                const messageList = this.state.messageList;
                messageList.push({ message: message, date: date , id:id });
                this.setState({ messageList: messageList });
            });
    }
    
    getAllMessages() {
        let token = getToken();
        var messageList = this.state.messageList;
        if (token === '') {
            messageList = [];
        }
        
        $.ajax({
            headers: {'Content-Type':'application/json'},
            url: '/api/Operations/GetAllMessages',
            type: 'GET',
            dataType: 'json',
            async :false,
            beforeSend: (xhr, settings) => {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token!);
            },
            success(data:any) {          
                $.each( data, (key, item) => {
                    messageList.push({ message: item.Message, date: item.Date , id:item.Sender });
                });
            },
            error(xhr:any) {
                console.log(xhr);
            }
        });
        this.setState({ messageList: messageList });
    }

    handleChange(e: any) {
        this.setState({ message: e.target.value });
    }

    handleSendPress(e: any) {
        if (e.key === 'Enter') {
            if (this.state.message !=="") {
                this.state.connection.invoke('sendMessageAll', this.state.message, getId(),getToken());
                this.setState({message:""});
            }
        } else {
            this.setState({ message: e.target.value });
        }
    }

    componentWillReceiveProps() {
        this.getAllMessages();
    }

    componentDidUpdate() {
        this.handleScrollToElement();
    }

    handleScrollToElement() {
        $('.chat').animate({
            scrollTop: $('.chat').get(0).scrollHeight}, 1000); 
    
    }


    render() {

        return (
            <section className="right">
                <div className="chat-head">
                    Chat
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
                    <div className="chat" >
                        { this.state.messageList.map((item: any, index: any) => (
                            <Message key={index} name="" class={(item.id === getId() ? 'me' : 'you')} message={item.message} date={ item.date}/>)) }
                    </div>
                    <div className="information"></div>
                </div>
                <div className="wrap-message">
                    <i className="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                    <div className="message">
                        <input type="text" className="input-message" value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleSendPress}/>
                    </div>
                    <i className="fa fa-microphone fa-lg" aria-hidden="true"></i>
                </div>
            </section>
        );
    }

}
