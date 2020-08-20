const Mixin = {
    data: ()=>({

        alertData: {
            alert_type:'',
            alert:'',
            display_alert:false,
        },
    }),

    methods:{

        setAlert(alert,type){

            this.alertData.alert = alert;
            this.alertData.alert_type = type;
            this.alertData.display_alert = true;
        },

        unsetAlert(){
            this.alertData.alert = '';
            this.alertData.alert_type = '';
            this.alertData.display_alert = false;
        },

        showSuccessAlert(message){

            this.setAlert(message,'success');
                  
            setTimeout(()=>{
                this.unsetAlert();
                location.reload();

            },2000);
        },

        showErrorAlert(message){

            this.setAlert(message,'error');
                  
            setTimeout(()=>{
                this.unsetAlert();
            },3000);
        }
    },
}

export default Mixin