<template>
    <div class="application-manager">
        <div class="application-manager__list">
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
        <div class="application-manager__form">
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
import Button from './SimpleButton.vue';
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
    flex-direction: row;
    padding: 20px;
    gap: 20px;
}

.application-manager__list {
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
}

.application-manager__list-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.application-manager__form {
    width: 100%;
}
</style>
