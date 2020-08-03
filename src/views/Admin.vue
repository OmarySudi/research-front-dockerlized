<template>
    <div class="container-fluid">

        <Alert v-bind:alertData="alertData"/>

        <v-dialog v-model="callDialog" max-width="700px">
          <div class="card">

            <div class="card-header">
                <h5 class="text-center">Edit call</h5>
            </div>
        
          <div class="card-body">
              <v-form ref="form">
                  
                  <div class="row">
                      <div class="col-sm-12 col-md-4">
                          <div class="form-group">
                              <label for="inputEmail3">FUNDER<span class="text-danger">  *</span></label>
          
                              <v-select 
                                  :items="list_of_funders"
                                  outlined
                                  v-model.trim="editedCall.name" 
                                  required
                              >

                              </v-select>
                          </div>
                      </div>

                      <div class="col-sm-12 col-md-4">

                          <div class="form-group">
                              <label for="inputPassword3">MAX BUDGET<span class="text-danger">  *</span></label>
                              <v-text-field 
                                      
                                      type="text"
                                      outlined
                                      v-model.trim="editedCall.budget" 
                                      required
                                  >  

                                
                              </v-text-field>
                          </div>

                      </div>

                        <div class="col-sm-12 col-md-4">

                            <div class="form-group">
                              <label for="inputPassword3">DEADLINE<span class="text-danger">  *</span></label>
                              
                              
                              <v-text-field 
                                      
                                      type="text"
                                      outlined
                                      v-model.trim="editedCall.deadline" 
                                      @click="date_clicked = true"
                                      required
                                  >  

                              </v-text-field>

                              <v-date-picker 

                                  class="date_picker"
                                  outlined
                                  v-model.trim="editedCall.deadline"
                                  v-show="date_clicked"
                                  @change="date_clicked = false"
                                  :rules="[v => !!v || 'Date is required']"
                                  :min= time
                                  required
                                  full-width>
                              </v-date-picker>
                          </div>

                      </div>
                  </div>

                  
                  <div class="form-group">
                      <label for="inputPassword3" class="col-sm-4 col-form-label">AREAS<span class="text-danger">  *</span></label>
                      
                      
                      <v-select 
                          :items="areas_of_research"
                          multiple
                          v-model.trim="call.areas_of_research_names"
                          required
                      >

                      </v-select>
                      
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
                                  v-model.trim="editedCall.area_1" 
                                >  
                                </v-text-field>
                              </div>

                              <div class="col-sm-12 col-md-4">

                                <label for="password" class="col-form-label">Area 2</label>
              
                                <v-text-field 
                                  outlined
                                  type="text"
                                  v-model.trim="editedCall.area_2" 
                                >  
                                </v-text-field>

                              </div>
                              <div class="col-sm-12 col-md-4">
                                <label for="password" class="col-form-label">Area 3</label>
              
                                <v-text-field 
                                  outlined
                                  type="text"
                                  v-model.trim="editedCall.area_3" 
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

                  

                  <div class="form-group">
                      <label for="inputPassword3" class="col-sm-4 col-form-label">DESCRIPTION<span class="text-danger">  *</span></label>
                      
                      <v-textarea
                          
                          type="text"
                          outlined
                          rows="3"
                          auto-grow
                          v-model.trim="editedCall.description" 
                          required
                      >  

                      </v-textarea>
                  </div>

                  <button type="button" @click="editPost" class="btn btn-primary mt-3 float-right">SAVE</button>

              </v-form>

              <div class="alert alert-danger" role="alert" v-show="display_call_validation_error_during_editing">
                You are required to fill all fields with <span class="text-danger">*</span> symbol
              </div>
          </div>
            
          </div>
        </v-dialog>


        <v-dialog v-model="funderDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Funder</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedFunder.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedFunder.location" label="Address"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeFunderDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveFunderEditing">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteFunderDialog" max-width="500px">
         
          <v-card>
            <v-card-title style="background:rgba(120,140,177,0.6)">
              Are you sure you want to delete this record?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closedeleteFunderDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="confirmDeleteFunder">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="delete_area_dialog" max-width="500px">
         
          <v-card>
            <v-card-title style="background:rgba(120,140,177,0.6)">
              Are you sure you want to delete this record?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closedeleteAreaDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="confirmDeleteArea">Delete</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>

        <v-dialog v-model="deleteCallDialog" max-width="500px">
         
          <v-card>
            <v-card-title style="background:rgba(120,140,177,0.6)">
              Are you sure you want to delete this record?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteCallDialog = false ">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="confirmDeleteCall">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="row mt-3">

            <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 admin-sidebar">

                <div class="list-group" id="myList" role="tablist">
                    <!-- <a class="list-group-item list-group-item-action active" data-toggle="list" href="#home" role="tab">Home</a>-->
                    <a class="list-group-item list-group-item-action active" data-toggle="list" href="#clientCalls" role="tab">All Calls</a>
                    <a class="list-group-item list-group-item-action" @click="fetchAllFunders" data-toggle="list" href="#calls" role="tab">Post call</a>
                    <a class="list-group-item list-group-item-action" style="display: none" id="bidsButton" data-toggle="list" href="#bids" role="tab">Bids</a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#addFunder" role="tab">Add funder</a>
                    <a class="list-group-item list-group-item-action" @click="fetchAllFunders" data-toggle="list" href="#AllFunders" role="tab">All funders</a>
                    <a class="list-group-item list-group-item-action" @click="fetchAllAreas" data-toggle="list" href="#Areas" role="tab">Areas of research</a>
                    
                  </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 admin-main">
                <div class="tab-content">
                    <!-- <div class="tab-pane active" id="home" role="tabpanel">
                        Home
                    </div>-->
                    <div class="tab-pane show active" id="clientCalls" role="tabpanel">
                          <v-data-table
                              :headers="call_headers"
                              :items="getCalls"
                            >
                                <template v-slot:item.bids_count="{item}">
                                  <h5><span class="badge badge-info">{{item.bids_count}}</span></h5>
                                </template>

                                <template v-slot:item.actions="{ item }">
                                  <button 
                                    type="button" 
                                    @click.prevent="editCall(item)" 
                                    class="btn btn-sm btn-success mr-2">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                  </button>

                                  <button 
                                    type="button" 
                                    @click="deleteCall(item)" 
                                    class="btn  btn-sm btn-danger">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                  </button>

                                  <button 
                                    type="button" 
                                    @click="viewBids(item)" 
                                    class="btn btn-primary btn-sm ml-3">
                                    view bids
                                  </button>
                                  
                                </template>
                            </v-data-table>
                    </div>

                    <div class="tab-pane " id="AllFunders" role="tabpanel" style="width:85%">
                        
                      <div class="alert alert-primary" role="alert" v-show="display_no_funders_message">
                        {{ no_funders_message }}
                      </div>

                      <v-data-table
                        :headers="headers"
                        :items="funders"
                      >
                            <template v-slot:item.actions="{ item }">
                              <button 
                                type="button" 
                                @click.prevent="editFunder(item)" 
                                class="btn btn-sm btn-success mr-2">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                              </button>

                              <button 
                                type="button" 
                                @click="deleteFunder(item)" 
                                class="btn  btn-sm btn-danger">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                              
                            </template>
                      </v-data-table>


                    </div>

                    <div class="tab-pane " id="addFunder" role="tabpanel" style="width:85%">
                        
                        <div class="card">

                          <div class="card-header">
                             <h5 class="text-center">New funder</h5>
                          </div>
                      
                        <div class="card-body">
                           <v-form ref="add_funder_form">
                                
                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <div class="form-group">
                                            <label for="inputEmail3">NAME<span class="text-danger">  *</span></label>
                                            <!-- <div class="col-sm-8">
                                                <input type="text" class="form-control" id="inputEmail3">
                                            </div> -->
                                            <v-text-field 
                                                
                                                type="text"
                                                outlined
                                                v-model.trim="funder_name" 
                                                :error-messages="funderNameErrors"
                                                :error-count="3" 
                                                required
                                                @input="$v.funder_name.$touch()"
                                                @blur="$v.funder_name.$touch()"
                                            >  

                                            </v-text-field>
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-6">
                                        <div class="form-group">
                                            <label for="inputEmail3">ADDRESS<span class="text-danger">  *</span></label>
                                            <!-- <div class="col-sm-8">
                                                <input type="text" class="form-control" id="inputEmail3">
                                            </div> -->
                                            <v-text-field 
                                                
                                                type="text"
                                                outlined
                                                v-model.trim="funder_address" 
                                                :error-messages="funderAddressErrors"
                                                :error-count="3" 
                                                required
                                                @input="$v.funder_address.$touch()"
                                                @blur="$v.funder_address.$touch()"
                                            >  

                                            </v-text-field>
                                        </div>
                                    </div>
                                </div>
                                <button type="button"  @click="addFunder" class="btn btn-primary mt-3 float-right">ADD</button>
                            </v-form>
                            
                        </div>

                         <div class="alert alert-danger" role="alert" v-show="display_funder_registration_error">
                            You are required to fill all fields with <span class="text-danger">*</span> symbol
                          </div>
                        </div>
                    </div>

                    <div class="tab-pane ml-5" id="Areas" role="tabpanel" style="width:70%">
                         <v-data-table
                            :headers="area_headers"
                            :items="areas_objects"
                            sort-by="name"
                            class="elevation-1"
                          >
                            <template v-slot:top>
                              <v-toolbar flat color="white">
                                <v-toolbar-title>AREAS OF RESEACH</v-toolbar-title>
                                <v-divider
                                  class="mx-4"
                                  inset
                                  vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="area_dialog" persistent max-width="500px">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      class="mb-2"
                                      v-bind="attrs"
                                      v-on="on"
                                    >New Item</v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-title>
                                      <span class="text-center">{{ areaTitle }} </span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12">
                                            <span class="text-danger">*</span>
                                            <v-text-field v-model="area.name" label="Area name"></v-text-field>
                                          </v-col>
                                          <v-col cols="12">
                                            <v-text-field v-model="area.description" label="Description"></v-text-field>
                                          </v-col>

                                        </v-row>
                                        <div class="alert alert-danger" role="alert" v-show="display_area_validation_error">
                                          You are required to name field
                                        </div>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeAreaDialog">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text @click="saveArea">Save</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-toolbar>
                            </template>
                            <template v-slot:item.actions="{ item }">

                              <button 
                                type="button" 
                                @click.prevent="editArea(item)" 
                                class="btn btn-sm btn-success mr-2">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                              </button>

                              <button 
                                type="button" 
                                @click="deleteArea(item)" 
                                class="btn  btn-sm btn-danger">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </template>
                           
                          </v-data-table>
                    </div>

                    <div class="tab-pane " id="calls" role="tabpanel" style="width:85%">
                        <div class="card">

                          <div class="card-header">
                             <h5 class="text-center">New call</h5>
                          </div>
                      
                        <div class="card-body">
                           <v-form ref="form">
                                
                                <div class="row">
                                    <div class="col-sm-12 col-md-4">
                                        <div class="form-group">
                                            <label for="inputEmail3">FUNDER<span class="text-danger">  *</span></label>
                        
                                            <v-select 
                                                :items="list_of_funders"
                                                outlined
                                                v-model.trim="funder" 
                                                :error-messages="funderErrors"
                                                :error-count="3" 
                                                required
                                                @input="$v.funder.$touch()"
                                                @blur="$v.funder.$touch()"
                                            >

                                            </v-select>
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-4">

                                        <div class="form-group">
                                            <label for="inputPassword3">MAX BUDGET<span class="text-danger">  *</span></label>
                                            <v-text-field 
                                                    
                                                    type="text"
                                                    outlined
                                                    v-model.trim="budget" 
                                                    :error-messages="budgetErrors"
                                                    :error-count="3" 
                                                    required
                                                    @input="$v.budget.$touch()"
                                                    @blur="$v.budget.$touch()"
                                                >  

                                              
                                            </v-text-field>
                                        </div>

                                    </div>

                                     <div class="col-sm-12 col-md-4">

                                         <div class="form-group">
                                            <label for="inputPassword3">DEADLINE<span class="text-danger">  *</span></label>
                                            
                                            
                                            <v-text-field 
                                                    
                                                    type="text"
                                                    outlined
                                                    v-model.trim="deadline" 
                                                    :error-messages="deadlineErrors"
                                                    :error-count="5" 
                                                    @click="date_clicked = true"
                                                    required
                                                    @input="$v.deadline.$touch()"
                                                    @blur="$v.deadline.$touch()"
                                                >  

                                            </v-text-field>

                                            <v-date-picker 

                                                class="date_picker"
                                                outlined
                                                v-model.trim="deadline"
                                                v-show="date_clicked"
                                                @change="date_clicked = false"
                                                :rules="[v => !!v || 'Date is required']"
                                                :min= time
                                                required
                                                full-width>
                                            </v-date-picker>
                                        </div>

                                    </div>
                                </div>

                                
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-4 col-form-label">AREAS<span class="text-danger">  *</span></label>
                                    
                                    
                                    <v-select 
                                        :items="areas_of_research"
                                        multiple
                                        v-model.trim="areas"
                                        :error-messages="areasErrors" 
                                        :error-count="5"
                                        required
                                        @input="$v.areas.$touch()"
                                        @blur="$v.areas.$touch()"
                                    >

                                    </v-select>
                                   
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

                                

                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-4 col-form-label">DESCRIPTION<span class="text-danger">  *</span></label>
                                    
                                    <v-textarea
                                        
                                        type="text"
                                        outlined
                                        rows="3"
                                        auto-grow
                                        v-model.trim="description" 
                                        :error-messages="descriptionErrors"
                                        :error-count="5" 
                                        required
                                        @input="$v.description.$touch()"
                                        @blur="$v.description.$touch()"
                                    >  

                                    </v-textarea>
                                </div>

                                <button type="button" @click="savePost" class="btn btn-primary mt-3 float-right">POST</button>

                            </v-form>

                            <div class="alert alert-danger" role="alert" v-show="display_call_validation_error">
                              You are required to fill all fields with <span class="text-danger">*</span> symbol
                            </div>
                        </div>
                         
                        </div>
                    </div>

                    <div class="tab-pane" id="bids" role="tabpanel">

                      <div class="row">

                        <div class="table-responsive">

                          <p class="text-center font-weight-bold">CALL</p>
                          <table class="table table-bordered" style="background: white">
              
                            <thead>
                              <tr>
                                <th scope="col">FUNDER</th>
                                <th scope="col">AREAS OF RESEARCH</th>
                                <th scope="col">BUDGET</th>
                                <th scope="col">DEADLINE</th>
                                <th scope="col">BIDS</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{{this.viewedCall.name}}</td>
                                <td>{{ this.viewedCall.areas_of_research}}</td>
                                <td>{{this.viewedCall.currency}} {{this.viewedCall.budget}}</td>
                                <td>{{ this.viewedCall.deadline}}</td>
                                <td><h5><span class="badge badge-info">{{ this.viewedCall.bids_count}}</span></h5></td>
                               
                              </tr>
                            </tbody>
                          </table>

                          <p class="text-center font-weight-bold">BIDS</p>

                          <v-data-table
                            :headers="bids_headers"
                            :items="bids"
                          >
                                <template v-slot:item.actions="{ item }">

                                  <button 
                                    type="button" 
                                    @click.prevent="awardBid(item)" 
                                    class="btn btn-sm btn-primary mr-2">
                                    view
                                  </button>

                                  <button 
                                    type="button" 
                                    @click.prevent="awardBid(item)" 
                                    class="btn btn-sm btn-primary mr-2">
                                   award
                                  </button>

                                  <button 
                                    type="button" 
                                    @click.prevent="denyBid(item)" 
                                    class="btn btn-sm btn-primary btn-danger">
                                   Deny
                                  </button>
                                  
                                </template>
                          </v-data-table>
                          
                        </div>
                      </div>
                    </div>
                  </div>
            </div>

        </div>
      </div>

