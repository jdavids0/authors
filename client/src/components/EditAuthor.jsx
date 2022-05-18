import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom'

const EditAuthor = () => {
    const[authorInfo, setAuthorInfo] = useState({
        name: '',
        isBestSeller: ''
    })

    const [errors, setErrors] = useState({});
    const {_id} = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${_id}`)
            .then(res =>  {
                console.log('this is the res', res);

                if(res.data.error){
                    history.push('/errormsg')
                }
                else {
                    setAuthorInfo({
                        ...authorInfo,
                        // do I need [0]
                        name: res.data.results[0].name,
                        isBestSeller: res.data.results[0].isBestSeller
                    })
                }
            })
            .catch(err => console.log(err))
    }, [])

    const changeHandler = (e) => {
        setAuthorInfo({
            ...authorInfo,
            [e.target.name] : e.target.value
        })
        console.log(authorInfo)
    }

    const checkHandler = (e) => {
        setAuthorInfo({
            ...authorInfo,
            [e.target.name] : e.target.checked
        })
        console.log(authorInfo)
    }

    const updateAuthor = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/${_id}`, authorInfo)
            .then(res => {
                console.log('this is the updated res', res)
                // if there are validation errors, then save them inside state variable obj
                // res.data.error == presence of validation errors
                if(res.data.error){
                    // res.data.error.errors == actual validation errors
                    setErrors(res.data.error.errors);
                }
                // if there are no errors, reset state variable to clear out form
                else {
                    history.push(`/`)
                }
            })
            .catch(err => console.log(err, authorInfo))
    }
    
    return (
        <>
        <div className="mt-2">
            <Link className="btn btn-info btn-outline-dark mb-4" style={{color: "white"}} to='/'>Home</Link>
            <h3 style={{color: "purple"}}>Edit this author:</h3>
                <form className="d-flex flex-column align-items-center" onSubmit={updateAuthor}>
                    <div className="form-group">
                        <label htmlFor="name">Author Name:</label>
                        <input type="text" name="name" value={authorInfo.name} onChange={changeHandler} />
                    </div>
                    <p className="text-danger">{errors.name?.message}</p>
                    <div className="form-group">
        `               <label htmlFor="isBestSeller">Bestseller?</label>`
                        <input type="checkbox" name="isBestSeller" onChange={checkHandler} checked={authorInfo.isBestSeller} />
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

export default EditAuthor;