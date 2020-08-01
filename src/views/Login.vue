<template>
  <div name="login">
      <form @submit.prevent="submit">

        <div>
            <label>Email: </label>
            <input type="email" v-model="form.email" id="email">
        </div>

        <br>
        <div>
            <label>Password: </label>
            <input type="password" v-model="form.password" id="password">
        </div>
        <br>
        <div>
            <button type="submit">
                Sign in 
            </button>
        </div>

      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name:'Login',

    data(){
        return {

            form:{

                email:'',
                password:''
            }
        }
    },

    methods:{

        ...mapActions(['Login']),

        submit(){
            this.Login(this.form);
        }
        
    }

}
</script>

<style>

</style>