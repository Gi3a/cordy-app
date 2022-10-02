import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const Error = () => {

    const { type_error } = useParams();

    let error_code = 404;
    if (type_error === false)
        error_code = 404;

    return (
        <div className="page">
            <h1>Error {error_code}</h1>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default Error