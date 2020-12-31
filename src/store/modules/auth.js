
import ApiService from '@/services/api'
import store from '@/store'
import router from '@/router'

// import {TokenService} from '@/services/storage'
// import router from '@/router'

// import {UserService} from '@/services/storage'

// class AuthenticationError extends Error {

//     constructor(errorCode, message){
//         super(message);
//         this.name = this.constructor.name
//         this.message = message
//         this.errorCode = errorCode
        
//     }
// }

export default {

    state: {
        access_token: null,

        user: null,

        login_error:'',
    },

    getters:{

        user: (state) => state.user,

        token: (state)=>state.access_token,

        authenticated: (state)=>{
            return (state.access_token !== null && state.user !==null) ? true: false
        },

        loginError: (state)=> state.login_error,
    },

    mutations: {

        SET_TOKEN(state, token){

            state.access_token = token;
        },

        SET_USER(state,user){
            state.user = user;
        },

        LOGOUT_SUCCESS(state) {
            state.access_token = null,
            state.user = null;    
        },

        SET_LOGIN_ERROR: (state,error_message)=>state.login_error = error_message

    },

    actions: {

        setLoginError({commit},error_message){
            commit('SET_LOGIN_ERROR',error_message);
        },

        async Login(_,credentials){

            await ApiService.post('/user/login',credentials).then((response)=>{

                switch(response.data.genralErrorCode){

                    case 8000:

                        store.commit('SET_LOGIN_ERROR','');

                        return store.dispatch('attempt',response.data.objects.original.access_token);

                    case 8004:

                        if(response.data.errorCount > 0)
                        {
                            var message = response.data.message.concat(response.data.errors[0]);

                            console.log(message)
                            store.commit('SET_LOGIN_ERROR',message);
                        }

                        break;
                    default:
                       
                        break;
                }

            }).catch(()=>{

                //print authentican error
            });
            
        },

        async attempt({commit}, token){

            if(token)
                commit('SET_TOKEN',token);

            if(!store.getters.token)
              return;
              
            await ApiService.get('/user/me')
                .then((response) => {
                    
                    switch(response.data.genralErrorCode){

                        case 8000:

                            commit('SET_USER',response.data.objects.original);

                            // console.log("firstName is "+store.state.user.first_name);
                            // console.log("check admin is "+store.state.user.research_system_admin_admin);
                            // router.replace({
                            //     name:'Home'
                            // });

                            if(store.getters.user.research_system_admin_role == "ROLE_admin")
                            {
                                router.replace({
                                    name:'Admin'
                                });
                            }
                            else {
                                router.replace({
                                    name:'calls'
                                });
                            }
                                
                            break;
    
                        case 8004:
    
                            break;
                    }
                })
                .catch(()=>{

                    commit('SET_TOKEN',null);
                    commit('SET_USER',null);
                });
            
        },
    },
}