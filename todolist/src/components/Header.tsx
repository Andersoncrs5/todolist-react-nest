import React from "react";
import '../styles/Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="container-fluid text-center border border-2 p-2" >
            <div className="row" >
                <div className="col-4 ">
                    <h2 id="title " className="mt-1" >MyTask</h2>
                </div>
                <div className="col-4"></div>
                <div className="col-4">
                    <a ><Link className="btn btn-default mt-1 btn-create " to="/create" > CREATE </Link></a>
                    <a ><Link className="btn btn-default mt-1 " to="/" > BACK </Link></a>
                </div>
            </div>
        </header>
    );
};

export default Header;