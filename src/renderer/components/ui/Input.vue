<template>
    <div class="input">
        <label v-if="label" :for="inputID"
        >{{ label }} <small v-if="required">*</small></label
        >
        <input
          :type="type"
          :id="inputID"
          :disabled="disabled"
          :placeholder="placeholder"
          :required="required"
          :maxlength="max"
          v-model.trim="valueProp"
          class="custom_input"
        />
    </div>
</template>

<script>
    export default {
        name: 'Input',
        data () {
            return {
                inputID: null
            };
        },
        mounted () {
            this.inputID = `input${this._uid}`;
        },
        computed: {
            valueProp: {
                get: function () {
                    return this.value;
                },
                set: function (val) {
                    this.$emit('get', {name: this.nameProp, value: val});
                }
            }
        },
        props: {
            required: {
                type: String,
                default: () => null
            },
            type: {
                type: String,
                default: () => 'text'
            },
            nameProp: {
                type: String,
                default: () => ''
            },
            label: {
                type: String,
                default: () => ''
            },
            value: {
                type: String,
                required: true
            },
            max: {
                type: String,
                default: () => null
            },
            disabled: {
                type: Boolean,
                default: () => false
            },
            placeholder: {
                type: String,
                default: () => 'Ввести'
            }
        }
    };
</script>

<style scoped>
    label {
        display: block;
        font-weight: 700;
        margin-bottom: 6px;
        color: #333;
    }

    small {
        color: #f40d0d;
    }

    .custom_input {
        width: 100%;
        border-radius: 4px;
        border: 1px solid #094380;
        padding: 8px 10px;
        font-size: inherit;
    }

    .custom_input[disabled="disabled"] {
        background: #eee;
    }
</style>
