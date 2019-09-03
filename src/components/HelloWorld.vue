<template>
    <div class="hello">
        {{$route.params.id}}
        <button @click="success()">success</button>
        <button @click="error()">error</button>
        <button @click="info()">info</button>
    </div>
</template>

<script>
import Notific from "./notification/notification.js";
export default {
    name: 'HelloWorld',
    components: {},
    methods: {
        success() {
            Notific.success({
                message: '计费方案下发成功',
            });
        },
        error() {
            Notific.error({
                message: '计费方案下发失败',
                href: '/',
            });
        },
        info() {
            Notific.info({
                message: '计费方案下发超时',
                href: '查看详情',
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    width: 400px;
    height: 100px;
}
</style>
