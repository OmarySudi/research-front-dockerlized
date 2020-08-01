<template>
    
    <v-dialog
        v-model="alertData.display_alert"
        width="40rem"
        transition="scale-transition"
      >         
        <v-alert :type="alertData.alert_type">         
          {{alertData.alert}}

        </v-alert>
    </v-dialog>

</template>

<script>
export default {

 name:'Alert',

 props:['alertData'],

 data: ()=>({
     
 }),

}
</script>

<style scoped>

</style>>

