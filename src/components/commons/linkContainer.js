import React from 'react';
import { NavLink } from 'react-router-dom';

function RouterLink ({ to, onclick , cssClass, children}){
    return (
        <li>
            <NavLink to={to} onClick={onclick} className={cssClass} >{children}</NavLink>
        </li>
    );
}

export default RouterLink;