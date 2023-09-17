import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Search from "./Search";
import { PieChart } from 'react-minimal-pie-chart';
import api from "./server/server";

const Home = () => {
    //let manufacturers = api.generateGraph(api.getAllAssets());
    const [manufacturers, setManufacturers] = useState([{ title: "Loading", value: 1, color: '#AAAAAA' }]);

    useEffect(() => {
        api.getAllAssets()
            .then((res) => {
                setManufacturers(api.generateGraph(res));
            })
            .catch((err) => {
                console.error(err);
            });
    }, []); // Empty dependency array ensures only one run

    return <div className="">
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


        <main className="container text-align-center">
            <Search />
            <div className="display">
                <PieChart
                    className="mt-2 display-element"
                    data={manufacturers}
                />
                <div className="mt-5 display-element">
                    {manufacturers.map((manufacturer, index) => (
                        <div key={`slice-${index}`} style={{ display: 'block' }}>
                            <div style={{
                                backgroundColor: manufacturer.color,
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                marginRight: '8px',
                                verticalAlign: 'middle'
                            }}></div>
                            <span>{manufacturer.title}: {manufacturer.value}</span>
                        </div>
                    ))}

                </div>
            </div>


        </main>

    </div>


}

export default Home;



