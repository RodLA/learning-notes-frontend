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

export default {
  name: 'App',

  data: () => ({
    loggedIn: false,
  }),

  mounted(){
    console.log('me estas viendo xd');
  },

  created(){
    if( localStorage.getItem('token') ){
      this.loggedIn = true;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token');
      this.loggedIn = false;
      this.$router.push({name: 'login'});
    }
  }

};
</script>
