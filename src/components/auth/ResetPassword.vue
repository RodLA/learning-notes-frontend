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
                                    <v-form ref="form" @submit.prevent="sendResetPassword()">

                                        <v-text-field v-model="form.email" name="email" label="email" type="email"
                                            :rules="emailRules" placeholder="email" required></v-text-field>

                                        <v-text-field v-model="form.password" name="password" label="Password"
                                            :rules="passwordRules" type="password" placeholder="password" required></v-text-field>
                                        
                                            <v-text-field v-model="form.password_confirmation" name="password_confirmation" label="password confirmation"
                                            :rules="[...passwordRules, passwordValidator]" type="password" placeholder="password confirmation" required></v-text-field>

                                        <v-btn type="submit" class="mt-4" color="primary" >Save</v-btn>
                                    </v-form>
                                    
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
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (!!v && v?.length >= 6 ) || 'Password is too short',
            ],
        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'user/resetPassword',
            addNotification: 'application/addNotification'
        }),
        sendResetPassword(){

            if(this.$refs.form.validate() ){
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
            }
        },
        passwordValidator() {
            return (this.form.password_confirmation === this.form.password) || 'New password is not confirmed';
        },
    }
}
</script>