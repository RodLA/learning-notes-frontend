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
                                    <v-form ref="form" @submit.prevent="loginUser()">
                                        <v-text-field v-model="form.email" name="email" label="email" type="text"
                                            :rules="emailRules" placeholder="email" required></v-text-field>

                                        <v-text-field v-model="form.password" name="password" label="Password"
                                            :rules="passwordRules" type="password" placeholder="password" required></v-text-field>
                                        <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                                    </v-form>
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
import PasswordValidationMixin from "../../mixins/passwordValidationMixin";

export default {
    mixins: [PasswordValidationMixin],
    name: 'auth-login',
    data() {
        return {
            form:{
                email: "",
                password: "",
            },
        }
    },
    methods: {
        ...mapActions({
            login: 'user/loginUser',
            addNotification: 'application/addNotification'
        }),
        loginUser(){

            if(this.$refs.form.validate() ){
                this.login(this.form)
                .then( ()=>{
                    this.addNotification({
                        text: 'Welcome',
                        show: true
                    }).then( ()=>{
                        this.$router.push({name:'dashboard'});
                    });
                    
                } ).catch( ()=> {
                    this.addNotification({
                        text: 'Failed to login',
                        show: true
                    });
                });
            }

        }
    }
}
</script>
