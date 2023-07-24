<script setup>
</script>

<template>
    <div class="buttom">
        <slot id="sloted"></slot>
    </div>
</template>

<style scoped>
    .buttom{ 
        height: 34px;
        width: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 7px;
    }
    .buttom:hover{
        background-color: #00000008;
    }
</style>