</template>
<script>

import {required} from 'vuelidate/lib/validators'
import AdminService from '@/services/admin.service'
import SystemService from '@/services/system.service'
import Alert from '@/components/Alert.vue'
import Mixin from '@/mixins/mixins.js'
import {mapActions,mapGetters} from 'vuex'

export default {
    name: 'Admin',

    components: {Alert},

    mixins: [Mixin],

    validations:{

    funder_name: {required},
    funder_address:{required},

    funder:{required},
    budget:{required},
    deadline:{required},
    areas:{required},
    description:{required},

  },

    data: ()=>({
        
        areas_of_research: [],
        areas_objects:[],

        //call form fields
        budget:'',
        funder:'',
        deadline:new Date().toISOString().substr(0, 10),
        time: new Date().toISOString().substr(0, 10),
        areas:[],
        description:'',

        area_3:'',
        area_1:'',
        area_2:'',
        other_areas:[],


        display_call_validation_error:false,

        display_call_validation_error_during_editing: false,
        //

        date_clicked: false,
       
        //funder form fields
        funder_name:'',
        funder_address:'',
        ////////////////////

        no_funders_message:'',
        display_no_funders_message:false,
        funderDialog: false,
        callDialog: false,
        deleteFunderDialog:false,

        deleteCallDialog: false,

        delete_area_dialog: false,

        headers:[
          {
            text: 'NAME',
            align: 'start',
            value: 'name',
            class: 'font-weight-bold text-body-1'
          },
          { text: 'ADDRESS', class: 'font-weight-bold text-body-1', value: 'location' },
          { text: 'ACTIONS', class: 'font-weight-bold text-body-1', value: 'actions', sortable: false },
        ],

        bids_headers:[
          {
            text: 'FIRST NAME',
            align: 'start',
            value: 'first_name',
            class: 'font-weight-bold text-body-1'
          },
          { text: 'LAST NAME', class: 'font-weight-bold text-body-1', value: 'last_name' },
          { text: 'EMAIL', class: 'font-weight-bold text-body-1', value: 'email' },
          { text: 'MOBILE NUMBER', class: 'font-weight-bold text-body-1', value: 'mobile_number'},
          // { text: 'DEPARTMENT', class: 'font-weight-bold text-body-1', value: 'department'},
          // { text: 'FACULTY', class: 'font-weight-bold text-body-1', value: 'faculty'},
          { text: 'ACTIONS', class: 'font-weight-bold text-body-1', value: 'actions', sortable: false },
        ],

        call_headers:[
          {
            text: 'FUNDER',
            align: 'start',
            value: 'name',
            class: 'font-weight-bold text-body-1'
          },
          { text: 'AREAS OF RESEACH', class: 'font-weight-bold text-body-1',value: 'areas_of_research',sortable: false },
          { text: 'BUDGET', value: 'budget', class: 'font-weight-bold text-body-1',sortable: false },
          { text: 'DEADLINE', value: 'deadline', class: 'font-weight-bold text-body-1',sortable: false },
          { text: 'BIDS', value: 'bids_count', class: 'font-weight-bold text-body-1',sortable: false },
          { text: 'ACTIONS', value: 'actions', class: 'font-weight-bold text-body-1',sortable: false },
        ],

        funders:[],
        list_of_funders:[],
        fundersMap:{},
        editedFunder:[],
        editedCall:{},
        viewedCall:{},
        call:{},

        bids:[],

        area_headers:[

          {
            text: 'NAME',
            align: 'start',
            value: 'name',
            class: 'font-weight-bold text-body-1'
          },

          { text: 'ACTIONS', class: 'font-weight-bold text-body-1',value: 'actions', sortable: false },
        ],

        area_dialog: false,

        area:{

          'id':'',
          'name':'',
          'description':''
        },

        default_area:{

          'id':'',
          'name':'',
          'description':''
        },

        //toggle variables
        display_funder_registration_error: false,

        display_area_validation_error: false,

    }),

    methods: {

      ...mapActions(['setCalls']),

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

    denyBid(){

    },
    awardBid(){

    },

    async fetchBids(id){

      await SystemService.fetchBids(id).then((response)=>{

        switch(response.data.genralErrorCode){

              case 8000:

                  // this.showSuccessAlert(response.data.message);
                  this.bids = response.data.objects;

                break;

              case 8001:

                  this.showErrorAlert(response.data.message);

                break;
            }
      }).catch(()=>{

          this.showErrorAlert(this.$store.state.error_message);
      });
    },

    fetchAllAreas(){

       SystemService.fetchAllAreas().then((response)=>{
        
        this.areas_objects = response.data.objects;

        for(let i=0; i< response.data.objects.length; i++)
          this.areas_of_research.push(response.data.objects[i].name);

       });
      
    },

    viewBids(item){

      this.viewedCall = item;

      this.fetchBids(item.id);

      document.getElementById('bidsButton').click();

    },
    
    async editPost(){
        if((this.editedCall.funder !== '')
            && (this.editedCall.budget !== '')
            && (this.editedCall.deadline !== '')
            && (this.call.areas_of_research_names.length > 0)
            && (this.editedCall.description !== '')  
          )
        {

          let call = new FormData();

          call.append('funder', this.editedCall.name);
          call.append('budget', this.editedCall.budget);
          call.append('deadline', this.editedCall.deadline);
          call.append('description', this.editedCall.description);
          call.append('status','open');
        
          if(this.editedCall.area_1 !== '')
            call.append('area_1',this.editedCall.area_1);

          if(this.editedCall.area_2 !== '')
            call.append('area_2',this.editedCall.area_2);

          if(this.editedCall.area_3 !== '')
            call.append('area_3',this.editedCall.area_3);
          
          for(var i=0; i< this.call.areas_of_research_names.length; i++)
          {
            
            let id = this.fetchId(this.call.areas_of_research_names[i]);

            call.append('areas_of_research['+ i +']',id);
            call.append('areas_of_research_names['+ i +']',this.call.areas_of_research_names[i]);
          }

          call.append('id',this.call.id);

          console.log("id is "+call.get('id'))

          await AdminService.updateCall(this.call.id,call).then((response)=>{

            switch(response.data.genralErrorCode){

              case 8000:

                  this.showSuccessAlert(response.data.message);

                break;

              case 8001:

                  this.showErrorAlert(response.data.message);

                break;

              case 8003:

                  this.showErrorAlert(response.data.message);

                break;
            }
          }).catch(()=>{

                this.showErrorAlert(this.$store.state.error_message);
          });
        }
        else {

          this.display_call_validation_error_during_editing = !this.display_call_validation_error_during_editing;

          setTimeout(()=>{
            this.display_call_validation_error_during_editing = !this.display_call_validation_error_during_editing;
          },3000);

        }
    },

      async savePost(){

        this.other_areas = [];

        if((this.funder !== '' && this.funderErrors.length == 0)
            && (this.budget !== '' && this.budgetErrors.length == 0)
            && (this.deadline !== '' && this.deadlineErrors.length == 0)
            && (this.areas.length > 0 && this.areasErrors.length == 0)
            && (this.description !== '' && this.descriptionErrors.length == 0)  
          )
        {

          let call = new FormData();

          call.append('funder', this.funder);
          call.append('budget', this.budget);
          call.append('deadline', this.deadline);
          call.append('description', this.description);
          call.append('status','open');
        
          if(this.area_1 !== '')
            call.append('area_1',this.area_1);

          if(this.area_2 !== '')
            call.append('area_2',this.area_2);

          if(this.area_3 !== '')
            call.append('area_3',this.area_3);
          
          for(var i=0; i< this.areas.length; i++)
          {
            let id = this.fetchId(this.areas[i]);

            call.append('areas_of_research['+ i +']',id);
            call.append('areas_of_research_names['+ i +']',this.areas[i]);
          }
            
          await AdminService.createCall(call).then((response)=>{

            switch(response.data.genralErrorCode){

              case 8000:
                  this.showSuccessAlert(response.data.message);
                break;

              case 8005:
                  this.showErrorAlert(response.data.message);
                break;
            }
          }).catch(()=>{

                this.showErrorAlert(this.$store.state.error_message);
          });

        }else {

            this.display_call_validation_error = !this.display_call_validation_error;

            setTimeout(()=>{
              this.display_call_validation_error = !this.display_call_validation_error;
            },3000);

        }

      },

      async addFunder(){

        if(this.funder_name !== '' && this.funder_address !== ''){

          this.display_funder_registration_error = false;

          let data = new FormData();
          data.append('name',this.funder_name);
          data.append('address',this.funder_address);

          await AdminService.add_funder(data).then((response)=>{

            switch(response.data.genralErrorCode)
            {
              case 8000:

                  this.showSuccessAlert(response.data.message);

                break;

              case 8005:

                  this.showErrorAlert(response.data.message);

                break;

              case 8007:

                  this.showErrorAlert(response.data.message);

                break;
            }
          }).catch(()=>{

              this.showErrorAlert(this.$store.state.error_message);

          });
        } else {

            this.display_funder_registration_error = true;

            setTimeout(()=>{
              this.display_funder_registration_error = false;
            },3000);

        }
        
      },

      editFunder(item)
      {
        this.editedFunder = item;

        this.funderDialog = true;

      },

      editCall(item){

        this.editedCall = item;

        this.getCallInfo(item.id);

        this.callDialog = true;
      },


      async getCall($id){

        await SystemService.getCall($id).then((response)=>{

          this.call = response.data.objects;

          console.log("call is "+this.call.areas_of_research_names);

        }).catch(()=>{

        });

      },

      async getCallInfo($id){

        await SystemService.getCallInfo($id).then((response)=>{

          this.call = response.data.objects;

        }).catch(()=>{

        });

      },

      deleteFunder(item)
      {
        this.editedFunder = item;

        this.deleteFunderDialog = true;
      },

      deleteCall(item){
        this.editedCall = item;
        this.deleteCallDialog = true;
      },

      async fetchFunderNames(){

          await SystemService.fetchFunderNames();
      },

      async fetchAllFunders(){
        await SystemService.fetchAllFunders().then((response)=>{

          if(response.data.genralErrorCode === 8000){

              if(response.data.objects.length > 0)
              {
                
                this.display_no_funders_message = false;
                this.funders = response.data.objects;

                for(let i=0; i< this.funders.length; i++){
                  this.list_of_funders.push(this.funders[i].name);
                }

              }
              else {

                this.no_funders_message = "No funders found";
                this.display_no_funders_message = true;
              }
          }

        }).catch(()=>{

          this.setAlert(this.$store.state.error_message,'error');
              
          setTimeout(()=>{
            this.unsetAlert();
          },4000);

        });
      },

      closedeleteAreaDialog()
      {
          this.delete_area_dialog = false;
      },

      async confirmDeleteArea()
      {
        await AdminService.deleteArea(this.area).then((response)=>{

          switch(response.data.genralErrorCode){
              case 8000:

                this.delete_area_dialog = false;

                this.showSuccessAlert(response.data.message);

                break;

              case 8002:

                this.delete_area_dialog = false;

                this.showErrorAlert(response.data.message);

                break;
            }
        }).catch(()=>{
            this.setAlert(this.$store.state.error_message,'error');
              
            setTimeout(()=>{
              this.unsetAlert();
            },4000);
        });
      },

      closeFunderDialog(){

        this.funderDialog = false;
      },

      closedeleteFunderDialog(){

        this.deleteFunderDialog = false;
      },

      async confirmDeleteCall(){

        await AdminService.deleteCall(this.editedCall.id).then((response)=>{

            switch(response.data.genralErrorCode){
              case 8000:

                this.deleteCallDialog = false;

                this.showSuccessAlert(response.data.message);

                break;

              case 8002:

                this.deleteCallDialog = false;

                this.showErrorAlert(response.data.message);

                break;
            }

          }).catch(()=>{

              this.showErrorAlert(this.$store.state.error_message);
          });
      },

      async confirmDeleteFunder(){

        let data = new FormData();
        data.append('id',this.editedFunder.id)
        data.append('name',this.editedFunder.name);
        data.append('address',this.editedFunder.location);

        await AdminService.deleteFunder(data).then((response)=>{

            switch(response.data.genralErrorCode){
              case 8000:

                this.deleteFunderDialog = false;

                this.showSuccessAlert(response.data.message);

                break;

              case 8002:

                this.deleteFunderDialog = false;

                this.showErrorAlert(response.data.message);

                break;
            }

          }).catch(()=>{

              this.showErrorAlert(this.$store.state.error_message);
          });
      },

      async saveFunderEditing(){
        
          let data = new FormData();
          data.append('id',this.editedFunder.id)
          data.append('name',this.editedFunder.name);
          data.append('address',this.editedFunder.location);

          // let data = {
          //   id: this.editedFunder.id,
          //   name: this.editedFunder.name,
          //   address: this.editedFunder.location
          // }

          await AdminService.updateFunder(data).then((response)=>{

            switch(response.data.genralErrorCode){
              case 8003:

                this.showErrorAlert(response.data.message);

                break;
              case 8007:

                this.showErrorAlert(response.data.message);

                break;
              case 8000:

                this.showSuccessAlert(response.data.message);

                break;
            }

          }).catch(()=>{

              this.showErrorAlert(this.$store.state.error_message);
          });
      },

      initializeFunderHashMap(){

       //const fundersMap = Object.assign({}, ...this.funders.map(s => ({[s.name]: s.id})));

       console.log(this.funders);
        
      },

      editArea(item){

       this.area = Object.assign({}, item)

       this.area_dialog = true;

      },

      deleteArea(item){

        this.area = Object.assign({}, item);

        this.delete_area_dialog = true;
      },

      closeAreaDialog(){

        this.area_dialog = false;

        this.area = Object.assign({}, this.default_area)

      },

       async saveArea(){

        if(this.area.id === '')
        {

           if(this.area.name === '')
          {

            this.display_area_validation_error = !this.display_area_validation_error;

            setTimeout(()=>{
              this.display_area_validation_error = !this.display_area_validation_error;
            },3000);

          } 

          else 
          {
            
            let data = new FormData();

            data.append('name',this.area.name);

            if(this.area.description !== '')
              data.append('description',this.area.description);

            await AdminService.createArea(data).then((response)=>{

              switch(response.data.genralErrorCode)
              {
                case 8000:

                   this.showSuccessAlert(response.data.message);

                  break;

                case 8005:

                    this.showErrorAlert(response.data.message);

                  break;

              }

            }).catch(()=>{

              this.showErrorAlert(this.$store.state.error_message);

            });
          }
           

        } else {

          if(this.area.name === '')
          {

            this.display_area_validation_error = !this.display_area_validation_error;

            setTimeout(()=>{
              this.display_area_validation_error = !this.display_area_validation_error;
            },3000);

          } 

          else 
          {
            
            let data = new FormData();

            data.append('name',this.area.name)
            data.append('id',this.area.id)

            if(this.area.description !== '')
              data.append('description',this.area.description);

            console.log("Descprition .........." + this.area.description);

            await AdminService.updateArea(data).then((response)=>{

              switch(response.data.genralErrorCode)
              {
                case 8000:

                   this.showSuccessAlert(response.data.message);

                  break;

                case 8003:

                    this.showErrorAlert(response.data.message);

                  break;

                case 8001: 

                    this.showErrorAlert(response.data.message);

                  break;

              }

            }).catch(()=>{

              this.showErrorAlert(this.$store.state.error_message);

            });
          }
         
        }
       
      },
      
    },

    

    created(){

      this.fetchAllFunders();
      this.fetchAllAreas();
      this.setCalls();

    },

    computed:{
      
      ...mapGetters(['getCalls','getAreas']),

      areaTitle () {
        return this.area.id === '' ? 'New Area' : 'Edit Area'
      },

      funderNameErrors() {
              const errors = [];
              if (!this.$v.funder_name.$dirty) return errors;
              !this.$v.funder_name.required && errors.push('Name is required');
              return errors;
          },

      funderAddressErrors() {
              const errors = [];
              if (!this.$v.funder_address.$dirty) return errors;
              !this.$v.funder_address.required && errors.push('Address is required');
              return errors;
          },

      funderErrors() {

        const errors = [];
        if (!this.$v.funder.$dirty) return errors;
        !this.$v.funder.required && errors.push('Funder is required');
        return errors;
      },

      budgetErrors() {

        const errors = [];
        if (!this.$v.budget.$dirty) return errors;
        !this.$v.budget.required && errors.push('Budget is required');
        return errors;
      },

      deadlineErrors() {
        const errors = [];
        if (!this.$v.deadline.$dirty) return errors;
        !this.$v.deadline.required && errors.push('Deadline is required');
        return errors;
      },

      areasErrors() {
        const errors = [];
        if (!this.$v.areas.$dirty) return errors;
        !this.$v.areas.required && errors.push('Areas required');
        return errors;
      },

      descriptionErrors(){

        const errors = [];
        if (!this.$v.description.$dirty) return errors;
        !this.$v.description.required && errors.push('Description required');
        return errors;

      },
    }
}
</script>

<style scoped>

 .date_picker{

    position: absolute;
    top: 0;
    left: 0;

    z-index: 9;

 }

</style>