<template>
    <div>
        <ApplicationForm :existingApp="selectedApp" :editMode="editMode" @form-submitted="resetForm" />
        <ApplicationList @editApp="selectedApp = $event; editMode = true" @fetchApplications="fetchApplications" />
    </div>
</template>

<script>
import ApplicationForm from '../components/ApplicationForm.vue';
import ApplicationList from '../components/ApplicationList.vue';

export default {
    components: { ApplicationForm, ApplicationList },
    data() {
        return {
            selectedApp: null,
            editMode: false,
        };
    },
    methods: {
        resetForm() {
            this.selectedApp = null;
            this.editMode = false;
        },
    },
};
</script>