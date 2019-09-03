<template>
    <div class="es-date-table_all" :class="{'showDatePicker':showDate}">
        <div class="dateTriangle"></div>
        <table cellspacing="0" cellpadding="0" class="es-date-table" @click="handleClick">
            <!--   @mousemove="handleMouseMove" -->
            <tbody>
                <tr class="el-date-table__row" v-for="(row, keytr) in defaultDate" :key="keytr">
                    <td v-for="(cell, keytb) in row" :key="keytb">
                        <div :class="{'current':keytr===selectDays[0] && keytb===selectDays[1]}">
                            <span>
                                {{ cell }}
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "DatePicker",
    props: {
        // 日历类型
        type: {
            type: String,
            default: "day"
        },
        // 显示日历
        showDatePicker: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 日历显示/隐藏
            showDate: this.showDatePicker,
            defaultDate: [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14], [15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27, 28]],
            selectDays: [],
        };
    },
    methods: {
        // 点击日，添加样式，和取值
        handleClick(event) {
            let target = event.target;
            // 判断点击行和列
            if (target.tagName === "SPAN") {
                target = target.parentNode.parentNode;
            }
            if (target.tagName === "DIV") {
                target = target.parentNode;
            }
            if (target.tagName !== 'TD') { return };

            const row = target.parentNode.rowIndex;
            const colum = this.defaultDate[row].indexOf(Number(target.innerText));
            this.selectDays = [row, colum];
            this.$emit('selectDay', target.innerText + "号");
            // 类型显示日
            if (this.type === 'day') {
                this.$emit("showDate", target.innerText + "号");
                return;
            }

        },

        // 用户数日值 选中日期
        userInputselect(val) {
            for (let pi = 0; pi < this.defaultDate.length; pi++) {
                for (let si = 0; si < this.defaultDate[pi].length; si++) {
                    if (val === this.defaultDate[pi][si]) {
                        this.selectDays = [pi, si];
                        this.$emit("showDate", val + "号");
                        break;
                    }
                }
            }
        }
    },
    watch: {
        // 显示日历
        showDatePicker(oldval) {
            this.showDate = oldval;
        },
    },

};
</script>
<style scoped>
.es-date-table_all {
    color: #606266;
    border: 1px solid #e4e7ed;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    z-index: 2009;
    width: 322px;
    display: none;
    padding: 15px;
    position: relative;
}
.dateTriangle {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
    -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    top: -6px;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #ebeef5;
}
.dateTriangle::before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    content: " ";
    border-width: 6px;
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff;
}
/* 日历显示 */
.showDatePicker {
    display: block;
    position: absolute;
    top: 50px;
    left: 0;
}
.es-date-table {
    display: table;
    table-layout: fixed;
    width: 100%;
    font-size: 12px;
}
.es-date-table td {
    width: 32px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
    height: 30px;
}
/* 选中效果 */
.es-date-table td.today {
    position: relative;
    width: 32px;
    padding: 4px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
}
.es-date-table td div {
    padding: 3px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 30px;
}
/* 日历日期选中 */
.es-date-table td span {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    line-height: 24px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    border-radius: 50%;
}

.es-date-table td .current:not(.disabled) span {
    color: #fff;
    background-color: #409eff;
}
.es-date-table td span:hover {
    color: #409eff;
}
</style>