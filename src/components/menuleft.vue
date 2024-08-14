<template>
    <div id="menuleft">
        <div id="info">
            <img src="/favicon.ico" :alt="appName">
            <!-- 使用动态绑定，将应用名称从环境变量中获取 -->
            <h1 id="name">{{ appName }}</h1>
        </div>
    </div>
    <div id="button">
        <div id="button-1">
            <button @click="open('/')">Home</button>
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
    },
    setup() {
        const open = (url) => {
            // 检查url是否以 / 开头
            if (url.startsWith('/')) {
                // 如果以 / 开头，在当前页面导航
                window.location.href = url;
            } else {
                // 如果不是以 / 开头，在新标签页中打开
                window.open(url, "_blank");
            }
        }

        return {
            open
        }
    }
}
</script>
<style scoped>
#name {
    color: rgb(192, 228, 233);
}
</style>
