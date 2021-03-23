<template>
    <div class="input-radio">
        <input
          type="radio"
          v-model="value"
          :value="valueInput"
          :name="nameInput"
          :id="inputID"
          :checked="nameChecked"
          :required="required"
        />
        <label :for="inputID">{{ text }}</label>
    </div>
</template>

<script>
    export default {
        name: 'InputRadio',
        data () {
            return {
                inputID: null
            };
        },
        mounted () {
            this.inputID = `input-radio${this._uid}`;
        },
        computed: {
            value: {
                get: function () {
                    return this.valueProp;
                },
                set: function (val) {
                    this.$emit('get', {name: this.nameProp, value: val});
                }
            }
        },
        props: {
            valueProp: {
                type: String,
                default: () => ''
            },
            text: {
                type: String,
                default: () => ''
            },
            nameProp: {
                type: String,
                default: () => ''
            },
            nameInput: {
                type: String,
                default: () => null
            },
            valueInput: String,
            nameChecked: {
                type: Boolean,
                default: () => false
            },
            required: {
                type: String,
                default: () => null
            }
        }
    };
</script>

<style scoped>
    .input-radio {
        margin-bottom: 15px;
    }

    .input-radio [type="radio"]:checked,
    .input-radio [type="radio"]:not(:checked) {
        position: absolute;
        left: -9999px;
    }

    .input-radio [type="radio"]:checked + label,
    .input-radio [type="radio"]:not(:checked) + label {
        position: relative;
        padding-left: 25px;
        cursor: pointer;
        line-height: 20px;
        display: inline-block;
        color: #094380;
        font-weight: 400;
    }

    .input-radio [type="radio"]:checked + label:before,
    .input-radio [type="radio"]:not(:checked) + label:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 16px;
        height: 16px;
        border: 1px solid #ddd;
        border-radius: 100%;
        background: #fff;
    }

    .input-radio [type="radio"]:checked + label:after,
    .input-radio [type="radio"]:not(:checked) + label:after {
        content: "";
        width: 12px;
        height: 12px;
        background: #094380;
        position: absolute;
        top: 3px;
        left: 3px;
        border-radius: 100%;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    .input-radio [type="radio"]:not(:checked) + label:after {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    .input-radio [type="radio"]:checked + label:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
</style>
