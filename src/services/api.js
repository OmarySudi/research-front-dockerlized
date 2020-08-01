import axios from 'axios'
import store from '@/store'
import TokenService from '../services/storage'
import router from '@/router'


const ApiService = {

    
    _401interceptor: null,

    init(baseURL){

        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
   customRequest(data) {
       
        return axios(data)
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {

                return response
            },
            async (error) => {

                if(error.request.status === 401){

                    console.log("interrupt")
                    
                    store.commit('LOGOUT_SUCCESS')
                    TokenService.removeToken();
                    ApiService.removeHeader()
                    ApiService.unmount401Interceptor();

                    router.push('/').catch(()=>{});
                   
                    throw error;
                } 
                else {

                    let status = error.request.status.toString().charAt(0);

                    switch(status){

                        case '4':

                            console.log('Client Error');

                            store.dispatch('setErrorMessage',"There is a client error please try again letter")

                            break;

                        case '5':

                            // console.log('Server Error');

                            store.dispatch('setErrorMessage',"There is a Server error please try again letter")

                            break;
                    }
                }

                // If error was not 401 just reject as is

                throw error
            }
        )
    },

    unmount401Interceptor() {

        // Eject the interceptor
        axios.interceptors.response.eject(this._401interceptor)
    }

}

export default ApiService
