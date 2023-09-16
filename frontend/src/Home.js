import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    

    return <div className="container">
        <header>
            <div>Hello World</div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to='/' className="nav-link">Home</Link>
                    </li>
                    <li>

                    </li>
                </ul>
            </nav>
        </header>
        
    </div>
}

export default Home;