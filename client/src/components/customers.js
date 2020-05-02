import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            results: []
        };
    }

    componentDidMount() {
        fetch('/api/customers')
            .then(res => res.json())
            .then(results => this.setState({ results }, () => console.log('Results fetched...', results)));


    }

    render() {

        const sortedResults = this.state.results.sort((a, b) => {
            if (a.from === b.from) return a.subject < b.subject ? -1 : 1;
            return a.from < b.from ? -1 : 1;
        });

        return (
            <div className="m-3">
                <h1 className="text-center mt-5">
                    Podgląd Zadań
                </h1>
            
                {sortedResults.map((mail, index) => {

                    return (
                        <div className="card bg-light mt-4">
                            <div className="card-header">{mail.from}</div>
                            <div className="card-body">
                                <h5 className="card-title ml-3 mr-5">{mail.subject}</h5>

                                <ul className="list-group w-100">
                                    {mail.results.map((que, index) => {

                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                {que.question} {que.isCorrect === 1
                                                    ? (
                                                        <span className="badge badge-success badge-pill">{que.answear}
                                                        </span>
                                                    )
                                                    : (
                                                        <span className="badge badge-danger badge-pill">{que.answear}</span>
                                                    )
                                                }
                                            </li>
                                        )
                                    })}
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Podsumowanie Zadania<span className="badge badge-primary badge-pill">{mail.score}/{mail.results.length}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                })

                }


            </div>
        );

    }
}

export default Customers;