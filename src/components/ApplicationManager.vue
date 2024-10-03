<template>
    <div class="application-manager">
        <div class="application-list">
            <h2>Список приложений</h2>
            <ul>
                <li v-for="app in applications" :key="app.id">
                    {{ app.name }}
                    <button @click="editApplication(app)">Редактировать</button>
                    <button @click="deleteApplication(app.id)">Удалить</button>
                </li>
            </ul>
        </div>
        <div class="application-form">
            <ApplicationForm :application="selectedApplication" @created="fetchApplications"
                @updated="fetchApplications" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
    getApplications,
    updateApplication,
    deleteApplication
} from "../services/api";
import ApplicationForm from "./ApplicationForm.vue";

export default {
    components: { ApplicationForm },
    setup() {
        const applications = ref([]);
        const selectedApplication = ref(null);
        const searchTag = ref("");

        const fetchApplications = async () => {
            applications.value = await getApplications();
        };

        const editApplication = (app) => {
            selectedApplication.value = { ...app }; 
        };

        const searchApplications = async () => {
            if (searchTag.value) {
                // applications.value = await searchByTags(searchTag.value);
            } else {
                fetchApplications();
            }
        };

        const deleteApplicationHandler = async (id) => {
            await deleteApplication(id);
            fetchApplications(); // Обновление списка после удаления
        };

        onMounted(fetchApplications);

        return {
            applications,
            selectedApplication,
            searchTag,
            fetchApplications,
            editApplication,
            deleteApplication: deleteApplicationHandler,
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
    width: 50%;
    padding: 10px;
}
</style>
