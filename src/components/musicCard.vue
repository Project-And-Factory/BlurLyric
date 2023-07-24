<script setup>
    defineProps({
        title: String,
        type: String
    })
</script>

<template>
    <div class="rowBox">
        <div v-if="type == 'gradient'" class="background gradient"></div>

        <h1>{{ title }}</h1>
    </div>
</template>

<style scoped>
    .rowBox{
        box-shadow: 0px 0px 3px #0005;
        width: 200px;
        height: initial;
        min-height: 100px;
        border-radius: 7px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        user-select: none;
    }

    h1{
        position: absolute;
        margin: 0;
        color: white;
        font-size: 24px;
        z-index: 1;
    }
    .background{
        position: absolute;

        top: -40px;
  right: -40px;
  bottom: -40px;
  left: -40px;
        aspect-ratio: 1 / 1;
    }
    .gradient{
        background: conic-gradient(from 180deg at 50% 50%, #12001B -97.5deg, #000000 14.05deg, #9890e3 54.01deg, #8000FF 113.42deg, #9890e3 185.62deg, #12001B 262.5deg, #000000 374.05deg);        animation: around 20s infinite;
        filter: blur(20px);
    }
    @keyframes around {
        from{
            transform-origin: 50%;
            transform: rotate(0deg);
        }
        to{
            
            transform-origin: 50%;
            transform: rotate(360deg);
        }
    }
</style>
