<template>
    <div>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p> <strong>Name:</strong> {{ userDetails.name }} </p>
                            <p> <strong>Email:</strong> {{ userDetails.email }} </p>
                            <p> <strong>Joined:</strong> {{ userDetails.created_at }} </p>
                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default{
        name: 'profile-view',
        computed: {
            ...mapGetters({
                userDetails: "user/userDetails"
            })
        },
    }
</script>