<template>
    <div class="application-manager">
        <div class="application-list">
            <h2>Список приложений</h2>
            <ul>
                <li v-for="app in applications" :key="app.id" @click="selectApplication(app)">
                    {{ app.name }}
                </li>
            </ul>
        </div>
        <div class="application-form">
            <ApplicationForm :application="selectedApplication" @created="fetchApplications" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
    getApplications,
    createApplication,
} from "../services/api";
import ApplicationForm from "./ApplicationForm.vue";

export default {
    components: { ApplicationForm },
    setup() {
        const applications = ref([]);
        const newApplication = ref({
            name: "",
            url: ""
        });
        const searchTag = ref("");

        const fetchApplications = async () => {
            console.log("Fetching applications");

            applications.value = await getApplications();
        };

        const handleSubmit = async () => {
            const createdApp = await createApplication(newApplication.value);
            applications.value.push(createdApp);
            newApplication.value = { name: "", url: "" }; // Сброс формы
        };

        const searchApplications = async () => {
            if (searchTag.value) {
                // applications.value = await searchByTags(searchTag.value);
            } else {
                fetchApplications();
            }
        };

        onMounted(fetchApplications);

        return {
            applications,
            newApplication,
            handleSubmit,
            searchTag,
            searchApplications,
            fetchApplications
        };
    },
};
</script>

<style scoped>
.application-manager {
    display: flex;
}

.application-list {
    width: 50%;
    padding: 10px;
    border-right: 1px solid #ccc;
}

.application-form {
    width: 70%;
    padding: 10px;
}
</style>
