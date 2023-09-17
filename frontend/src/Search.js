import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import api from "./server/server";

const Search = () => {
    const [query, setQuery] = useState('');
    const [assests, setAssets] = useState([])

    const handle = () => {
        console.log(query);

        api.search({ props: query })
            .then((res) => {
                setAssets(res.data); // Update the assets state with the search result
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (<div className="form-field">
        <input type="text" className="form-control" id="search-input" placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-primary" onClick={handle}>Search</button>
    </div>)
}

export default Search;