<template>
  <div name="Unsubscribe">

    <Alert v-bind:alertData="alertData"/>

    <v-dialog
        v-model="subscribe"
        max-width="420"
    >
        <v-card>
        
            <v-card-title class="title primary--text">Are you sure you want to unsubscribe?</v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                color="green darken-1"
                text
                @click="redirectHome()"
                >
                No
                </v-btn>

                <v-btn
                color="error darken-1"
                text
                @click="unsubcribeUser()"
                >
                Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import ApiService from '@/services/api'
import Alert from '@/components/Alert.vue'
import Mixin from '@/mixins/mixins.js'

export default {

    name:'Unsubscribe',

    mixins: [Mixin],

    components: {Alert},

    data(){
        return {
     
            userID:"",
            subscribe:true,
        }
    },

    methods:{

        unsubcribeUser(){

            ApiService.post("user/unsubscribe/"+this.userID).then((response)=>{

            if(response.data.genralErrorCode === 8000){

        
                this.subscribe = false;

                this.alertData.alert="You have successfully unsubscribe";
                this.alertData.alert_type = 'success';
                this.alertData.display_alert = true;
            
                setTimeout(()=>{
                    this.alertData.display_alert = false;

                    this.redirectHome();
                },3000);
                  

             } else {

                this.subscribe = false;

                this.alertData.alert="There is an error,please try again later";
                this.alertData.alert_type = 'error';
                this.alertData.display_alert = true;
            
                setTimeout(()=>{
                    this.alertData.display_alert = false;

                    this.redirectHome();
                },3000);
            } 

          }).catch(()=>{

             this.subscribe = false;

            this.alertData.alert="There is an error,please try again later";
            this.alertData.alert_type = 'error';
            this.alertData.display_alert = true;
        
            setTimeout(()=>{
                this.alertData.display_alert = false;

                this.redirectHome();
            },3000);
          });
        },

        redirectHome(){
            this.$router.replace({
                name:'Home'
            });
        }
    },

     beforeRouteEnter(to, from, next){

        next(vm=>{

          vm.userID = to.params.userID;

        });
    }

}
</script>

<style>

</style>