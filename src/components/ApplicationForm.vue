<template>
    <form @submit.prevent="submitForm">
        <select v-model="formData.virtual_machine_id">
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

        <Button @click="handleSubmit">Submit</Button>
    </form>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
import axios from 'axios';
import InputField from './InputField.vue';
import Button from './Button.vue';

// const components: { InputField, Button }
const props = defineProps({
    application: Object,
})
const emit = defineEmits(['created'])

const formData = ref({
    virtual_machine_id: null,
    name: '',
    url: '',
    description: '',
    login: '',
    password: '',
    tags: ''
});

// Обновляем форму при выборе приложения
watch(() => props.application, (newApp) => {
    if (newApp) {
        formData.value = { ...newApp };
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
    }
});

const handleSubmit = async () => {
    console.log("Submit");
    if (props.application) {
        await axios.put(`http://localhost:3001/api/applications/${props.application.id}/`, formData.value);
    } else {
        await axios.post('http://localhost:3001/api/applications/', formData.value);
    }
    emit('created');


    // Сбросить форму
    formData.value = { ...formData.value, name: '', url: '', description: '', login: '', password: '', tags: '' };
};

// Получение виртуальных машин для выпадающего списка
const virtualMachines = ref([]);
const fetchVirtualMachines = async () => {
    const response = await axios.get('http://localhost:3001/api/virtualmachines/'); // Путь к API для получения ВМ
    virtualMachines.value = response.data;
};

fetchVirtualMachines();

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

input,
textarea,
select {
    margin: 5px 0;
}

button {
    margin-top: 10px;
}
</style>