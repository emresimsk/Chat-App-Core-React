import * as React from 'react';


export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<{login:any}> {

    render() {
        return (
            <div className="container-fluid">
                <br/>
                <div className="row">
                    <div className="col-sm-10">EMRE ŞİMŞEK</div>
                    <div className="col-sm-2">
                        {this.props.login}
                    </div>
                </div>
                <div className="row">
                    <div className="green-background"></div>
                    <div className="wrap">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}





//    <div class="wrap">
//        <section class="left">
//            <div class="profile">
//                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1089577/user.jpg">
//                <div class="icons">
//                    <i class="fa fa-commenting fa-lg" aria-hidden="true"></i>
//                    <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
//                </div>
//            </div>
//            <div class="wrap-search">
//                <div class="search">
//                    <i class="fa fa-search fa" aria-hidden="true"></i>
//                    <input type="text" class="input-search" placeholder="Suchen oder neuen Chat beginnen">
//                </div>
//            </div>
//            <div class="contact-list"></div>
//        </section>

//<section class="right">
//    <div class="chat-head">
//        <img alt="profilepicture">
//        <div class="chat-name">
//            <h1 class="font-name"></h1>
//            <p class="font-online"></p>
//        </div>
//        <i class="fa fa-search fa-lg" aria-hidden="true"></i>
//        <i class="fa fa-paperclip fa-lg" aria-hidden="true"></i>
//        <i class="fa fa-bars fa-lg" aria-hidden="true" id="show-contact-information"></i>
//        <i class="fa fa-times fa-lg" aria-hidden="true" id="close-contact-information"></i>
//    </div>
//    <div class="wrap-chat">
//        <div class="chat"></div>
//        <div class="information"></div>
//    </div>
//    <div class="wrap-message">
//        <i class="fa fa-smile-o fa-lg" aria-hidden="true"></i>
//        <div class="message">
//            <input type="text" class="input-message" placeholder="Schreibe eine Nachricht">
//        </div>
//        <i class="fa fa-microphone fa-lg" aria-hidden="true"></i>
//    </div>
//</section>
//</div>