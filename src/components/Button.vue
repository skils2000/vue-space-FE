<template>
    <button @click="handleClick" :disabled="disabled">
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