import React, { useState, Fragment } from 'react';
import { PlusSquare, Trash } from 'react-bootstrap-icons';

const QuestionForm = () => {



    const [inputFields, setInputFields] = useState([
        { subject: '', question: '', A: '', B: '', C: '', D: '', correct: '' }
    ]);


    const handleSubmit = e => {
        e.preventDefault();

        var url = 'http://localhost:5000/api/homework';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questions: inputFields })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
        console.log("inputFields", [inputFields]);
        
        window.location.reload();
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "pytanie") {
            values[index].question = event.target.value;
        }
        if (event.target.name === "A") {
            values[index].A = event.target.value;
        }
        if (event.target.name === "B") {
            values[index].B = event.target.value;
        }
        if (event.target.name === "C") {
            values[index].C = event.target.value;
        }
        if (event.target.name === "D") {
            values[index].D = event.target.value;
        }
        if (event.target.name === "correct") {
            values[index].correct = event.target.value;
        }
        if (event.target.name === "subject") {
            values[index].subject = event.target.value;
        }

        setInputFields(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ question: '', A: '', B: '', C: '', D: '', correct: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    return (
        <div>
            <h1 className="text-center mt-5">
                Stwórz nową pracę domową
            </h1>
            <form onSubmit={handleSubmit} className="ml-5 mr-5 mt-5">
                <div>

                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>

                            {index === 0
                                ? (

                                    <div className="card bg-light mb-3">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="subject">Tytuł Pracy domowej</label>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    value={inputField.subject}
                                                    onChange={event => handleInputChange(index, event)} />
                                                <small className="form-text text-muted">Podaj nazwę pracy domowej.</small>
                                            </div>
                                        </div>
                                    </div>
                                )
                                : (<div></div>)
                            }

                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="subject">Treść Pytania</label>
                                        <input
                                            required
                                            className="form-control"
                                            type="text"
                                            id="pytanie"
                                            name="pytanie"
                                            value={inputField.question}
                                            onChange={event => handleInputChange(index, event)} />
                                        <small className="form-text text-muted">Podaj treść pytania.</small>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">A:</label>
                                        <div className="col-sm-11">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="A"
                                                name="A"
                                                value={inputField.A}
                                                onChange={event => handleInputChange(index, event)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">B:</label>
                                        <div className="col-sm-11">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="B"
                                                name="B"
                                                value={inputField.B}
                                                onChange={event => handleInputChange(index, event)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">C:</label>
                                        <div className="col-sm-11">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="C"
                                                name="C"
                                                value={inputField.C}
                                                onChange={event => handleInputChange(index, event)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">D:</label>
                                        <div className="col-sm-11">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="D"
                                                name="D"
                                                value={inputField.D}
                                                onChange={event => handleInputChange(index, event)} />
                                        </div>
                                    </div>


                                    <div>
                                        <label htmlFor="correct">
                                            Poprawna
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="correct"
                                            name="correct"
                                            value={inputField.correct}
                                            onChange={event => handleInputChange(index, event)} />
                                        <small className="form-text text-muted">Podaj poprawną odpowiedź.</small>
                                    </div>
                                </div>

                                <div className="form-group  m-3">

                                    {index !== 0
                                        ? (
                                            <button
                                            className="btn btn-primary align-middle mr-3"
                                                type="button"
                                                onClick={() => handleRemoveFields(index)} >
                                                <Trash />
                                            </button>)
                                        : (<div></div>)
                                    }

                                    <button
                                        className="btn btn-primary align-middle"
                                        type="button"
                                        onClick={() => handleAddFields()} >
                                        <PlusSquare className="align-middle"/>
                                    </button>
                                </div>
                            </div>


                        </Fragment>
                    ))}
                </div>
                <button
                    className="btn btn-success mb-5"
                    type='submit'
                >
                    Wyślij Zadanie
                    </button>
            </form>

        </div >
    );


}

export default QuestionForm;