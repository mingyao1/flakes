import axios from "axios";
import chroma from 'chroma-js';

const url = 'http://127.0.0.1:5000'

const search = ({ props }) => {

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
    return axios.get(`${url}/get-assets?id=${props}`)
        .then((res) => {
            console.log('API Response:', res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });

};

const getAllAssets = () => {
    return axios.get(`${url}/get-assets`)
        .then((res) => {
            console.log('API Response:', res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });

};

const getProjection = (days, id) => {
    const queryParams = {
        'days_in_future': days,
        'id': id
    }

    return axios.get(url + '/get-asset-predictions', { params: queryParams })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err);
        })
};

const generateGraph = (data) => {
    const counts = {};

    // Count occurrences of unique 'mfr' values
    for (let i = 0; i < data.length; i++) {
        const value = data[i].mfr;
        counts[value] = (counts[value] || 0) + 1;
    }

    // Convert counts to an array of objects
    const result = Object.keys(counts)
        .map((key) => ({ title: 'Manufacturer ' + key, value: counts[key], }))
        .sort((a, b) => b.value - a.value);

    const colorScale = chroma.scale(['#F08080', '#F0F080', '#80F080'])
                             .colors(result.length)
    for (let i = 0; i < colorScale.length; i++) {
        result[i].color = colorScale[i];
    }
    if (result.length === 0) {
        result.push({ title: "No data", value: 1, color: '#AAAAAA'})
    }
    return result;
}

const api = {
    search,
    getAsset,
    getAllAssets,
    getProjection,
    generateGraph
}

export default api;



