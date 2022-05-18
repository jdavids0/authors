import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const AllAuthors = (props) => {
    const [authorList, setAuthorList] = useState([]);
    const [deleteToggle, setDeleteToggle] = useState(false);

    const {_id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then(res => {
                console.log ('this is the res: ', res.data.results);
                setAuthorList(res.data.results)
            })
            .catch(err => {
                console.log('error: ', err);
            })
    },[deleteToggle])

    const deleteAuthor = (_id) => {
        axios.delete(`http://localhost:8000/api/authors/${_id}`)
            .then(res => {
                console.log(res.data.results);
                setDeleteToggle(!deleteToggle);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
        <Link className="btn btn-info btn-outline-dark" style={{color: "white"}} to={'/create'}>Add An Author</Link>
        <h3 style={{color: "purple"}}>We have quotes by:</h3>

        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">Author</th>
                    <th scope="col">Bestseller?</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    authorList.map((author, idx) =>{
                        return(
                            <tr key={idx}>
                                <td style={{color: "purple"}}>{author.name}</td>
                                <td>{author.isBestSeller? "yes": "no"}</td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <button className="btn btn-info"><Link to={`/edit/${author._id}`} style={{color: "white"}}>Edit</Link></button>
                                        <button className="btn btn-dark" onClick={ (e)=> deleteAuthor(author._id) }>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
        
        </>
    )
}

export default AllAuthors