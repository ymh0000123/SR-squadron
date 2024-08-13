<template>
    <div id="interactivity">
        <div v-if="responseData && responseData.length">
            <div v-for="(item, index) in responseData" :key="index" style="cursor: pointer;"
                @click="item && look(item.id)">
                <div id="user">
                    <img :src="`https://github.com/` + item?.user_login + `.png`"
                        style="width: 20px;border-radius: 50%;border: 2px solid rgb(231,219,181);" alt="GitHub Avatar">
                    {{ item?.user_login }}
                </div>
                <h2 id="title">{{ item?.title }}</h2>
                <p>{{ truncateAndHideAfterNewline(item?.body, 100) }}</p>
                <div>{{ item?.created_at ? formatDate(item.created_at) : '' }}</div>
            </div>
        </div>
        <p v-else>
        <div class="loader"></div>
        </p>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const responseData = ref(null);

        const get = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_INTERACTIVITY);
                responseData.value = response.data;
            } catch (error) {
                console.log(error);
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
            formatDate,
            truncateAndHideAfterNewline,
            look,
        };
    }
};
</script>
