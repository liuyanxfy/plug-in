<template>
    <div class="es-date-picker_input">
        <input type="text" class="es-input-inner" v-model="inputVal" @input="handleInput" @click="showDatePicker"
            @blur="blur">
        <span class="es-input-icon" @click="showDatePicker">
            <i class=" el-icon-time"></i>
        </span>
    </div>
</template>
<script>
export default {
    name: "EsInput",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        selectDayfrompicker: {
            type: [String, Number],
            default: ""
        }

    },
    data() {
        return {
            inputVal: this.value,
        };
    },
    methods: {
        // 监听Input 
        handleInput(event) {
            this.$emit('input', event.target.value);
        },
        // 显示日历
        showDatePicker() {
            this.$emit('inputShowDate', true);
        },
        //失去焦点 去除未设置参数
        blur() {
            this.inputVal = this.selectDayfrompicker;
        },

    },
    watch: {
        value(oldVal) {
            this.inputVal = oldVal;

        },

    },
    computed: {

    },
};
</script>
<style scoped>
/* input 框样式 */
.es-date-picker_input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
.es-input-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 2.5rem;
    line-height: 2.5rem;
    outline: 0;
    padding: 0 0.9375rem;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    border: 0.0625rem solid #ededf1;
    border-radius: 0.125rem;
    padding-left: 0.625rem;
    padding-right: 1.875rem;
}
.es-input-inner:hover {
    border-color: #c0c4cc;
}
/* 图标 */
.es-input-icon {
    position: absolute;
    top: 0;
    -webkit-transition: all 0.3s;
    height: 100%;
    color: #c0c4cc;
    text-align: center;
    line-height: 2.5rem;
    right: 0.625rem;
    left: auto;
    font-size: 0.875rem;
}
</style>