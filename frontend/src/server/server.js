import axios from "axios";

const url = 'http://127.0.0.1:5000'

const search = ( {props} ) => {
    axios.get(url + '/search', { props }).then((res) => {
        alert(JSON.stringify(res.data));  
    })
    .catch((err) => {
        console.log(err);
    });
};

const getAsset = ({ props }) => {
    axios.get(url + '/get-assests', { props }).then((res) => {
        alert(JSON.stringify(res.data));  
    })
    .catch((err) => {
        console.log(err);
    });

};

const getProjection = ( {assetid} ) => {
    //later
};




