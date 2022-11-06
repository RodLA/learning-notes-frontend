<template>
    <div>
        <v-app>
            <v-main>
                <v-container>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Login</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <form ref="form" @submit.prevent="loginUser()">
                                        <v-text-field v-model="form.email" name="email" label="email" type="text"
                                            placeholder="email"></v-text-field>

                                        <v-text-field v-model="form.password" name="password" label="Password"
                                            type="password" placeholder="password"></v-text-field>
                                        <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                                    </form>
                                    <br>
                                    <p>No tienes una cuenta? <router-link :to="{ name: 'register' }">Registrate</router-link></p>
                                </v-card-text>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>
  
<script>

import { mapActions } from 'vuex';

export default {
    name: 'auth-login',
    data() {
        return {
            form:{
                email: "",
                password: "",
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'user/loginUser'
        }),
        loginUser(){
            this.login(this.form)
                .then( ()=>{
                    this.$router.push({name:'dashboard'});
                } );

        }
    }
}
</script>
