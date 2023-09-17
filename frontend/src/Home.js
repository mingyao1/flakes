import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { PieChart } from 'react-minimal-pie-chart';

const manufacturers = [
    { title: 'Manufacturer 1', value: 10, color: '#FF0000' },
    { title: 'Manufacturer 2', value: 15, color: '#FFFF00' },
    { title: 'Manufacturer 3', value: 20, color: '#800080' },
    { title: 'Manufacturer 4', value: 12, color: '#FF5733' },
    { title: 'Manufacturer 5', value: 8, color: '#0099CC' },
  ];

const Home = () => {

    return <div className="bg-light p-3">
        <header style={{ display: 'flex', alignItems: 'left' }}> 
            <span style={{ color: 'green', alignItems: 'left' }}>Flake </span>
            <nav className="nav" style={{ alignItems: 'left' }}>
                <ul style={{ display: 'flex', alignItems: 'left', listStyleType: 'none', padding: 0 }}>
                    <li style={{ alignItems: 'left' }}>
                    <Link to='/' className="nav-link">Home</Link>
                    </li>
                    <li>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <Search />
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            {manufacturers.map((manufacturer, index) => (
            <div key={`slice-${index}`}>
            <div style={{ backgroundColor: manufacturer.color, width: '20px', height: '20px', marginRight: '8px' }}></div>
            {manufacturer.title}
            </div>
            ))}

            </div>
            <PieChart
                style={{ width: '50%' }}
                data={[
                    { title: 'Manufacturer 1', value: 10, color: '#FF0000' },
                    { title: 'Manufacturer 2', value: 15, color: '#FFFF00' },
                    { title: 'Manufacturer 3', value: 20, color: '#800080' },
                    { title: 'Manufacturer 4', value: 12, color: '#FF5733' },
                    { title: 'Manufacturer 5', value: 8, color: '#0099CC' },
                ]}
            
            />
        </main>

    </div>
}

export default Home;
