import React from "react";
import { Link } from "react-router-dom";

function Navigation({ id, title}) {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/"></Link></li>
                <li><Link to="/add"></Link></li>
                <li><Link to="/arsives">Arsip</Link></li>
                <li><Link to={`/detail/${id}`}>
                <span style={{fontSize: "xx-large", fontWeight: "bold"}}>
                    {title}
                </span>
                </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;