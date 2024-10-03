<template>
    <div>
        <input v-model="searchTags" placeholder="Search tags" />
        <button @click="fetchApplications">Search</button>
        <ul>
            <li v-for="app in filteredApplications" :key="app.id">
                {{ app.name }}
                <button @click="editApplication(app)">Edit</button>
                <button @click="deleteApplication(app.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import ApplicationForm from './ApplicationForm.vue';

export default {
    components: { ApplicationForm },
    data() {
        return {
            applications: [],
            searchTags: '',
            selectedApp: null,
            editMode: false,
        };
    },
    computed: {
        filteredApplications() {
            return this.applications.filter(app =>
                app.tags?.split(',').some(tag => tag.trim().includes(this.searchTags))
            );
        },
    },
    methods: {
        async fetchApplications() {
            const response = await axios.get('api/applications/');
            this.applications = response.data;
        },
        async deleteApplication(id) {
            await axios.delete(`api/applications/${id}/`);
            this.fetchApplications();
        },
        editApplication(app) {
            this.selectedApp = app;
            this.editMode = true;
        },
        resetForm() {
            this.selectedApp = null;
            this.editMode = false;
            this.fetchApplications();
        },
    },
    mounted() {
        this.fetchApplications();
    },
};
</script>