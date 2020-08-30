import axios from 'axios'

const Mixin = {
    data: ()=>({

        alertData: {
            alert_type:'',
            alert:'',
            display_alert:false,
        },
    }),

    methods:{

        getFileName(url){

            let position = url.lastIndexOf('/');

            let extracted_string = url.slice(position + 1, url.length + 1);

            return extracted_string;
        },

         getFileExtension(url){

        let position = url.lastIndexOf('.');

        let extracted_string = url.slice(position + 1, url.length + 1);

        return extracted_string;

      },

        downloadFile(file_url){

                let data = { url: file_url};

                axios.post('calls/file/download',data,{responseType: 'arraybuffer'}).then((response)=>{

                let filename = this.getFileName(file_url);

                let extension = this.getFileExtension(file_url);

                if(extension === 'pdf'){
                    
                    let blob=new Blob([response.data], { type: 'application/pdf' });
                    let link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=filename;
                    link.click();
                }
                else if(extension === 'doc'){

                    let blob=new Blob([response.data], { type: 'application/msword' }); 
                    let link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=filename;
                    link.click();
                }
                else if(extension === 'docx'){

                    let blob=new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}); 
                    let link=document.createElement('a');
                    link.href=window.URL.createObjectURL(blob);
                    link.download=filename;
                    link.click();
                }

                }).catch(()=>{
                    console.log("error has been occured");
                });
            },

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