import ApiService from '@/services/api'

const AdminService = {

    add_funder: (data)=>{

        
        return ApiService.post("/funders/add-funder",data);
    },

    updateFunder: (data)=>{

        return ApiService.post("/funders/update",data);
    },

    deleteFunder: (data) => {
        return ApiService.post("/funders/delete",data);
    },

    createCall: (data) => {
        return ApiService.post("/calls/create",data);
    }, 

    updateCall: (id,data) => {

        return ApiService.post('/calls/update/'+id,data);
    },

    deleteCall: (id) => {

        return ApiService.post('/calls/delete/'+id);
    },

    createArea: (data) => {

        return ApiService.post('/areas/create',data);
    },

    updateArea: (data) => {

        return ApiService.post('/areas/update',data);
    },

    deleteArea: (data) => {

        return ApiService.post('/areas/delete',data);
    },

    awardBid: (data) => {

        return ApiService.post('/bids/award',data);
    },

    cancelAward: (data) => {

        return ApiService.post('/bids/cancel',data);
    },
}

export default AdminService;