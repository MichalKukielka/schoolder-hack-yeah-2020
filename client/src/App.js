import React, { Component } from 'react';
import { BookHalf } from 'react-bootstrap-icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Customers from './components/customers';
import QuestionForm from './components/questionForm';

class App extends Component {

    componentDidMount() {
        document.title = "Schoolder"
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <BookHalf size={48} className="navbar-brand mr-3"/> Schoolder
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Dziennik</Link>
                                <Link className="nav-item nav-link" to="/pracadomowa">Praca Domowa<span className="ml-1 badge badge-pill badge-danger">!</span></Link>
                            </div>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/pracadomowa">
                            <QuestionForm />
                        </Route>
                        <Route path="/">
                            <Customers />
                        </Route>
                    </Switch>
                </div>
            </Router>

        );
    }
}

export default App;