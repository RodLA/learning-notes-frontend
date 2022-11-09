<template>
    <div>
        <h1 class="text-center">Dashboard</h1>
        <div class="container">

            <div v-for="(note, i) in listNotes" :key="note.id">
                <v-card outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="text-overline mb-4">
                                {{ i + 1 }} - {{ note.title }}
                            </div>
                            <v-list-item-subtitle>{{ note.content }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn outlined rounded text>
                            Edit
                        </v-btn>
                        <v-btn 
                            @click="deleteNote(note.id)"
                            outlined rounded text color="red">
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>

        </div>

    </div>
</template>
  
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Dashboard-view',

    data: () => {
        return {
            listNotes: [],
        }
    },
    components: {
    },
    mounted() {
        this.getNotes();
    },
    methods: {
        ...mapActions({
            getNotesOfUser: 'note/getNotesOfUser',
            deletNoteOfUser: 'note/deleteNote'
        }),
        async getNotes() {
            await this.getNotesOfUser().then((response) => {
                this.listNotes = response.data.notes;
            });
        },
    },
}
</script>
  