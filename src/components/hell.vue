<template>
    <div class="hello">
        <el-date-picker v-model="value11" type="date" placeholder="选择日期" value-format="yyyy" format="yyyy">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            value11: '',
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
