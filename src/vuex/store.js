import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'


Vue.use(Vuex);
let base_url = 'https://apiv2.golden.net.ua/v2'
// let base_url = 'https://mag.golden.net.ua/api/news-one-filter-list/p=1'
let token = {headers:{"X-Auth-Key":"a908bc1f-26ec-4b05-8717-3ba3108eb21d", "content-type":"application/json"}}

let store = new Vuex.Store({
    state: {
        Link: base_url,
        Token: token,
    },
    mutations: {}
    ,
    actions: {},
    getters: {
        APILINK(state) {
            return state.Link;
        },
        APITOKEN(state) {
            return state.Token;
        },
    }
});


export default store;


// var allOkSwitcher = new Vue({
//     router,
//     render: h => h(Switcher),
//     methods: {
//         setApiConfig: function (apiUrl, token) {
//             Vue.prototype.$ApiConfiguration = {
//                 baseUrl: apiUrl,
//                 token: token,
//             };
//             return this;
//         }
//     },
// });
//
//
// allOkSwitcher.setApiConfig("https://apiv2.golden.net.ua/v2", 'a908bc1f-26ec-4b05-8717-3ba3108eb21d');
// allOkSwitcher.$mount('#app');