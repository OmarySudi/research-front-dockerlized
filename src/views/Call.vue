<template>
    <div class="container-fluid">

        <div class="modal fade" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="applyModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header" style="background-color: rgba(86,83,255,0.7)">
                    <h5 class="modal-title" id="applyModalLabel">Are sure you want to apply for this call?</h5>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
                    <button type="button" class="btn btn-primary" @click.prevent="sendApplication">YES</button>
                </div>
                </div>
            </div>
        </div>

        <div class="row">

                <div class="col-sm-12">
                    <center>
                        <div class="card" style="width:70%">
                            <h5 class="card-header text-center">Call #{{call.id}}</h5>
                            <div class="card-body pt-5">
                                
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tr><td class="font-weight-bold">Funder :</td><td>{{ call.name}}</td></tr>
                                            <tr><td class="font-weight-bold">Areas of research :</td><td>{{ call.areas_of_research}}</td></tr>
                                            <tr><td class="font-weight-bold">Budget :</td><td>{{ call.currency}} {{call.budget}}</td></tr>
                                            <tr><td class="font-weight-bold">Deadline :</td><td>{{call.deadline}}</td></tr>
                                            <tr><td class="font-weight-bold">Description :</td><td>{{ call.description}}</td></tr>
                                            
                                        </table>
                                    </div>
                                </div>
                                
                                <button class="mt-4 btn btn-primary pull-right" data-toggle="modal" data-target="#applyModal">APPLY</button>
                               
                            </div>
                        </div>
                     </center>
                </div>
        </div>
    </div>
</template>
<script>
import UserService from '@/services/user.service'
import Mixin from '@/mixins/mixins.js'
export default {

    name: 'Call',

    data: ()=>({

        call:[],

        mixins: [Mixin],
    }),

    methods:{

        sendApplication(){
            
        },

        fetchCall(id){

            UserService.view_call(id).then((response)=>{
                if(response.data.genralErrorCode === 8000){
                    
                    this.call = response.data.objects[0];
                }
                else {
                    
                    this.showErrorAlert("Record not found");
                }

            }).catch(

                this.showErrorAlert(this.$store.state.error_message)
            );
        }
    },

    created(){

        this.fetchCall(this.$route.params.id);
    }
}
</script>
<style lang="stylus" scoped>

</style>