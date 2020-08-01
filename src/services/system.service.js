import ApiService from '@/services/api'

const SysteService = {

    fetchAllAreas: ()=>{

        
        return ApiService.get("/areas/index");
    },

    fetchAllFunders: ()=>{

        return ApiService.get("/funders/index");
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
}

export default SysteService;