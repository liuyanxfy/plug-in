<template>
    <div>

        <div>

            <div class="icon-8">
                <i class="path1"></i>
            </div>
            <div class="dem01"></div>
            <p>this is font-size</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {


}
</script>
<style lang="css">
* {
    font-size: 30px;
}
p {
    margin: 0;
    padding: 0;
}
.dem01 {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: aqua;
}
</style>