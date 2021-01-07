<template>
    <div class="pageConter">
        <div class="title">{{name}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'pageContent',
    data() {
        return {

        }
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less">
    .pageConter {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .title {
        color: rgba(51, 51, 51, 1);
        font-size: 16px;
        font-weight: bold;
    }
</style>