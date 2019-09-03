<template>
    <div class="base-inpt-setting">
        <div class="baseinput">
            <p class="basetitle" v-if="title">
                <span class="title small">{{title}}</span>
                <span v-if="formateAndTip.length>0" class="need-verify">*</span>
            </p>
            <el-input v-model="inputValue" @input.native="input" @blur="blur" :placeholder="placeholder" class="input">
                <i slot="suffix" class="unit">{{unit}}</i>
            </el-input>
        </div>
        <div v-if="tipOpen" class="need-verify">{{formateTiptext}}</div>
    </div>
</template>

<script>

export default {
    name: "EsInput",
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    props: {
        //值 
        value: {
            type: [String, Boolean, Number],
            default: () => {
                return "";
            }
        },
        //默认值
        placeholder: {
            type: [String, Number],
            default: ""
        },
        // 标题
        title: {
            type: String,
            default: ""
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        form: String,
        //验证规则即提示
        formateAndTip: {
            type: [Array, Object],
            default: () => {
                return [];
            }
        },
        // 单位
        unit: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            // 输入值
            inputValue: this.value,
            tipOpen: false,
            formateTiptext: "",
        };
    },
    methods: {
        // 返回输入的值
        input() {
            this.$emit("input", this.inputValue);
            this.$nextTick(this.setNativeInputValue);
        },
        // 验证提示开启
        formateOpen(title) {
            this.tipOpen = true;
            this.formateTiptext = title;
        },

        // 验证提示关闭
        formateClose() {
            this.tipOpen = false;
        },
        //失去焦点如果需要验证是否
        blur(event) {
            if (this.formateAndTip.length) {
                for (let formatei = 0; formatei < this.formateAndTip.length; formatei++) {

                    // 是否为空
                    if (Reflect.has(this.formateAndTip[formatei], 'required')) {
                        if (this.inputValue === '') {
                            this.formateOpen(this.formateAndTip[formatei].message);
                            return;
                        }
                    }
                    // 控制最大最小值
                    if (Reflect.has(this.formateAndTip[formatei], 'min')) {
                        if (this.inputValue - this.formateAndTip[formatei]["min"] < 0) {
                            this.formateOpen(this.formateAndTip[formatei].message);
                            return;
                        }
                    }
                    if (Reflect.has(this.formateAndTip[formatei], 'max')) {
                        if (this.inputValue - this.formateAndTip[formatei]["max"] > 0) {
                            this.formateOpen(this.formateAndTip[formatei].message);
                            return;
                        }
                    }

                    // 验证通过 关闭错误信息
                    this.formateClose();

                }
            }
            this.$emit('blur', event);
        },
    },

};
</script>

<style lang="scss" scoped>
$fontsize12: 0.75rem;

.base-inpt-setting {
    height: fit-content;
    display: inline-block;
    width: 18.75rem;
    height: 2.5rem;
    vertical-align: top;
    //tittle 样式
    .title {
        font-size: $fontsize12;
        color: #9ea5ae;
        line-height: $fontsize12;
    }

    // 是否需要验证
    .need-verify {
        color: red;
        font-size: 0.75rem;
    }

    //输入框整体样式
    .baseinput {
        width: 18.75rem;
        .basetitle {
            font-size: 0.75rem;
            line-height: 0.75rem;
            padding-bottom: 0.375rem;
        }
        .input {
            color: #dbdbdb;
            width: 18.75rem;
        }
        .unit {
            line-height: 2.5rem;
            font-size: 0.875rem;
            color: #9ea5ae;
            padding-right: 0.825rem;
            font-style: normal;
        }
    }
}
</style>
