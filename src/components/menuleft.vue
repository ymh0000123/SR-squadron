<template>
    <div id="menuleft">
        <div id="info">
            <img src="/favicon.ico">
            <!-- 使用动态绑定，将应用名称从环境变量中获取 -->
            <h1 id="name">{{ appName }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuLeft',
    data() {
        return {
            appName: import.meta.env.VITE_NAME  // 从环境变量中获取应用名称
        }
    }
}
</script>
<style scoped>
#name {
    color: rgb(192,228,233);
}
</style>
