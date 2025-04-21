<template>
    <div class="loading-overlay">
        <div class="loading-content">
            <v-img src="../../public/logo.svg" cover height="150" width="250" class="logo-overlay" />
            <v-progress-circular indeterminate color="#81b620" size="74" width="10" style="filter: drop-shadow(0px 0px 4px #81b620);" />
        </div>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>