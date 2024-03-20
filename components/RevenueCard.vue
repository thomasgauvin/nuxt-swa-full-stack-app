<template>
    <div class="border rounded p-4">
      <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
      <p class="text-xl">${{ revenue }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      revenue: {
        type: Number,
        required: true
      }
    }
  }
  </script>