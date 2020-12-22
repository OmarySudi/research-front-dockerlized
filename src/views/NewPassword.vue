<template>
  <div class="home">
   
        <!-- <div class="page-heading">

            <div class="container">
                <div class="row">
                    <div class="page-title">
                        <h4>New Password</h4>
                        <ul>
                            <!-<li><a href="https://rm.udsm.ac.tz" title="">Home</a></li> -->
                            <!-- <li><router-link to="/">Home</router-link></li>
                            <li><span>&#8725;</span></li>
                            <li>New Password</li>
                        </ul>
                    </div>Page Title -->
                <!-- </div> -->
                <!--./row -->
            <!-- </div> --> 
            <!--./container -->

        <!-- </div> --> 


        <div class="container">

            <Alert v-bind:alertData="alertData"/>

            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-6 col-xs-12 col-lg-4">

                    <div class="card">
                        <h5 class="card-header text-center">Enter new Password</h5>
                        <div class="card-body">
                           

                            
                            <form>
                                <!-- <input type="hidden" name="_token" value="5QVbAz52ck37FJdVmhjbHAl3piRRRbS9oSSOUjie">                                 -->
                                <div class="form-group">
                                    <!-- <label for="email">Password</label>
                                    <input id="password" type="password" class="form-control " v-model="email" name="email" required=""> -->

                                    <label for="password" class="col-form-label">Password <span class="text-danger">  *</span></label>
              
                                    <v-text-field 
                                    outlined
                                    type="password"
                                    v-model.trim="registration_password" 
                                    :error-messages="registrationPasswordErrors" 
                                    :error-count="5"
                                    required
                                    @input="$v.registration_password.$touch()"
                                    @blur="$v.registration_password.$touch()"

                                    >  

                                    </v-text-field>

                                </div>

                                 <div class="form-group">
                                   <label for="confirm-password" class="col-form-label">Confirm Password<span class="text-danger">  *</span></label>
                  
                                    <v-text-field 
                                        outlined
                                        type="password"
                                        v-model.trim="password_confirm" 
                                        :error-messages="passwordConfirmErrors"
                                        :error-count="5" 
                                        required
                                        @input="$v.password_confirm.$touch()"
                                        @blur="$v.password_confirm.$touch()"

                                        >  

                                    </v-text-field>

                                </div>
                                <!--./form-group -->

                                <div class="form-group">
                                    <button class="btn btn-primary btn-block text-uppercase text-medium" @click.prevent="changePassword">
                                        Change password
                                    </button>
                                </div>
                                <!--./form-group -->

                                <div class="alert alert-danger" role="alert" v-show="display_registration_validation_error">
                                    You are required to fill all fields with <span class="text-danger">*</span> symbol
                                </div>

                                <div class="alert alert-danger" role="alert" v-show="display_registration_error">
                                    {{ registration_error }}
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
import {required,minLength} from 'vuelidate/lib/validators'
import Alert from '@/components/Alert.vue'
import Mixin from '@/mixins/mixins.js'

export default {
  
  name: 'newPassword',

  mixins: [Mixin],

  components: {Alert},

   validations:{
    registration_password:{required,minLength: minLength(8)},
    password_confirm:{required},
  },

  data: ()=>({

    email:"",
    registration_password:"",
    password_confirm:"",
    display_registration_validation_error: false,
    display_registration_error: false,
    registration_error: false,


  }),

  methods:{

      changePassword(){

        if(this.registration_password !== '' && this.password_confirm !=='')
        {
            if(this.registrationPasswordErrors.length == 0 && this.passwordConfirmErrors.length == 0){

                alert("change password");
                       
                let data = new FormData();

                data.append("email",this.email)
                data.append("password",this.registration_password);

                console.log("email to be sent is "+data.get("email"));
                console.log("password to be sent is "+data.get("password"))

                ApiService.post("/user/change-password",data).then((response)=>{
             
                  if(response.data.genralErrorCode === 8000){

                    
                    this.alertData.alert=response.data.message;
                    this.alertData.alert_type = 'success';
                    this.alertData.display_alert = true;
                    
                    setTimeout(()=>{
                        this.alertData.display_alert = false;
                        this.$router.push("/");
                    },3000);

                    } else if(response.data.genralErrorCode === 8003){

                        this.alertData.alert=response.data.message;
                        this.alertData.alert_type = 'error';
                        this.alertData.display_alert = true;
                    
                        setTimeout(()=>{
                            this.alertData.display_alert = false;
                        },3000);

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

            } else {

                this.registration_error = "Check your password inputs";

                this.display_registration_error = true;

                    setTimeout(()=>{

                        this.display_registration_error = false;

                    },3000);
            }

        }else {

            this.display_registration_validation_error = true;

            setTimeout(()=>{

                this.display_registration_validation_error = false;

            },3000);
        }
  },

  
  
},

computed:{
       registrationPasswordErrors() {
          
            const errors = [];
            if (!this.$v.registration_password.$dirty) return errors;
            !this.$v.registration_password.required && errors.push('Password is required');
            !this.$v.registration_password.minLength &&
                errors.push('Password must have 8+ characters');
            !/(?=.*[A-Z])/.test(this.registration_password) &&
                errors.push('Must have one uppercase character');
            !/(?=.*\d)/.test(this.registration_password) &&
                errors.push('Must have one number');
            // !/([!@$%])/.test(this.password) &&
            //     errors.push('Must have one special character [!@#$%]');
            return errors;
        },

    passwordConfirmErrors() {
            const errors = [];
            if (!this.$v.password_confirm.$dirty) return errors;
            !this.$v.password_confirm.required && errors.push('Password confirmation is required');
            this.password_confirm.localeCompare(this.registration_password) !== 0 && errors.push('Must match the original password')
            return errors;
        },
  },

     beforeRouteEnter(to, from, next){

        next(vm=>{
        
          vm.email = to.params.email
          console.log("email set is "+vm.email);
    });

    }

}
</script>

<style scoped>
.btn-primary{
     background: #225dcd;
  }
</style>
