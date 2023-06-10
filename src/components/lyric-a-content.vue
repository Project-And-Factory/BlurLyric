<script>

    export default{
        data(){
            return{}
        },
        methods:{
            change(){
                this.$emit('change',this.thisObject)
            }
        },
        props: {
            // lyric: Object,
            thisObject: Object
        },
        created(){
            this.$nextTick(()=>{
                this.$refs.obj.
            })
        }
    }

</script>

<template>
    <a ref="obj"> {{ this.thisObject.str }}</a>
</template>