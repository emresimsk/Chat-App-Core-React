import * as React from 'react';
import './../css/chat.css';

function Message(props:any) {
    return (
        <div className="chat-bubble me">
            <div className="my-mouth">{props.name}</div>
            <div className="content">{props.message}</div>
            <div className="time">{props.date}</div>
        </div>
    );
}


export class Chat extends React.Component {
    state: {message:any;messageList:any};
    constructor(props: any) {
        super(props);
        this.state = { message: '', messageList: '' };
    }

    componentdidMount() {
        //Ajax işlemi yap burada mesaj listesini getir.
    }

    handleMessageChange(e: any) {
        this.setState({ message: e.target.value });
    }

    handleSendPress(e: any) {
        if (e.key === 'Enter') {
            
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

                    </div>
                    <div className="information"></div>
                </div>
                <div className="wrap-message">
                    <i className="fa fa-smile-o fa-lg" aria-hidden="true"></i>
                    <div className="message">
                        <input type="text" className="input-message" value={this.state.message} onChange={this.handleMessageChange} onKeyPress={this.handleSendPress} />
                    </div>
                    <i className="fa fa-microphone fa-lg" aria-hidden="true"></i>
                </div>
            </section>
        );
    }
}


