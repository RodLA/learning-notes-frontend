<template>
  <v-app>

    <router-view></router-view>

    <v-snackbar @input="updateNotification($event, index)" :key="index" v-for="(snackbar, index) in allNotifications"
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

  created() {
    this.checkUserState();
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/loggedIn',
      allNotifications: 'application/notifications',
    }),
  },

  methods: {
    ...mapActions({
      checkUserState: 'user/setLoggedInState',
      removeNotification: 'application/removeNotification',
      addNotification: 'application/addNotification',
      me: 'user/me'
    }),
    updateNotification(show, index) {
      if (!show) {
        this.removeNotification(index);
      }
    },
  }

};
</script>
