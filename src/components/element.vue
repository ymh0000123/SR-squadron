<template>
    <div class="list">
        <div v-if="responseData && responseData.length">
            <div v-for="(item, index) in responseData" :key="index" style="cursor: pointer;"
                @click="item && look(item.id)" id="interactivity">
                <div id="user" style="display: flex;">
                    <img :src="github_avatar + item?.user_login"
                        style="width: 20px;border-radius: 50%;border: 2px solid rgb(231,219,181);" alt="GitHub Avatar">
                    {{ item?.user_login }}
                </div>
                <h2 id="title">{{ item?.title }}</h2>
                <p>{{ truncateAndHideAfterNewline(item?.body, 70) }}</p>
                <div> #{{ item?.number }} 发布时间: {{ item?.created_at ? formatDate(item.created_at) : '' }} 评论数: {{
                    item?.comments }}</div>
            </div>
        </div>
        <p v-else>
        <div id="interactivity">
            <div class="loader"></div>
            藿藿正在努力搬运数据
        </div>

        </p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const responseData = ref(null);
        const error = ref(null);

        let github_avatar;

        if (!import.meta.env.VITE_GITHUB_AVATAR) {
            github_avatar = 'https://avatars.githubusercontent.com/';
            console.log('ok');
        } else {
            github_avatar = import.meta.env.VITE_GITHUB_AVATAR;
        }

        const get = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_INTERACTIVITY);
                responseData.value = response.data;
            } catch (err) {
                console.log(err);
                error.value = '藿藿正在搬运数据发现 Error fetching data: ' + err.message;
            }
        };

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        const truncateAndHideAfterNewline = (text, maxLength) => {
            const newlineIndex = text.indexOf('\n');
            let truncatedText = newlineIndex !== -1 ? text.slice(0, newlineIndex) : text;
            if (truncatedText.length > maxLength) {
                truncatedText = truncatedText.slice(0, maxLength) + '...';
            }
            return truncatedText;
        };

        onMounted(() => {
            get();
        });

        const look = (id) => {
            localStorage.setItem('lookPagesId', id)
            window.open(`/look.html`, '_blank');
        };

        return {
            responseData,
            error,
            formatDate,
            truncateAndHideAfterNewline,
            look,
            github_avatar
        };
    }
};
</script>
<style scoped>
#interactivity:hover {
    border: 1px solid rgb(163, 195, 207);
}
.list {
    max-height: 80vh;
    width: 100%;
    overflow-y: overlay;
    overflow-x: hidden;
    padding-right: 50px;
}

.list::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(98, 244, 248);
    margin: 2px;
}
</style>