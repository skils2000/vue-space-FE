<template>
    <form @submit.prevent="submitForm" class="application-form">
        <select v-model="formData.virtual_machine_id" class="application-form__select">
            <option v-for="vm in virtualMachines" :key="vm.id" :value="vm.id">
                {{ vm.name }}
            </option>
        </select>

        <InputField v-model="formData.name" name="name" label="Name" />
        <InputField v-model="formData.url" name="url" label="URL" />
        <InputField v-model="formData.description" name="description" label="Description" />
        <InputField v-model="formData.login" name="login" label="Login" />
        <InputField v-model="formData.password" name="password" label="Password" />
        <InputField v-model="formData.tags" name="tags" label="Tags" />

        <SimpleButton @handleClick="handleSubmit">{{ isEditing ? 'Обновить' :
            'Создать' }}</SimpleButton>
    </form>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
import axios from 'axios';
import InputField from './InputField.vue';
import SimpleButton from './SimpleButton.vue';
import {
    updateApplication,
    createApplication
} from "../services/api";

const props = defineProps({
    application: Object,
})
const emit = defineEmits(['created', 'updated'])

const formData = ref({
    virtual_machine_id: null,
    name: '',
    url: '',
    description: '',
    login: '',
    password: '',
    tags: ''
});

const isEditing = ref(false);

watch(() => props.application, (newApp) => {
    if (newApp) {
        formData.value = { ...newApp };
        isEditing.value = true;
    } else {
        formData.value = {
            virtual_machine_id: null,
            name: '',
            url: '',
            description: '',
            login: '',
            password: '',
            tags: ''
        };
        isEditing.value = false;
    }
});


const handleSubmit = async () => {
    console.log("Submit");
    if (props.application) {
        await updateApplication(props.application.id, formData.value);
        emit('updated');
    } else {
        await createApplication(formData.value);
        emit('created');
    }

    formData.value = { ...formData.value, name: '', url: '', description: '', login: '', password: '', tags: '', virtual_machine_id: null };
    isEditing.value = false;
};

const virtualMachines = ref([]);
const fetchVirtualMachines = async () => {
    const response = await axios.get('http://localhost:3001/api/virtualmachines/'); // Путь к API для получения ВМ
    virtualMachines.value = response.data;
};

fetchVirtualMachines();

</script>

<style scoped>
.application-form {
    display: flex;
    flex-direction: column;
}

.application-form__select {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
}
</style>