import React from 'react';

const Button = ({disabled, children, clickHandler }) => {
    return (
        <button
            disabled= {disabled}
            onClick={clickHandler}
            type="button"
            className="nav-button"
        >
            {children}
        </button>
    );
};

export default Button;