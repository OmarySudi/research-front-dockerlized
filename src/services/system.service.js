import ApiService from '@/services/api'

const SysteService = {

    fetchAllAreas: ()=>{

        
        return ApiService.get("/areas/index");
    },

    fetchAllFunders: ()=>{

        return ApiService.get("/funders/index");
    },

    fetchAllAdmins: ()=>{

        return ApiService.get("/user/admins");
    },

    fetchFunderNames: ()=>{

        return ApiService.get("/funders/names");
    },

    fetchAllCalls: () => {
        return ApiService.get('/calls/index');
    },

    getCall: ($id) => {
        
        return ApiService.get("/calls/"+$id);
    },

    getCallInfo: ($id) => {
        
        return ApiService.get("/calls/getinfo/"+$id);
    },

    check_if_user_applied: (data)=>{

        return ApiService.post("/bids/check-user",data);
    },

    fetchBids: (id)=>{
        
        return ApiService.get("/bids/fetch-bids/"+id);
    }
}

export default SysteService;