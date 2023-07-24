<script setup>
    defineProps({
        type: String,
    })
</script>

<template>
    <div :style="(type == 'background')?'background-color:#00000008':null" class="buttom">
        <div class="svg">
            <slot name="svg"></slot>
        </div>
        
        <div class="text" :style="(type == 'hidden')?'color: #0000;--delay:0s':null">
            <slot name="text"></slot>
        </div>
        

    </div>
</template>

<style scoped>
    .buttom{
        height: 34px;
        width: 100%;
        display: flex;
        gap: 7px;
        align-items: center;
        border-radius: 7px;
        box-sizing: border-box;
        padding: 0 11px ;
        cursor: pointer;
    }
    .buttom:hover{
        background-color: #00000008;
    }
    .text{
        white-space: nowrap;
        color: #000e;
        --delay:0.125s;
        transition: all 0.125s cubic-bezier(.5,.3,.2,1) var(--delay)
    }
</style>