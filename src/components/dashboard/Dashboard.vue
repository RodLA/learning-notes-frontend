<template>
    <div>
        <h1 class="text-center">Dashboard</h1>
    </div>
</template>
  
<script>
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
        this.$store.dispatch('user/me');
    },
    methods: {
    },
}
</script>
  