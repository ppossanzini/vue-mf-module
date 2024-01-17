<template>
  <div>
    <component :is="c" v-for="(c, idx) in Components" :disabled="disabled" :readonly="readonly" :key="idx" :id="id"
      :type="type" :metadata="metadata" v-model="Value" @click="click" @save="save" />
  </div>
</template>
<script lang="ts" src="./inject.ts"></script>