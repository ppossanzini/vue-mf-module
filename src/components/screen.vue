<template>
  <div v-show="isVisible">
    <component v-if="currentView" v-bind:is="currentView" :value="model" :key="currentViewUID"></component>
  </div>
</template>
<script lang="ts" src="./screen.ts"></script>