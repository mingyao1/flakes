import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";


const Home = () => {

    
    

    return <div className="bg-light text-white p-3">
        <header>
            <span style={{ color: 'green' }}>Flake </span>
            <nav className="nav" style={{ marginLeft: 'auto' }}>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
            <li style={{ marginLeft: '20px' }}>
            marginLeft
            <Link to='/' className="nav-link">Home</Link>
                    </li>
                    <li>
                    </li>
                </ul>
            </nav>
        </header>


        <main>
            marginLeft
            <Search />
        </main>

    </div>
}

export default Home;