<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto flex bg-white min-h-screen p-2">
      <!-- Sidebar -->
      <div class="w-1/4 border-r-2 border-gray-100">
        <!-- Navbar Component -->
        <Navbar />
      </div>

      <!-- Form to edit item -->
      <div class="w-3/4 ml-4">
        <div class="bg-white p-4">
          <!-- Breadcrumb Component -->
          <Breadcrumb
            :paths="[{ name: 'Items', url: '/items' }, { name: 'Edit' }]"
          />
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="id" class="block text-gray-700 font-bold mb-2"
                >ID</label
              >
              <input
                disabled
                type="text"
                id="id"
                name="id"
                v-model="formData.id"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="title" class="block text-gray-700 font-bold mb-2"
                >Title</label
              >
              <input
                type="text"
                id="title"
                name="title"
                v-model="formData.title"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="price" class="block text-gray-700 font-bold mb-2"
                >Price</label
              >
              <input
                type="text"
                id="price"
                name="price"
                v-model="formData.price"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

let formData = ref({ id: "", title: "", price: "" });
const route = useRoute();
const itemId = route.params.id;

const { data: item } = await useFetch(`/api/Items/${itemId}`);
formData = item;

const handleSubmit = async () => {
    const {data: newItem, error} = await useFetch(`/api/Items/${itemId}`, {
      method: "PUT",
      body: {
            id: formData.value.id,
            title: formData.value.title,
            price: formData.value.price
        }
    });
    if (error.value) {
      console.error("Error updating item:", error);
    }
    navigateTo("/items");
};

</script>
