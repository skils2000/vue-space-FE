<template>
    <div class="application-manager">
        <div class="application-list">
            <h2>Список приложений</h2>
            <InputField v-model="searchTag" name="searchTag" label="" placeholder="Поиск по тегам" />
            <ul>
                <li v-for="app in filteredApplications" :key="app.id" class="application-manager__list-item">
                    {{ app.name }}
                    <button @click="editApplication(app)">Редактировать</button>
                    <button @click="deleteApplication(app.id)">Удалить</button>
                </li>
            </ul>
        </div>
        <div class="application-form">
            <ApplicationForm :application="selectedApplication" @created="afterCreateApplication"
                @updated="afterUpdateApplication" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
    getApplications,
    updateApplication,
    deleteApplication
} from "../services/api";
import InputField from './InputField.vue';
import Button from './Button.vue';
import ApplicationForm from "./ApplicationForm.vue";

export default {
    components: { ApplicationForm, InputField, Button },
    setup() {
        const applications = ref([]);
        const selectedApplication = ref(null);
        const searchTag = ref("");

        const fetchApplications = async () => {
            applications.value = await getApplications();
        };

        const filteredApplications = computed(() => {
            if (searchTag.value) {
                return applications.value.filter(app =>
                    app.tags.includes(searchTag.value)
                );
            }
            return applications.value;
        });

        const editApplication = (app) => {
            selectedApplication.value = { ...app };
        };

        const deleteApplicationHandler = async (id) => {
            await deleteApplication(id);
            fetchApplications();
        };

        const afterCreateApplication = () => {
            fetchApplications();
        }

        const afterUpdateApplication = () => {
            fetchApplications();
            cancelEdit()
        }

        const cancelEdit = () => {
            selectedApplication.value = null;
        };

        onMounted(fetchApplications);

        return {
            applications,
            selectedApplication,
            searchTag,
            fetchApplications,
            editApplication,
            deleteApplication: deleteApplicationHandler,
            filteredApplications,
            cancelEdit,
            afterCreateApplication,
            afterUpdateApplication,
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
