import axios from "axios";

const url = 'http://127.0.0.1:5000'

const search = ( {props} ) => {
    
    return axios.get(`${url}/search?query=${props}`)
    .then((res) => {
        console.log('Search API Response:', res.data); 
        return res.data;
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
};

const getAsset = ({ props }) => {
    return axios.get(`${url}/get-asset?id=${props}`)
    .then((res) => {
        alert(JSON.stringify(res.data));  
    })
    .catch((err) => {
        console.log(err);
    });

};

const getProjection = ( {assetid} ) => {
    //later
};

const api = {
    search,
    getAsset,
    getProjection
}

export default api;



