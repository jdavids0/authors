import React from 'react';

import {Link} from 'react-router-dom';

const Error = () => {

    return (
        <>
            <div>
                <h3>We're sorry, but we're unable to find the author you were looking for. Would you like to add this author to our database?</h3>
                <Link style={{color: "white"}} className="btn btn-dark btn-outline-info" to='/create'>Add Author</Link>
            </div>
        
        </>
    )
}

export default Error