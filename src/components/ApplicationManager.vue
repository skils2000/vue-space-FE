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
            <ApplicationForm :application="selectedApplication" :onSubmit="handleFormSubmit" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import InputField from './InputField.vue';
import Button from './SimpleButton.vue';
import ApplicationForm from "./ApplicationForm.vue";
import { useApplications } from "@/composables/useApplications";

export default {
    components: { ApplicationForm, InputField, Button },
    setup() {
        const { apps, fetchApps, addApp, updateApp, deleteApp } = useApplications();

        const selectedApplication = ref(null);
        const searchTag = ref("");

        const filteredApplications = computed(() => {
            if (searchTag.value) {
                return apps.value.filter(app =>
                    app.tags.includes(searchTag.value)
                );
            }

            return apps.value;
        });

        const editApplication = (app) => {
            selectedApplication.value = { ...app };
        };

        const deleteApplicationHandler = async (id) => {
            await deleteApp(id);
        };

        const handleFormSubmit = async (formData) => {
            if (selectedApplication.value) {
                await updateApp(selectedApplication.value.id, formData);
                cancelEdit()
            } else {
                await addApp(formData);
            }
        };

        const cancelEdit = () => {
            selectedApplication.value = null;
        };

        onMounted(fetchApps);

        return {
            selectedApplication,
            searchTag,
            filteredApplications,
            fetchApps,
            handleFormSubmit,
            deleteApplication: deleteApplicationHandler,
            editApplication,
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
