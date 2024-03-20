<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto flex bg-white min-h-screen p-2">
      <div class="w-1/4 border-r-2 border-gray-100">
        <!-- Navbar Component -->
        <Navbar />
        <!-- Replace this with your Navbar component -->
      </div>

      <div class="w-3/4 ml-4">
        <div class="bg-white p-4">
          <!-- Breadcrumb Component -->
          <Breadcrumb :paths="[{ name: 'Items' }]" />
          <div>
            <div v-for="item in items" :key="item.id" class="border-b py-2">
              <div class="flex justify-between">
                <div class="text-lg font-semibold">
                  #{{ item.id }} - {{ item.title }}
                </div>
                <div class="text-gray-600">${{ item.price }}</div>
              </div>
              <div class="flex justify-end">
                <NuxtLink
                  :to="`/items/edit/${item.id}`"
                  class="text-blue-500 hover:text-blue-700 mr-4"
                  >Edit</NuxtLink
                >
                <button
                  @click="handleDelete(item.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/items/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create New Item
            </NuxtLink>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data: items, refresh: refreshItems } = await useFetch("/api/Items");

const handleDelete = async (itemId) => {
  const {data, error} = await fetch(`/api/Items/${itemId}`, {
    method: "DELETE",
  });
  if (error.value) {
    console.error("Error deleting item:", error);
  }
  // Trigger re-fetch after deletion
  refreshItems();
};
</script>
