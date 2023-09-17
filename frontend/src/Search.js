import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import api from "./server/server";

const Search = () => {

    const [query, setQuery] = useState('');
    const [assets, setAssets] = useState([]);

    
    
    useEffect(() => {
        if (query) {
            api.search({ props: query })
                .then((res) => {
                    console.log(res.data);
                    setAssets(res.data);
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
            {assets.map((asset, index) => (
                <li key={index}>{asset.id}</li>
            ))}
        </ul>

    </div>)
}

export default Search;