import React from 'react';
import './style.css';
import Error from '../../components/not_found_page/Error';
import ErrorMessage from '../../components/not_found_page/ErrorMessage';

const NotFound = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <Error />
                <ErrorMessage />
            </div>
        </div>
    );
}

export default NotFound;