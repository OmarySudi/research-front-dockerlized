<template>
  <div class="home">
   
   <div class="container-fluid">

     <Alert v-bind:alertData="alertData"/>
      
    <div class="modal fade" id="logiForm" tabindex="-1" role="dialog" aria-labelledby="logiFormLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div id="register">

            <div class="modal-header">
              <h5 class="modal-title" id="logiFormLabel">REGISTRATION FORM</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <v-form ref="registrationForm">
                <div class="row">

                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="first-name" class="col-form-label">First Name<span class="text-danger">  *</span></label>
                        <v-text-field 
                          outlined
                          v-model.trim="first_name" 
                          :error-count="5"
                          :error-messages="firstNameErrors" 
                          required
                          @input="$v.first_name.$touch()"
                          @blur="$v.first_name.$touch()"

                        >  

                        </v-text-field>
                        
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="last-name" class="col-form-label">Middle Name</label>
                      
                        <v-text-field 
                          outlined
                          v-model.trim="middle_name" 
                        >  

                        </v-text-field>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4 ">
                    <div class="form-group">
                      <label for="middle-name" class="col-form-label">Last Name <span class="text-danger">  *</span></label>
                      
                        <v-text-field 
                          outlined
                          v-model.trim="last_name" 
                          :error-messages="lastNameErrors" 
                          :error-count="5"
                          required
                          @input="$v.last_name.$touch()"
                          @blur="$v.last_name.$touch()"

                        >  

                        </v-text-field>

                    </div>
                  </div>

                </div>

                <div class="row">

                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="email" class="col-form-label">Email <span class="text-danger">  *</span></label>
              
                        <v-text-field 
                          outlined
                          v-model.trim="registration_email" 
                          :error-messages="registrationEmailErrors" 
                          :error-count="5"
                          required
                          @input="$v.registration_email.$touch()"
                          @blur="$v.registration_email.$touch()"

                        >  

                        </v-text-field>
                        
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="department" class="col-form-label">Department <span class="text-danger">  *</span></label>
                        
                        <v-text-field 
                          outlined
                          v-model.trim="department" 
                          :error-messages="departmentErrors" 
                          :error-count="5"
                          required
                          @input="$v.department.$touch()"
                          @blur="$v.department.$touch()"

                        >  

                        </v-text-field>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4 ">
                    <div class="form-group">
                      <label for="facult" class="col-form-label">Facult <span class="text-danger">  *</span></label>

                          <v-text-field 
                            outlined
                            v-model.trim="facult" 
                            :error-messages="facultErrors" 
                            :error-count="5"
                            required
                            @input="$v.facult.$touch()"
                            @blur="$v.facult.$touch()"

                          >  
                          </v-text-field>
                    </div>
                  </div>

                </div>

                

                <div class="col-xs-12 ml-4">
                      <div class="form-group">
                        <label for="areas" class="col-form-label">Areas of research <span class="text-danger">  *</span></label>
                        <!-- <input class="form-control" type="text"> -->
                        <v-select 
                          :items="areas_of_research"
                          multiple
                          v-model.trim="selected_areas"
                          :error-messages="selectedAreasErrors" 
                          :error-count="5"
                          required
                          @input="$v.selected_areas.$touch()"
                          @blur="$v.selected_areas.$touch()"
                        >

                        </v-select>
                      </div>
                  </div>

                <div class="row">
                  <div class="col-sm-12">
                    
                    <v-expansion-panels
                      :hover="true"
                      :flat="true"
                      class="elevation-0"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <p class="font-weight-regular  text-center body-1 pt-1">
                            Click to add other areas
                          </p> 
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <div class="row">
                            <div class="col-sm-12 col-md-4">
                              <label for="password" class="col-form-label">Area 1</label>
              
                              <v-text-field 
                                outlined
                                type="text"
                                v-model.trim="area_1" 
                              >  
                              </v-text-field>
                            </div>

                            <div class="col-sm-12 col-md-4">

                              <label for="password" class="col-form-label">Area 2</label>
              
                              <v-text-field 
                                outlined
                                type="text"
                                v-model.trim="area_2" 
                              >  
                              </v-text-field>

                            </div>
                            <div class="col-sm-12 col-md-4">
                              <label for="password" class="col-form-label">Area 3</label>
              
                              <v-text-field 
                                outlined
                                type="text"
                                v-model.trim="area_3" 
                              >  
                              </v-text-field>
                            </div>
                          </div>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <div class="row">

                    </div>

                  </div>
                </div>

                <div class="row">

                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
                      <label for="password" class="col-form-label">Mobile number <span class="text-danger">  *</span></label>
              
                        <v-text-field 
                          outlined
                          type="text"
                          v-model.trim="mobile_number" 
                          :error-messages="MobileNumberErrors" 
                          :error-count="5"
                          required
                          @input="$v.mobile_number.$touch()"
                          @blur="$v.mobile_number.$touch()"

                        >  

                        </v-text-field>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-4">
                    <div class="form-group">
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
                  </div>

                  <div class="col-sm-12 col-md-4">
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
                  </div>
                </div>

              </v-form>
              <div class="alert alert-danger" role="alert" v-show="display_registration_validation_error">
                You are required to fill all fields with <span class="text-danger">*</span> symbol
              </div>
              <div class="alert alert-danger" role="alert" v-show="display_registration_error">
                {{ registration_error }}
              </div>
            </div>
            <div class="modal-footer">
              <div class="row">
                <div class="col-sm-12">
                  
                  
                  <button type="button" class="btn btn-primary float-right ml-2" @click.prevent="register">REGISTER</button>
                  <button type="button" id="close-button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>
                </div>
              </div>
              
              
            </div>

          </div>
          
        </div>
      </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-8 h-100">

              <p><strong>What is RIMS</strong></p>

              <p>The UDSM RIMS is a web-based portal designed to manage research information at the University. The system has four modules, Grants &amp; Proposals, Publications Vetting, Research Clearance and Research Project Management. UDSM RIMS is developed under the leadership of the Office of the Deputy Vice Chancellor – Research.</p>

              <p>UDSM RIMS will help staff &amp; students to save time and effort making it easier to search for research information,apply for research clearances, registering research proposals, submission of publications for vetting and application for research grants.</p>

              <p><strong>How to Login</strong></p>

              <ol>
                <li>
                  <p><strong>Login</strong>&nbsp;with your "Username" and "Password". For the "Initial username", Use your surname as your initial username.<br>
                    E.g. if your first-name is Juma, and Surname is Samson, then the initial username is <em><strong>samson</strong></em>. Initial password is number 1 to 8, please change your password after first-time login.
                  </p>
                </li>
                <li>
                  <p>In case login credentials as specified in no. 1 failed, mostly due to identical surname(s), in this case the initial username try one of the following combinations</p>
                </li>
              </ol> 

              <ul>
                <li>
                  <p>firstname.surname&nbsp; &nbsp;(e.g: juma.samson)</p>
                </li>
                <li>
                  <p>f.surname&nbsp; &nbsp; (e.g: j.samson)</p>
                </li>
                <li>
                  <p>fsurname&nbsp; &nbsp; (jsamsom)</p>
                </li>
              </ul>
              
              <div class="mt-4"></div>

              <h5 class="text-uppercase">Open Calls</h5>

              <!-- <a href="https://rm.udsm.ac.tz/proposals" class="btn btn-outline-primary btn-sm">View all Calls</a> -->
              <v-btn
                class="ma-2 open-call"
                outlined
                color="indigo"
                to="/calls"
              >
              View all calls  
               </v-btn>

            </div>
            <!--./col-lg-8 -->


            <div class="col-md-4">
                <div class="card card-flat bg-light-grey">
                    <h6 class="card-header text-uppercase bg-light-grey">LOGIN</h6>
                    <div class="card-body">
                      <div>
                        <form id="login">
                            <div class="form-group mb-1">
                                  
                                  <v-text-field 
                                    placeholder="Email..."
                                    height="15"
                                    outlined
                                    prepend-inner-icon="mdi-email"
                                    v-model.trim="email" 
                                    :error-messages="emailErrors" 
                                    :error-count="5"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                                  >  
                                  </v-text-field>
                            </div>

                            <div class="form-group mt-1">
                              
                              <v-text-field 
                                placeholder="Password..."
                                outlined
                                type="password"
                                prepend-inner-icon="mdi-form-textbox-password"
                                v-model.trim="password" 
                                :error-messages="passwordErrors" 
                                :error-count="5"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                              >  
                              </v-text-field>
                                  
                            </div>

                            <button type="button" @click.prevent="login" style="width:100%" class="btn btn-primary">
                              LOGIN
                              <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
                              </button>
                        </form>

                        <!-- <div class="col-sm-12">
                      
                          <button type="button" @click.prevent="login" class="btn btn-primary">LOGIN</button>
                          <button type="button" class="btn btn-secondary float-right" id="close-modal" data-dismiss="modal">Close</button>
                        </div> -->
                        <div class="alert alert-danger mt-3" role="alert" v-if="display_login_validation_error">
                          You are required to fill all fields
                        </div>

                        <div class="alert alert-danger mt-2" role="alert" v-if="display_login_error">
                          {{ login_error }}
                        </div>

                    </div>


                      <div class="" style="margin-top:10px">
                        <a href="#" class="forgot-password" style="margin-top:10">
                            Forgot Your Password?
                        </a>
                      
                        <span></span><a href="#" data-toggle="modal" data-target="#logiForm">Register</a>
                      </div>
                        
                    </div>
                    <!--./card-body -->
                </div>
                <!--./card -->
            </div>
            <!--./col-md-4 -->
        </div>
        <!--./row -->
    </div>
   
   </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import {mapActions,mapGetters} from 'vuex'
