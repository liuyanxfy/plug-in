<template>
    <div class="es-date-picker_all">
        <EsInput v-model="inputVal" @input="input" @inputShowDate="inputShowDate" @keydown.native="handleKeydown"
            :selectDayfrompicker="selectDayfrompicker">
        </EsInput>
        <DatePicker @showDate="showDate" ref="userInputSelect" :showDatePicker="showDatePicker" @selectDay="selectDay">
        </DatePicker>
    </div>
</template>

<script>
import DropDown from './dropdown.js';
import EsInput from './es-input';
import DatePicker from "./date-picker.vue";

export default {
    name: "EsDatePicker",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
    },
    components: { DatePicker, EsInput },
    data() {
        return {
            inputVal: this.value,
            showDatePicker: false,
            selectDayfrompicker: "",
        };
    },
    methods: {
        showDate(val) {
            this.inputVal = val;
        },
        input() {
            this.$emit('input', this.inputVal);
        },
        inputShowDate(showOrHidden) {
            this.showDatePicker = showOrHidden;
            if (showOrHidden) {
                DropDown.open(this);
            } else {
                DropDown.open(this);
            }
        },
        // 键盘事件
        handleKeydown(e) {
            if (e.keyCode === 13) {
                let userInput = "";
                // 填入参数格式区分
                if (this.inputVal.indexOf("号") > -1) {
                    userInput = Number(this.inputVal.slice(0, -1));
                } else {
                    userInput = Number(this.inputVal);
                }
                // 不符合条件恢复
                if (Number.isNaN(userInput) || userInput < 0 || userInput > 28) {
                    this.inputVal = this.selectDayfrompicker;
                    return;
                }
                this.selectDayfrompicker = userInput + "号";
                this.$refs['userInputSelect'].userInputselect(userInput);
            }
        },
        // 日历隐藏
        handleOutsideClick() {
            setTimeout(() => {
                this.showDatePicker = false;
            }, 16);
        },
        // 选中日期
        selectDay(dateVal) {
            this.selectDayfrompicker = dateVal;
        },

    },
};
</script>
<style>
.es-date-picker_all {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
}
</style>