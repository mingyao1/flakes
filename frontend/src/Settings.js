import React from "react";
import myImg from "./img.jpeg"
import { Link } from "react-router-dom";

const Settings = () => {
    return <>
        <header className="bg-primary py-3">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="display-5">Flakes</h1>
                    <nav className="nav">
                        <ul className="list-unstyled d-flex m-0">
                            <li className="mr-3">
                                <Link to='/' className="nav-link text-light">Home</Link>
                            </li>
                            <li>
                                <Link to='/settings' className="nav-link text-light">Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        <div className="container text-center">
            <img src={myImg} alt="settings"></img>
            <div className="display-3">we're working on it</div>
            <Link to='/' >cancel</Link>
            <div>TODO drop down menu</div>
        </div>

    </>
}

export default Settings