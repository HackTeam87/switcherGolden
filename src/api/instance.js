import axios from 'axios'

axios.get('http://service.golden.net.ua/users/get_token').then(resp => {

    console.log(resp.data);
});

const instance = axios.create({
    baseURL: 'https://apiv2.golden.net.ua/v2',
    headers: {
        "X-Auth-Key": "0cc5e994-47ce-47c8-af25-f8cd4006d90a",
        accept: "application/json"
    }
})

export default instance