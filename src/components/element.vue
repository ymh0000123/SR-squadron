<template>
    <div id="interactivity">
        <div v-if="responseData && responseData.length">
            <div v-for="(item, index) in responseData" :key="index">
                <div id="user">{{ item.user_login }}</div>
                <h2 id="title">{{ item.title }}</h2>
                <p>{{ item.body }}</p>
                <div>{{ formatDate(item.created_at) }}</div>
            </div>
        </div>
        <p v-else>No data available</p>
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
                console.log(response.data);
                responseData.value = response.data;
            } catch (error) {
                console.log(error);
            }
        };

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        onMounted(() => {
            console.log(import.meta.env.VITE_INTERACTIVITY);
            get();
        });

        return {
            responseData,
            formatDate,
        };
    }
};
</script>
