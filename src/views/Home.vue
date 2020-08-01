<template>
  <div class="home">
   
   <div class="container-fluid">
    <v-data-table
      :headers="call_headers"
      class="mt-5"
      :items="getCalls"
    >
        <template v-slot:item.actions="{ item }">
          <button 
            type="button" 
            @click.prevent="viewDetail(item)" 
            class="btn btn-sm btn-primary mr-2"
          >
            VIEW DETAILS
          </button>
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
      { text: 'BUDGET', value: 'budget', class: 'font-weight-bold text-body-1',sortable: false },
      { text: 'DEADLINE', value: 'deadline', class: 'font-weight-bold text-body-1',sortable: false },
      { text: 'ACTIONS', value: 'actions', class: 'font-weight-bold text-body-1',sortable: false },
    ],

  }),
  methods:{
    ...mapActions(['setCalls']),

    viewDetail(item){

      if(this.authenticated)
        console.log("you are authenticated "+item.name)
      else(
        console.log("you are not authenticated "+item.name)
      )
    }

  },
  computed: {
    ...mapGetters(['getCalls','authenticated']),
  },
}
</script>
