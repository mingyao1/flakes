import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";


const Home = () => {

    
    

    return <div className="bg-light text-white p-3">
        <header>
            <span style={{ color: 'green' }}>CBRE Management System</span>
            <nav className="nav" style={{ marginLeft: 'auto' }}>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
            <li style={{ marginLeft: '20px' }}>
            <Link to='/' className="nav-link">Home</Link>
                    </li>
                    <Link to='/' className="nav-link">Dashboard</Link>
                    <li>
                    </li>
                </ul>
            </nav>
        </header>


        

        <div>
        <button type="button" class="btn btn-secondary" data-toggle="Work order" data-placement="received" title="Work order received">
            Tooltip on top
        </button>
        &nbsp;&nbsp;&nbsp; {/* Add non-breaking spaces */}
        <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Repairs applied">
            Tooltip on right
        </button>
        &nbsp;&nbsp;&nbsp; {/* Add non-breaking spaces */}
        <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="High risk asset">
            Tooltip on bottom
        </button>
        </div>


        <main>
            marginLeft
            <Search />
        </main>

    </div>
}

export default Home;