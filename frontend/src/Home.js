import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { PieChart } from 'react-minimal-pie-chart';

const Home = () => {

    return <div className="bg-light p-3">
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
            <PieChart
                data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                ]}
            />
        </main>

    </div>
}

export default Home;
