import Vue from 'vue'
import Vuex from 'vuex'

// imported modules
import auth from './modules/auth';
import SystemService from '@/services/system.service'
import ApiService from '@/services/api'
import TokenService from '@/services/storage'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    snackbar:{
      showing: false,
      text:'',
      color:''
  },

  calls:[],

  areas: [],

  error_message:''

  },
  getters:{
    getSnackbar:(state) => state.snackbar,

    getCalls: (state) => state.calls,

    getAreas: (state) => state.areas,
  },

  mutations: {

    SET_SNACKBAR: (state,snackbar) => state.snackbar = snackbar,

    SET_ERROR_MESSAGE: (state,message) => state.error_message = message,

    SET_CALLS: (state,calls) => state.calls = calls,

    SET_AREAS: (state,areas) => state.areas = areas
  },

  actions: {

    setSnackbar({commit},snackbar){

      snackbar.showing = true;
      snackbar.color = snackbar.color || 'success';
      commit('SET_SNACKBAR',snackbar);
    },

    setErrorMessage({commit},message){
      commit('SET_ERROR_MESSAGE',message);
    },

    async setCalls({commit}){

      console.log("enterrrr systme call")

      await SystemService.fetchAllCalls().then((response)=>{

        commit('SET_CALLS',response.data.objects);

      }).catch();
      
    },

    async fetchAllAreas({commit}){

      await SystemService.fetchAllAreas().then((response)=>{

        if(response.data.genralErrorCode === 8000){

            commit('SET_AREAS',response.data.objects);
        }

      }).catch();
    },

    async logout(){

        this.$store.commit('LOGOUT_SUCCESS')
        TokenService.removeToken();
        ApiService.removeHeader()
        ApiService.unmount401Interceptor();

        this.$router.push('/').catch(()=>{});
        this.$router.go('/');

    },

  },
  modules: {
    auth
  }
})
