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
                                    <v-form ref="form" @submit.prevent="sendForgotPassword()">
                                        <v-text-field v-model="form.email" name="email" label="email" type="email"
                                            placeholder="email" required></v-text-field>

                                        <v-btn type="submit" class="mt-4" color="primary">SEND EMAIL</v-btn>
                                    </v-form>

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
    name: 'forgot-password',
    data() {
        return {
            form:{
                email: "",
            }
        }
    },
    methods: {
        ...mapActions({
            forgotPassword: "user/forgotPassword",
            addNotification: 'application/addNotification'
        }),
        sendForgotPassword(){
            this.forgotPassword( this.form ).then( (response)=>{
                console.log(response);
                this.addNotification({
                    text: 'Email sent!',
                    show: true
                });
            }).catch(
                ()=>{
                    console.log("ERROR :C");

                    this.addNotification({
                        text: 'Failed Email sent!',
                        show: true
                    }); 
                }
            );
        }
        
    }
}
</script>