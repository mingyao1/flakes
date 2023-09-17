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

    return (<div className="container">
        <div className="form-field">
            <input type="text" className="form-control" id="search-input" placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
        </div>

        <ul>
            {assets.map((data, index) => (
                <li key={index}>
                    <Asset
                        id={data.id}
                        mfr={data.mfr}
                        floor_no={data.floor_no}
                        asset_type={data.asset_type}
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
