<template>
    <div>
        <v-app>
            <v-main>
                <v-container>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Registro</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form ref="form" @submit.prevent="registerUser()">
                                        <v-text-field v-model="form.name" name="name" label="Name" type="text"
                                            placeholder="name"></v-text-field>

                                        <v-text-field v-model="form.email" name="email" label="Email" type="text"
                                            placeholder="email"></v-text-field>

                                        <v-text-field v-model="form.password" name="password" label="Password"
                                            type="password" placeholder="password"></v-text-field>
                                        <v-btn type="submit" class="mt-4" color="primary" value="log in">Registrar
                                        </v-btn>
                                    </v-form>
                                    <br>
                                    <p>Ya tienes una cuenta? <router-link :to="{ name: 'login' }">Login</router-link>
                                    </p>
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

    name: 'auth-register',
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
            },
        }
    },
    components: {
    },
    methods: {
        ...mapActions({
            addNotification: 'application/addNotification',
            register: 'user/registerUser'
        }),
        registerUser() {
            this.register(this.form)
                .then((response) => {
                    //correcto
                    if (response.data.success) {
                        
                        this.addNotification({
                            show: true,
                            text:'Success!'
                        }).then( ()=>{
                            this.$router.push({
                                name:'login'
                            })
                        } );
                    }
                    else {
                        this.addNotification({
                            show: true,
                            text:'Failed!'
                        })

                    }
            }).catch((response) => {
                //Error request, el back valida los campos (vacios o estructura)
                console.log(response.response.data.errors);
                console.log("error");
            });
        }
    }
}
</script>
