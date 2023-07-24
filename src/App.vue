<script>
    import topBar from './components/topBar.vue'
    import rightBlock from './components/rightBlock.vue'
    import leftBar from './components/leftBar.vue'




    export default {
        name: 'app',
        components: {
            topBar,
            leftBar,
            rightBlock
        },
        data() {
            return {
                leftBarState: 'short'
            }
        },
    }
</script>

<template>
<topBar :leftBarState="leftBarState"></topBar>
<div class="bottom">
    <leftBar @leftBarChange="(newState)=>{leftBarState = newState}"></leftBar>
    <rightBlock></rightBlock> 
</div>


</template>

<style scoped>
    .bottom{
        margin-top: 5px;
        display: flex;
        height: calc(100vh - 38px - 10px);
        width: calc(100% + 14px);
        margin-left: -7px;
    }
</style>
