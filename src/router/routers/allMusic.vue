<script setup>
    import flexColumnRow from '../../components/flexColumnRow.vue';
    import musicCard from '../../components/musicCard.vue';
    import iconToClick from '../../components/iconToClick.vue';
import iconWithText from '../../components/iconWithText.vue'

</script>

<template>
    <h1>全部音乐</h1>
    <div class="buttomTrack">
        <iconWithText type="background" @click="" >
            <template #svg>
                <i class="bi bi-play-fill"></i>
            </template>
            <template #text>
                播放全部
            </template>
        </iconWithText>
    </div>
</template>

<style scoped>
.buttomTrack{
    display: flex;

}
.buttomTrack>*{
    width: fit-content;
}
</style>