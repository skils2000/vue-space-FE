<template>
    <div>
        <label :for="name">{{ label }}</label>
        <input :id="name" :value="modelValue" @input="updateValue" :type="type" />
    </div>
</template>

<script>
export default {
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
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
};
</script>