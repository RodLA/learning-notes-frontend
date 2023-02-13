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
                            <v-form ref="changeDetailsForm" @submit.prevent="changeDetails">

                                <v-text-field v-model="userDetails.name" name="name" label="Name" type="text"
                                    :rules="requiredRules"></v-text-field>

                                <v-btn type="submit" class="mt-4" color="primary">Save</v-btn>

                            </v-form>
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
                            <v-form ref="changePasswordForm" @submit.prevent="changePassword">

                                <v-text-field v-model="user.oldPassword" name="oldPassword" label="Old password" type="password"
                                    :rules="[...requiredRules, ...passwordRules]"></v-text-field>

                                <v-text-field v-model="user.newPassword" name="newPassword" label="New password" type="password"
                                    ref="newPassword"
                                    :rules="[...requiredRules, ...passwordRules]"></v-text-field>

                                <v-text-field v-model="user.newPasswordConfirmation" name="newPasswordConfirmation" label="New password Confirmation" type="password"
                                    ref="newPasswordConfirmation"
                                    :rules="[...requiredRules, ...passwordRules, newPasswordValidator]"></v-text-field>

                                <v-btn type="submit" class="mt-4" color="primary" value="Change password">Change password</v-btn>
                            </v-form>
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
                nameRules:[
                    v => !!v || 'Name is required',
                    // (v) => {
                    //     if( v?.length > 0 ){
                    //         return true
                    //     } else{
                    //         return 'My message'
                    //     }
                    // }
                ],
                requiredRules: [
                    v => !!v || 'This field is required',
                ],
                passwordRules: [
                    v => (!!v && v?.length >= 6 ) || 'Password is too short',
                ],
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

                console.log( this.$refs.changeDetailsForm.validate() );

                if(this.$refs.changeDetailsForm.validate()){

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
                }
            },
            changePassword(){

                console.log(this.$refs.changePasswordForm.validate());

                if(this.$refs.changePasswordForm.validate() ){
                    
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
            },
            newPasswordValidator() {
                return (this.user.newPasswordConfirmation === this.user.newPassword) || 'New password is not confirmed';
            }
            
        }
    }
</script>