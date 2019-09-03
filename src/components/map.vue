<template>
    <div>
        <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
            <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
                :icon="{url:img1,size: {width: 100, height: 100,},opts:{ imageSize:{width: 20, height: 50,}}}">

            </bm-marker>
        </baidu-map>
    </div>
</template>

<script>


export default {
    name: 'app',
    data() {
        return {
            img1: require("../assets/logo.png"),
        };
    },
};
</script>

<style>
.map {
    width: 1000px;
    height: 600px;
}
</style>
