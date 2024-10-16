<template>


    <v-container>

    </v-container>
</template>
<script>

export default {
    data() {
        return {
            selectedTab: 0
        }
    },
    created() {
        if (this.$route.path == '/index') {
            this.selectedTab = 0
        } else if (this.$route.path == '/materials') {
            this.selectedTab = 1
        } else if (this.$route.path == '/complaint') {
            this.selectedTab = 2
        }
    },
    methods: {
        selectTab(index) {
            this.selectedTab = index;
            switch (index) {
                case 0:
                    this.$router.push('/');
                    break;
                case 1:
                    this.$router.push('/materials');
                    break;
                case 2:
                    this.$router.push('/complaint');
                    break;
                default:
                    console.warn('Tab index out of range');
                    break;
            }
        },
    },

}
</script>
<style scoped>
.login-text {
    color: white;
    font-size: 20px;
}

v-application {
    background-color: #818181;
}

.tab-text {
    color: rgb(48, 48, 48);
    font-size: 24px;
    margin: 0 20px;
    cursor: pointer;
    transition: font-weight 0.3s ease;
}

.tab-text.font-weight-bold {
    font-weight: 700;
}

.material-card {
    transition: transform 0.3s ease;
}

.material-card:hover {
    transform: scale(1.05);
}
</style>