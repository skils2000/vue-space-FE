<template>
    <div class="form-field">
        <label class="form-field__label" :for="name">{{ label }}</label>
        <input class="form-field__input" :id="name" v-model="inputValue" @input="updateValue" :type="type"
            :placeholder="placeholder" />
    </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
    name: 'InputField',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    setup (props, {emit}) {
        const inputValue = ref(props.modelValue);

        watch(() => props.modelValue, (newValue) => {
            inputValue.value = newValue;
        });

        const updateValue = (event) => {
            const value = event.target.value;
            inputValue.value = value;

            emit('update:modelValue', value);
        };

        return {
            inputValue,
            updateValue
        };
    },
};
</script>

<style scoped>
.form-field {
    padding: 8px 0;
}

.form-field__label {
    font-weight: bold;
    margin-bottom: 5px;
}

.form-field__input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
    width: 100%;
}

.form-field__input:focus {
    border-color: #007bff;
    outline: none;
}
</style>
