<template>
    <button class="button" @click="handleClick" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
};
</script>

<style scoped>
.button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 16px;
}

.button:hover {
    background-color: #0056b3;
}

.button:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
}
</style>
