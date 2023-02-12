<template>
    <div>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Change Details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p> <strong>Name:</strong> {{ userDetails.name }} </p>
                            <p> <strong>Email:</strong> {{ userDetails.email }} </p>
                            <p> <strong>Date:</strong> {{ userDetails.created_at }} </p>
                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Change Details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <form ref="changeDetailsForm" @submit.prevent="changeDetails()">

                                <v-text-field v-model="userDetails.name" name="name" label="Name" type="text"
                                    required></v-text-field>

                                <v-btn type="submit" class="mt-4" color="primary">Save</v-btn>

                            </form>
                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Change Password</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <form ref="changePasswordForm" @submit.prevent="changePassword()">

                                <v-text-field v-model="user.oldPassword" name="oldPassword" label="Old password" type="password"
                                    placeholder="Old password" required></v-text-field>

                                <v-text-field v-model="user.newPassword" name="newPassword" label="New password" type="password"
                                    placeholder="New password" required></v-text-field>

                                <v-text-field v-model="user.newPasswordConfirmation" name="newPasswordConfirmation" label="New password Confirmation" type="password"
                                    placeholder="New password Confirmation" required></v-text-field>

                                <v-btn type="submit" class="mt-4" color="primary" value="Change password">Change password</v-btn>
                            </form>
                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default{
        data(){
            return {
                user: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: ''
                },
            }
        },
        name: 'profile-view',
        computed: {
            ...mapGetters({
                userDetails: "user/userDetails",
            })
        },
        methods: {

            ...mapActions({
                updateDetails: "user/updateDetails",
                changeUserPassword: "user/changePassword",
                addNotification: "application/addNotification"
            }),

            changeDetails(){

                this.updateDetails(this.userDetails)
                    .then( ()=>{
                        this.addNotification({
                            text: 'Details changed',
                            show: true
                        });
                        
                    } ).catch( ()=> {
                        this.addNotification({
                            text: 'Failed to change details',
                            show: true
                        });
                    });
            },
            changePassword(){

                this.changeUserPassword(this.user)
                    .then( ()=>{
                        this.addNotification({
                            text: 'Password changed',
                            show: true
                        });
                        
                    } ).catch( ()=> {
                        this.addNotification({
                            text: 'Failed to change password',
                            show: true
                        });
                    });
            }
        }
    }
</script>