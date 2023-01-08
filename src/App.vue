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

    <v-snackbar 
      @input="updateNotification($event, index)"
      :key="index"
      v-for="(snackbar, index) in allNotifications"
      v-model="snackbar.show">
      
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="removeNotification(index)">
              Close
          </v-btn>
      </template>
    </v-snackbar>

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
      loggedIn:'user/loggedIn',
      allNotifications:'application/notifications',
    }),
  },

  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      checkUserState: 'user/setLoggedInState',
      removeNotification: 'application/removeNotification',
      addNotification: 'application/addNotification',
    }),
    logout() {
      this.logoutUser()
        .then( ()=>{
          this.addNotification({
            text: 'Logged out, Bye!',
            show: true
          }).then( ()=> {
            this.$router.push({name:'login'});
          });          
        } )
        .catch();
    },
    updateNotification(show, index){
      if (!show) {
        this.removeNotification(index);
      }
    },  
  }

};
</script>
