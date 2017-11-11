import React from 'react';
import './styles.css';

const Button = ({ children, ...props }) => (
    <a role="button" className="button" { ...props }>{ children }</a>
);



export default Button;