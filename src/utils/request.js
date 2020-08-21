import axios from "axios";
import {apiUrl } from './BaseUrlConfig'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = apiUrl;


const post = function (url, params, config) {
    let message;
    let code;
    if (!params) params = {};

    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(async res => {
                console.log(res);
                if (!(res.status && Number(res.status) === 200) || !res.data || (res.data.code && Number(res.data.code) !== 200)) {
                    message = res.message || (res.data && res.data.message);
                    code = res.data.code && Number(res.data.code);
                    reject(res);
                }
                resolve(res['data']['data']||res['data']||{})
            })
            .catch(async err => {
                console.log(err);

                reject(err)
            })
    })
};

const get = function (url, params) {
    console.log(url);
    return axios.get(url, {params}).catch(e => {
        console.error(e);
        return []
    })
};

const request = {
    post,
    get,
    success: 200,
}


export default request
