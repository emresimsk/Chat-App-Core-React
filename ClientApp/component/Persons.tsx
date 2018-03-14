import * as React from 'react';
import * as $ from "jquery";

function Person(props:any) {
    return (
        <div className="contact" id="6">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1089577/contact7.JPG" alt="profilpicture" />
            <div className="contact-preview">
                <div className="contact-text">
                    <h3 className="font-name">Username:{props.username} - Password:{props.password}</h3>
                </div>
            </div>
        </div>
    );
}


export class Persons extends React.Component {

    state: {personList : any};

    constructor(props: any) {
        super(props);
        this.state = { personList: [] };
    }


    componentDidMount() {

        var persons = this.state.personList;

        $.ajax({
            headers: {'Content-Type':'application/json'},
            url: '/api/Auth/GetUserInfo',
            type: 'GET',
            dataType: 'json',
            async :false,
            success(data:any) {          
                $.each( data, (key, item) => {
                    persons.push({ username: item.username, password: item.password });
                });
            },
            error(xhr:any) {
                console.log(xhr);
            }
        });

        this.setState({ personList: persons });
    }

    render() {
        return (
            <section className="left">
                <div className="profile">             
                     Chat App
                    <div className="icons">
                        <i className="fa fa-commenting fa-lg" aria-hidden="true"></i>
                        <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="wrap-search">
                    Registered Members  
                </div>
                <div className="contact-list">
                    {this.state.personList.map((item: any, index: any) => (
                        <Person key={index} username={item.username} password={item.password} />)) }
                </div>
            </section>
        );
    }
}