import {required,email,minLength} from 'vuelidate/lib/validators'
import Mixin from '@/mixins/mixins.js'
import SystemService from '@/services/system.service'
import UserService from '@/services/user.service'
import Alert from '@/components/Alert.vue'

export default {
  
  name: 'Home',

  mixins: [Mixin],

  components: {Alert},

  validations:{
    email: {required,email},
    password: {required},

    first_name:{required},
    last_name:{required},
    mobile_number:{required},
    registration_email:{required,email},
    department:{required},
    facult:{required},
    selected_areas:[],
    registration_password:{required,minLength: minLength(8)},
    password_confirm:{required},
  },

  data: ()=>({

   //login information
    email:'',
    password:'',

    display_login_validation_error:false,
    display_login_error: false,
    login_error: '',

    showRegisterFrom: false,

     //registration information
    first_name:'',
    last_name:'',
    middle_name:'',
    registration_email:'',
    department:'',
    mobile_number:'',
    facult:'',
    selected_areas:[],
    areas_selected_by_user:'',
    registration_password:'',
    password_confirm:'',

    area_3:'',
    area_1:'',
    area_2:'',

    other_areas:[],
    areas_objects:[],

    areas_of_research:[],


    //
    display_registration_validation_error: false,
    display_registration_error: false,
    registration_error: '',

  }),
  methods:{

    ...mapActions(['Login']),

    login(){

        if((this.email !== '' && this.emailErrors.length == 0)
            && (this.password !== '' && this.passwordErrors.length == 0)
          )
        {
          
          let login_form = new FormData();

          login_form.append('email', this.email);
          login_form.append('password', this.password);

          this.Login(login_form).then(()=>{

            if(this.user !== null){

              // console.log('user set')
              this.clearLoginError();

             // document.getElementById('close-button').click();

          } 
          else 
          {
            if(this.loginError !== '')
            {
              this.login_error = this.loginError;
              this.display_login_error = true;

            } else 
            {

              this.clearLoginError();

              //document.getElementById('close-button').click();

              this.alertData.alert="There is a server problem.";
              this.alertData.alert_type = 'error';
              this.alertData.display_alert = true;
              
              setTimeout(()=>{
                this.alertData.display_alert = false;
              },3000);
            }

          }
          });

          

        }else {

          this.clearLoginError();

          this.display_login_validation_error = !this.display_login_validation_error;

          setTimeout(()=>{
            this.display_login_validation_error = !this.display_login_validation_error;
          },3000);

      }
         
    },

    clearLoginError(){

      this.login_error = '';
      this.display_login_error = false;
    },

    register(){

      this.other_areas = [];

      if((this.first_name !== '' && this.firstNameErrors.length == 0)
          && (this.last_name !== '' && this.lastNameErrors.length == 0)
          && (this.mobile_number !== '' && this.MobileNumberErrors.length == 0)
          && (this.registration_email !== '' && this.registrationEmailErrors.length == 0)
          && (this.department !== '' && this.departmentErrors.length == 0)
          && (this.selected_areas.length > 0 && this.selectedAreasErrors.length==0)
          && (this.facult !== '' && this.facultErrors.length == 0)
          && (this.registration_password !== '' && this.registrationPasswordErrors.length == 0)
          && (this.password_confirm !== '' && this.passwordConfirmErrors.length == 0)
          
        )
      {

        let registration_form = new FormData();

        registration_form.append('first_name', this.first_name);
        registration_form.append('last_name', this.last_name);
        registration_form.append('email', this.registration_email);
        registration_form.append('password', this.registration_password);
        registration_form.append('password_confirm', this.password_confirm);
        registration_form.append('faculty', this.facult);
        registration_form.append('department', this.department);
        registration_form.append('mobile_number', this.mobile_number);
        registration_form.append('research_system_admin_admin',0);

        if(this.area_1 !== '')
          // this.other_areas.push(this.area_1);
          registration_form.append('area_1',this.area_1);

        if(this.area_2 !== '')
          // this.other_areas.push(this.area_2);
          registration_form.append('area_2',this.area_2);

        if(this.area_3 !== '')
          // this.other_areas.push(this.area_3);
          registration_form.append('area_3',this.area_3);
        
        // if(this.other_areas.length > 0)
        // {
        //   registration_form.append('other_areas',this.other_areas);

        // }
          

        if(this.middle_name !== '')
          registration_form.append('middle_name', this.middle_name);
        
        if(this.research_system_admin_role !== '')
          registration_form.append('research_system_admin_role', this.research_system_admin_role);


    

        for(var i=0; i< this.selected_areas.length; i++)
        {
          let id = this.fetchId(this.selected_areas[i]);

          registration_form.append('areas_of_research['+ i +']',id);

          registration_form.append('areas_of_research_names['+ i +']',this.selected_areas[i]);

        }
          
        UserService.submit_registration_request(registration_form).then((response)=>{
          //console.log(response.data.message);
          if(response.data.genralErrorCode === 8000){

            this.showRegisterFrom = false;
            //this.showLoginForm = true;
            this.display_registration_error = false;


            document.getElementById('close-button').click();

            this.resetRegistrationForm();

            this.alertData.alert="You have successfully registered. Login to apply a call";
            this.alertData.alert_type = 'success';
            this.alertData.display_alert = true;
            
            setTimeout(()=>{
              this.alertData.display_alert = false;
            },3000);

          } else if(response.data.genralErrorCode === 8006){

              this.registration_error = response.data.message;
              this.display_registration_error = true;

          }
        }).catch(()=>{
              // console.log(this.$store.state.error_message);

              document.getElementById('close-button').click();

              this.alertData.alert=this.$store.state.error_message;
              this.alertData.alert_type = 'error';
              this.alertData.display_alert = true;
              
              setTimeout(()=>{
                this.alertData.display_alert = false;
              },3000);
        });

      }else {

          // alert("not validated")
          this.display_registration_validation_error = !this.display_registration_validation_error;

          setTimeout(()=>{
            this.display_registration_validation_error = !this.display_registration_validation_error;
          },3000);

      }
      
    },

    fetchAllAreas(){

       SystemService.fetchAllAreas().then((response)=>{
        
        this.areas_objects = response.data.objects;

        for(let i=0; i< response.data.objects.length; i++)
          this.areas_of_research.push(response.data.objects[i].name);

       });
      
    },

    resetRegistrationForm(){

      this.first_name = '',
      this.last_name = '',
      this.middle_name = '',
      this.registration_email = '',
      this.department = '',
      this.facult = '',
      this.selected_areas = [],
      this.registration_password = '',
      this.password_confirm = '',
      this.area_3 = '',
      this.area_1 = '',
      this.area_2 = '',
      this.other_areas = []

    },

    fetchId(name){

      let id;

      for(let i=0; i<this.areas_objects.length; i++)
      {
        if( name === this.areas_objects[i].name)
          {
            id = this.areas_objects[i].id;
            break;
          }
      }
        
     return id;

    },

    redirectHome(){

      this.$router.replace({
          name:'Home'
      });
    }
  
  },

  computed: {

     ...mapGetters(['authenticated','user','loginError',]),

     emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Must be valid e-mail');
        !this.$v.email.required && errors.push('E-mail is required');
        return errors;
        },

    passwordErrors() {

      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');
      return errors;
    },

    firstNameErrors() {
            const errors = [];
            if (!this.$v.first_name.$dirty) return errors;
            !this.$v.first_name.required && errors.push('First Name is required');
            return errors;
        },

    MobileNumberErrors() {
            const errors = [];
            if (!this.$v.mobile_number.$dirty) return errors;
            !this.$v.mobile_number.required && errors.push('Mobile number is required');
            return errors;
        },

    lastNameErrors() {
            const errors = [];
            if (!this.$v.last_name.$dirty) return errors;
            !this.$v.last_name.required && errors.push('Last Name is required');
            return errors;
        },

    registrationEmailErrors() {
            const errors = [];
            if (!this.$v.registration_email.$dirty) return errors;
            !this.$v.registration_email.email && errors.push('Must be valid e-mail');
            !this.$v.registration_email.required && errors.push('E-mail is required');
            return errors;
        },

    departmentErrors() {
            const errors = [];
            if (!this.$v.department.$dirty) return errors;
            !this.$v.department.required && errors.push('Department is required');
            return errors;
        },

    facultErrors() {
            const errors = [];
            if (!this.$v.facult.$dirty) return errors;
            !this.$v.facult.required && errors.push('Facult is required');
            return errors;
        },

    selectedAreasErrors() {
            const errors = [];
            if (!this.$v.selected_areas.$dirty) return errors;
            this.selected_areas.length === 0 && errors.push('Selected Areas are required');
            return errors;
        },

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

  created(){

    this.fetchAllAreas();
  }
}
</script>

<style scoped>

.open-call{
  text-decoration: none;
}

.btn-primary{
  background: #225dcd;
}

</style>
