<template>
    <button
      v-if="text"
      @click="$emit('click', callBack)"
      :class="`btn ${classProp}`"
      :disabled="disabled"
      :type="type"
    >
        {{ text }}
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            text: String,
            type: {
                type: String,
                default: () => 'button'
            },
            classProp: {
                type: String,
                default: () => ''
            },
            disabled: {
                type: Boolean,
                default: () => null
            },
            callBack: Object
        }
    };
</script>

<style scoped>
    .btn {
        padding: 0.4rem 1.5rem;
        border-radius: 30px;
        border: 3px solid #008261;
        transition: all 0.2s linear;
        display: inline-block;
        font-weight: 500;
        color: #fff;
        background-color: #008261;
    }

    @media only screen and (max-width: 1440px) {
        .btn {
            padding: 0.2rem 1rem;
        }
    }

    .btn[disabled="disabled"] {
        background-color: #d5d5d5;
        border-color: #d5d5d5;
        cursor: not-allowed;
    }

    .btn:hover {
        opacity: 0.7;
    }

    .btn.blue {
        background-color: #094380;
        border-color: #094380;
    }
</style>
