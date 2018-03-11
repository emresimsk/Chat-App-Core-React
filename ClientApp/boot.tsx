import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Layout} from "./component/Layout";
import {Chat} from "./component/Chat";
import {Persons} from "./component/Persons";


ReactDOM.render(<Layout><Persons/><Chat/></Layout>, document.getElementById('react-app'));