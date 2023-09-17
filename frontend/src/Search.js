import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Asset from "./Asset.js";

import api from "./server/server";

const Search = () => {

    const [query, setQuery] = useState('');
    const [assets, setAssets] = useState([]);



    useEffect(() => {
        if (query) {
            api.search({ props: query })
                .then((res) => {
                    setAssets(res.slice(0, 8));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [query]);

    return (<div className="container mt-3">
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Search</span>
            </div>
            <input type="text" className="form-control" id="search-input" placeholder="Search Assets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            <button className="btn btn-primary" onClick={
                () => {setAssets([])}}>clear</button>
        </div>

        <ul className="list-group list-unstyled">
            {assets.map((data, index) => (
                <li ckey={index}>
                    <Asset
                        id={data.id}
                        mfr={data.mfr}
                        floor_no={data.floor_no}
                        asset_type={data.asset_name}
                        room_no={data.room_no}
                        install_date={data.install_date}
                        last_serviced_date={data.last_serviced_date}
                        repairs_ct={data.repairs_ct}
                        uptime={data.uptime}
                        work_orders_ct={data.work_orders_ct}
                    />
                </li>
            ))}
        </ul>

    </div>)
}

export default Search;
