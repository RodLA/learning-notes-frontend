<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <h1>Notes</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn target="_blank" @click="logout" v-if="loggedIn">
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',

  data: () => ({
  }),
  
  created(){
    this.checkUserState();
  },

  computed: {
    ...mapGetters({
      loggedIn:'user/loggedIn'
    }),
  },

  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      checkUserState: 'user/setLoggedInState'
    }),
    logout() {
      this.logoutUser()
        .then( ()=>{
          this.$router.push({name:'login'});
        } )
        .catch();
    }
  }

};
</script>
