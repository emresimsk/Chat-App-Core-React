import * as React from 'react';


function Person(props:any) {
    return (
        <div className="contact" id="6">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1089577/contact7.JPG" alt="profilpicture" />
            <div className="contact-preview">
                <div className="contact-text">
                    <h1 className="font-name">Cool Kids</h1>
                    <p className="font-preview">Mmh, lecker :) Freu mich!</p>
                </div>
            </div>
            <div className="contact-time">
                <p>17:54</p>
            </div>
        </div>
    );
}


export class Persons extends React.Component {
    
    
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <section className="left">
                <div className="profile">
                    PROFİLE
                    <div className="icons">
                        <i className="fa fa-commenting fa-lg" aria-hidden="true"></i>
                        <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="wrap-search">
                    Kayıtlı Üyeler  
                </div>
                <div className="contact-list">
                    <Person/>
                    <Person/>
                    <Person/>
                </div>
            </section>
        );
    }
}




