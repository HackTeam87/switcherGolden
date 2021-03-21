import axios from 'axios'


function GetToken() {
    const config = {
        method: 'get',
        url: 'http://service.golden.net.ua/users/get_token',
        headers: {
            accept: "application/json"
        }
    }

    let token = axios(config)
    console.log(token.data);
    console.log(token.status);
    return token.data
}

GetToken()

const instance = axios.create({
    baseURL: 'https://apiv2.golden.net.ua/v2',
    headers: {
        "X-Auth-Key": "0cc5e994-47ce-47c8-af25-f8cd4006d90a",
        accept: "application/json"
    }
})

export default instance