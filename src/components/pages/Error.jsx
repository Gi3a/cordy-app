import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className="page">
            <h1>Error</h1>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default Error