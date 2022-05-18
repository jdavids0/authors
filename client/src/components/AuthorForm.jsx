import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const AuthorForm = (props) => {
    const [formInfo, setFormInfo] = useState({
        title: '',
        isBestSeller: false
    })

    // state variable in which to store validation errors
    const [errors, setErrors] = useState({})

    const history = useHistory();

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name] : e.target.value
        })
    }

    const checkHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name] : e.target.checked
        })
        // console.log(formInfo);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/authors', formInfo)
            .then(res => {
                console.log('this is the res: ', res);

                if(res.data.error){
                    // == actual individual validation errors
                    setErrors(res.data.error.errors)
                }
                else{
                    history.push('/')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="mt-2">
            <Link className="btn btn-info btn-outline-dark mb-4" style={{color: "white"}} to='/'>Home</Link>
                <form className="d-flex flex-column align-items-center" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Author Name:</label>
                        <input type="text" name="name" onChange={changeHandler} />
                    </div>
                    <p className="text-danger">{errors.name?.message}</p>
                    <div className="form-group">
        `               <label htmlFor="isBestSeller">Bestseller?</label>`
                        <input type="checkbox" name="isBestSeller" onChange={checkHandler} checked={formInfo.isBestSeller} />
                    </div>
                    <div className="d-flex gap-3">
                        <Link className="btn btn-info btn-outline-dark" to='/' style={{color: "white"}}>Cancel</Link>
                        <input type="submit" style={{color: "white"}} className="btn btn-dark btn-outline-info" value="Submit" />
                    </div>
                </form>
            </div>
        </>
    )

}

export default AuthorForm;