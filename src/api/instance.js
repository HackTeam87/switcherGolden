import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://apiv2.golden.net.ua/v2',
    headers:{
        "X-Auth-Key": "a908bc1f-26ec-4b05-8717-3ba3108eb21d",
        accept: "application/json"
    }
})

export default instance