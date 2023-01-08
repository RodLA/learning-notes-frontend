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
                                    <form ref="form" @submit.prevent="sendResetPassword()">

                                        <v-text-field v-model="form.email" name="email" label="email" type="email"
                                            placeholder="email" required></v-text-field>

                                        <v-text-field v-model="form.password" name="password" label="Password"
                                            type="password" placeholder="password" required></v-text-field>
                                        
                                            <v-text-field v-model="form.password_confirmation" name="password_confirmation" label="password confirmation"
                                            type="password" placeholder="password confirmation" required></v-text-field>

                                        <v-btn type="submit" class="mt-4" color="primary" >Save</v-btn>
                                    </form>
                                    
                                </v-card-text>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-container>
                <router-link :to="{name: 'login'}">Login</router-link>
            </v-main>
        </v-app>
    </div>
</template>
  
<script>

import { mapActions } from 'vuex';

export default {
    name: 'reset-password',
    data() {
        return {
            form:{
                email: "",
                password: "",
                password_confirmation: "",
            }
        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'user/resetPassword',
            addNotification: 'application/addNotification'
        }),
        sendResetPassword(){
            const token = this.$route.query.token;
            this.resetPassword( { ...this.form, token } )
                .then(()=>{

                    this.addNotification({
                        text: 'Password changed',
                        show: true

                    }).then( ()=>{
                        this.$router.push( {name:'login'} );
                    } );
                    
                }).catch( ()=> {
                    this.addNotification({
                        text: 'Failed to change password',
                        show: true
                    });
                });
        },
    }
}
</script>