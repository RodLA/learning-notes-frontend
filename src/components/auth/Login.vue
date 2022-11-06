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
                                    <form ref="form" @submit.prevent="login()">
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
import axios from 'axios';
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
    components: {
    },
    methods: {
        login(){
            axios
                .post('http://127.0.0.1:8000/api/login', this.form)
                .then((response) => {
                    //correcto
                    console.log(response.data.user);
                    console.log(response.data.access_token);

                }).catch((response) => {
                    //Error request, el back valida los campos (vacios o estructura)
                    //console.log(response.response.data.errors);
                    console.log(response);
                    console.log("error");
                });
        }
    }
}
</script>
