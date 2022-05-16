<template>
  <div class="discover">
    <discover-nav class="discNav"></discover-nav>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.discNav {
  margin-bottom: 20px;
}
</style>
