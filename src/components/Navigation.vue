<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |

      <template v-if="authenticated && user !==null">
         
         {{ user.name}}

      </template>
     
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  
  name: 'Navigation',

  computed: {
    ...mapGetters(['authenticated','user'])
  },

  methods: {
    ...mapActions(['logout']),

    signOut(){
      this.logout();
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
