<template>
  <div class="home">
   
        <div class="page-heading">

            <div class="container">
                <div class="row">
                    <div class="page-title">
                        <h4>Reset Password</h4>
                        <ul>
                            <!-- <li><a href="https://rm.udsm.ac.tz" title="">Home</a></li> -->
                            <li><router-link to="/">Home</router-link></li>
                            <li><span>&#8725;</span></li>
                            <li>Reset Password</li>
                        </ul>
                    </div><!-- Page Title -->
                </div>
                <!--./row -->
            </div>
            <!--./container -->

        </div>


        <div class="container">

             <Alert v-bind:alertData="alertData"/>

            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-6 col-xs-12 col-lg-4">

                    <div class="card">
                        <h5 class="card-header text-center">Reset Password</h5>
                        <div class="card-body">
                            <div class="mb-3 text-center">
                                <!-- <h6 class="text-uppercase font-weight-700">Reset Password</h6> -->
                                <p class="text-center">Write email address to reset password</p>
                            </div>

                            
                            <form>
                                <!-- <input type="hidden" name="_token" value="5QVbAz52ck37FJdVmhjbHAl3piRRRbS9oSSOUjie">                                 -->
                                <div class="form-group">
                                    <label for="email">E-Mail Address</label>
                                    <input id="email" type="email" class="form-control " v-model="email" name="email" required="">

                                                                    </div>
                                <!--./form-group -->

                                <div class="form-group">
                                    <button class="btn btn-primary btn-block text-uppercase text-medium" @click.prevent="sendPasswordResetLink">
                                        Send Password Reset Link
                                    </button>
                                </div>
                                <!--./form-group -->

                                 <div class="alert alert-danger mt-3" role="alert" v-if="email_error">
                                    There is an error, please try again later
                                </div>

                                <div class="alert alert-success mt-2" role="alert" v-if="email_success">
                                    Email has been successfully sent
                                </div>

                            </form>
                        </div>
                        <!--./card-body -->
                    </div>
                    <!--./card -->
                </div>
                <!--./col-md-8 -->
            </div>
            <!--./row -->
        </div>
        <!--./container -->
    
        
  </div>
</template>

<script>

import ApiService from '@/services/api'
import Alert from '@/components/Alert.vue'
import Mixin from '@/mixins/mixins.js'

export default {
  
  name: 'PasswordReset',

  mixins: [Mixin],

  components: {Alert},

  data: ()=>({

    email:"",
    email_error: false,
    email_success: false,
    loading: true,
  }),

  methods:{

      sendPasswordResetLink(){
          
          ApiService.get("user/getuser/"+this.email).then((response)=>{

              if(response.data.genralErrorCode === 8000){

                    let data = new FormData();
                    data.append('email',this.email);
                    data.append('link',"http://localhost:8080/password/newpassword/"+this.email);
                    data.append('from',"kekovasudi@gmail.com")
                    
                    ApiService.post("http://localhost:8085/password/reset",data).then((response)=>{
                        
                        if(response.status == 200){

                            this.email="";

                            this.email_success = true;

                            setTimeout(()=>{
                                    this.email_success = false;
                                },4000);

                        }else{

                            this.email_error = true;

                            setTimeout(()=>{

                                    this.email_error = false;

                                },4000);
                        }
                    });

             } else if(response.data.genralErrorCode === 8004){

                        this.alertData.alert=response.data.message;
                        this.alertData.alert_type = 'error';
                        this.alertData.display_alert = true;
                    
                        setTimeout(()=>{
                            this.alertData.display_alert = false;
                        },3000);

            } 

          }).catch(()=>{

               this.alertData.alert=this.$store.state.error_message;
                this.alertData.alert_type = 'error';
                this.alertData.display_alert = true;
                
                setTimeout(()=>{
                    this.alertData.display_alert = false;
                },3000);
          });

         
      }
  },
  
}
</script>

<style scoped>
.btn-primary{
     background: #225dcd;
  }
</style>
