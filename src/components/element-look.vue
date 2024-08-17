<template>
    <div id="interactivity">
        <p v-if="loading">
        <div class="loader"></div>
        Loading...
        藿藿正在努力搬运数据
        </p>
        <p v-if="error">{{ error }}</p>
        <div v-if="filteredData">
            <h2 id="title">{{ filteredData.title }}</h2>
            <div style="border-top: 1px solid rgb(98,244,248); margin: 20px 0;"></div>
            <div v-html="parsedBody" id="parsedBody" class="interactivity"></div>
        </div>
    </div>
    <div v-if="filteredData && filteredData.timeline.length > 0" id="interactivity">
        <div id="user">
            <div style="display: flex;"><strong>发布者:</strong><img :src="github_avatar + filteredData.user_login"
                    style="width: 20px;border-radius: 50%;border: 2px solid rgb(231,219,181);" alt="GitHub Avatar">
                {{ filteredData.user_login }}</div>

            <strong>发布时间:</strong> {{ formatDate(filteredData.created_at) }}
            <strong>评论量:</strong> {{ filteredData.comments }}
        </div>
        <div style="border-top: 1px solid rgb(98,244,248); margin: 20px 0;"></div>
        <div>
            <div id="comment">评论</div>
            <ul class="interactivity">
                <div v-for="(event, index) in filteredTimeline" :key="index">
                    <p>
                    <div id="user" style="display: flex;">
                        <img :src="github_avatar + event.actor_login"
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
        <p><a :href="filteredData.html_url" target="_blank" style="">去 GitHub 评论</a></p>
    </div>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';

export default {
    setup(){
        let github_avatar;

        if (!import.meta.env.VITE_GITHUB_AVATAR) {
            github_avatar = 'https://avatars.githubusercontent.com/';
            console.log('ok');
        } else {
            github_avatar = import.meta.env.VITE_GITHUB_AVATAR;
        }
        return {
            github_avatar,
        }
    },
    data() {
        return {
            data: null,
            filteredData: null,
            loading: true,
            error: null,
        };
    },
    computed: {
        filteredTimeline() {
            return this.filteredData ? this.filteredData.timeline.filter(event => event.body !== '没有正文').map(event => {
                return {
                    ...event,
                    parsedBody: marked(event.body)
                };
            }) : [];
        },
        parsedBody() {
            return this.filteredData ? marked(this.filteredData.body) : '';
        }
    },
    methods: {
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        getLookPagesId() {
            return localStorage.getItem('lookPagesId'); // 从浏览器存储获取 lookPagesId
        }
    },
    mounted() {
        axios.get(import.meta.env.VITE_INTERACTIVITY)
            .then(response => {
                const lookPagesId = this.getLookPagesId(); // 获取 lookPagesId
                const data = response.data;
                // 筛选出与 lookPagesId 匹配的内容
                this.filteredData = data.find(item => item.id == lookPagesId);
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
#parsedBody img {
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
    max-height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
}

.interactivity::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.interactivity::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(98, 244, 248);
}
.interactivity img{
    max-height: 100%;
}
@media (max-width: 980px) {
    .interactivity {
        max-height: 30vh;
    }
}
</style>