<script setup>
    import { watch } from 'vue';

    watch()
</script>

<template>
    <div class="rowBox" ref="rowBox">
        <div class="flex toRight" ref="flexrow">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
    .rowBox{
        display: block;
        height: 130px;
        width: 100%;
        position: relative;
    }
    .flex.toRight{
        display: flex;
        position: relative;
        height: 120px;
        flex-direction: column;
    }
</style>