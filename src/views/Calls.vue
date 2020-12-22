<template>
  <div class="home">
   
   <div class="container-fluid">
      
     <div v-if="!authenticated">
      <center>
        <span class="text-danger font-weight-bold">Login to apply for a call</span>
      </center>
     </div>
   
    <v-data-table
      :headers="call_headers"
      class="mt-5"
      :items="getCalls"
    >

        <!-- <template v-slot:item.budget="{ item }">
            {{item.currency}} {{ item.budget}}
        </template> -->

        <template v-slot:item.actions="{ item }">

          <v-btn
            @click.prevent="viewDetail(item)" 
            small
            :disabled="!authenticated"
            color="primary"
          >
            VIEW DETAILS
          </v-btn>
        </template>
    </v-data-table>
   </div>
    

  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

// @ is an alias to /src

export default {
  
  name: 'Home',

  data: ()=>({

    call_headers:[
      {
        text: 'FUNDER',
        align: 'start',
        value: 'name',
        class: 'font-weight-bold text-body-1'
      },
      { text: 'AREAS OF RESEACH', class: 'font-weight-bold text-body-1',value: 'areas_of_research',sortable: false },
      // { text: 'BUDGET', value: 'budget', class: 'font-weight-bold text-body-1',sortable: false },
      { text: 'DEADLINE', value: 'deadline', class: 'font-weight-bold text-body-1',sortable: false },
      { text: 'ACTIONS', value: 'actions', class: 'font-weight-bold text-body-1',sortable: false },
    ],

  }),
  methods:{
    ...mapActions(['setCalls']),

    viewDetail(item){

      this.$router.push({name: 'call', params: {id: item.id}});
    },
  },
  computed: {
    ...mapGetters(['getCalls','authenticated']),
  },

  created(){
    this.setCalls();
  }
}
</script>
