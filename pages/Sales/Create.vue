<template>
    <div class="bg-gray-100 min-h-screen">
      <div class="container mx-auto flex bg-white min-h-screen p-2">
        <!-- Sidebar -->
        <div class="w-1/4 border-r-2 border-gray-100">
          <!-- Navbar Component -->
          <Navbar />
        </div>
  
        <!-- Main Content -->
        <div class="w-3/4 ml-4">
          <div class="bg-white p-4">
            <!-- Breadcrumb Component -->
            <Breadcrumb :paths="[{ name: 'Sales', url: '/sales' }, { name: 'Create' }]" />
  
            <!-- Form to create new sale -->
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="id" class="block text-gray-700 font-bold mb-2">ID</label>
                <input type="text" id="id" name="id" v-model="formData.id" placeholder="101" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="date" class="block text-gray-700 font-bold mb-2">Date</label>
                <input type="date" id="date" name="date" v-model="formData.date" placeholder="2024-03-20" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">Items</label>
                <div v-for="(item, index) in formData.items" :key="index" class="flex items-center mb-2">
                  <select v-model="item.id" @change="handleItemChange(index)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
                    <option value="">Select Item</option>
                    <option v-for="item in items" :key="item.id" :value="item.id">{{ item.title }}</option>
                  </select>
                  <input type="number" v-model="item.quantity" @input="handleItemChange(index)" placeholder="Quantity" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
                  <button type="button" @click="handleRemoveItem(index)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">-</button>
                </div>
                <button type="button" @click="handleAddItem" class="bg-white border-2 border-blue-500 hover:bg-gray-50 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Item</button>
              </div>
              <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Create Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const formData = ref({
    id: '', 
    date: '',
    items: [{ id: '', quantity: 0 }]
  });
  const { data: items, refresh: refreshItems } = await useFetch("/api/Items");

  const handleSubmit = async () => {
    if (!formData.value.date || !formData.value.id) {
        console.error("Please fill out all fields");
        return;
    }
    console.log(formData.value.date)
    formData.value.date = new Date(formData.value.date).toISOString();
    const { data: newSale, error} = await useFetch('/api/Sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: formData.value.id,
        date: formData.value.date,
        items: formData.value.items,
      }
    });
    if (error.value) {
      console.error('Error creating sale:', error);
      return;
    }
    navigateTo(`/sales`);
  };  
  
  const handleItemChange = (index) => {
    formData.value.items[index].quantity = parseInt(formData.value.items[index].quantity, 10);
  };
  
  const handleAddItem = () => {
    formData.value.items.push({ id: '', quantity: 0 });
  };
  
  const handleRemoveItem = (index) => {
    formData.value.items.splice(index, 1);
  };
  
  </script>
  