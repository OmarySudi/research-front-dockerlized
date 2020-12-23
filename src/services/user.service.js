import ApiService from '@/services/api'

const UserService = {

    submit_registration_request: (registration_form)=>{

        
        return ApiService.post("/user/register",registration_form);
    },

    view_call: (id) => {

        return ApiService.get("/calls/getCall/"+id);
    },

    send_application: (data)=>{

        return ApiService.post("/bids/create",data);
    }
}

export default UserService;