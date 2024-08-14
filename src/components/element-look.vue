<template>
    <div id="interactivity">
        <p v-if="loading">
            <div class="loader"></div>
            Loading...
            藿藿正在努力搬运数据
        </p>
        <p v-if="error">{{ error }}</p>
        <div v-if="data">
            <h2 id="title">{{ data.title }}</h2>
            <div id="user">
                <strong>发布者:</strong>
                <img :src="'https://github.com/' + data.user_login + '.png'"
                    style="width: 20px;border-radius: 50%;border: 2px solid rgb(231,219,181);" alt="GitHub Avatar">
                {{ data.user_login }}
                <strong>发布时间:</strong> {{ formatDate(data.created_at) }}
                <strong>评论量:</strong> {{ data.comments }}
            </div>
            <div style="border-top: 1px solid rgb(98,244,248); margin: 20px 0;"></div>
            <div v-html="parsedBody" id="parsedBody" class="interactivity"></div>
        </div>
    </div>

    <div id="interactivity" v-if="data">
        <div>
            <div id="comment">评论</div>
            <div style="border-top: 1px solid rgb(98,244,248); margin: 20px 0;"></div>
            <ul>
                <div v-for="(event, index) in filteredTimeline" :key="index">
                    <p>
                        <div id="user">
                            <img :src="`https://github.com/` + event.actor_login + `.png`"
                                style="width: 20px;border-radius: 50%;border: 2px solid rgb(231,219,181);"
                                alt="GitHub Avatar">
                            {{ event.actor_login }}
                        </div>
                        <em>(回复时间 {{ formatDate(event.created_at) }})</em>:
                    </p> 
                    <div v-html="event.parsedBody" id="parsed-Body"></div>
                    <div style="border-top: 1px solid rgb(98,244,248); margin: 20px 0;"></div>
                </div>
            </ul>
        </div>
        <p><a :href="data.html_url" target="_blank" style="">去 GitHub 评论</a></p>
    </div>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';  // 引入 marked 库

export default {
    data() {
        return {
            data: null,
            loading: true,
            error: null,
        };
    },
    computed: {
        filteredTimeline() {
            // 过滤掉 `body` 为 "没有正文" 的时间线项
            // 并将 `body` 使用 `marked` 转换为 HTML
            return this.data ? this.data.timeline.filter(event => event.body !== '没有正文').map(event => {
                return {
                    ...event,
                    parsedBody: marked(event.body)
                };
            }) : [];
        },
        parsedBody() {
            // 将 data.body 解析为 HTML
            return this.data ? marked(this.data.body) : '';
        }
    },
    methods: {
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    },
    mounted() {
        axios.get(import.meta.env.VITE_INTERACTIVITY)
            .then(response => {
                // 假设返回的是一个数组，这里只取第一个元素进行处理
                this.data = response.data[0];
            })
            .catch(error => {
                this.error = '藿藿正在搬运数据发现 Error fetching data: ' + error.message;
            })
            .finally(() => {
                this.loading = false;
            });
    },
};
</script>
<style scoped>
#parsedBody img{
    width: 100%;
    max-width: 100%;
    height: auto;
}
#comment {
    font-size: 1.5em;
    color: rgb(206, 248, 255);
}
#parsed-Body {
    color: rgb(206, 248, 255);
}
</style>
<style scoped>
/* 基本容器样式 */
.interactivity {
    max-height: 500px;
    overflow-y: auto;
    scrollbar-color: rgb(98,244,248) transparent;
}

.interactivity::-webkit-scrollbar {
    width: 10px;
}

.interactivity::-webkit-scrollbar-thumb {
    background-color: #4a90e2;
    border-radius: 0px;
}

.interactivity::-webkit-scrollbar-track {
    display: none;
    background-color: #e0e0e0;
    border-radius: 0px;
}
</style>
