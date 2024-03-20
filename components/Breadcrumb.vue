<template>
  <div class="text-md text-gray-400 mb-4">
    <template v-for="(path, index) in paths" :key="index">
      <template v-if="path.url">
        <NuxtLink :to="path.url" class="hover:text-gray-800">{{
          path.name
        }}</NuxtLink>
      </template>
      <template v-else>
        <span>{{ path.name }}</span>
      </template>
      <template v-if="index !== paths.length - 1">
        <span class="mx-2">></span>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    paths: {
      type: Array,
      required: true,
    },
  },
};
</script>
