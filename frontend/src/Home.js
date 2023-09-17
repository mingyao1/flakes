import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";


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

        <main>
            <Search />
        </main>

    </div>
}

export default Home;