import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { PieChart } from 'react-minimal-pie-chart';



const Home = () => {

    const manufacturers = [
        { title: 'Manufacturer 1', value: 10, color: '#FF0000' },
        { title: 'Manufacturer 2', value: 15, color: '#FFFF00' },
        { title: 'Manufacturer 3', value: 20, color: '#800080' },
        { title: 'Manufacturer 4', value: 12, color: '#FF5733' },
        { title: 'Manufacturer 5', value: 8, color: '#0099CC' },
    ];


    return <div className="container">
        <header className="bg-primary py-3">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="display-5">Flake</h1>
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
