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
          <Breadcrumb :paths="[{ name: 'Sales' }]" />

          <!-- Sales Content -->
          <div>
            <div
              v-for="sale in sales"
              :key="sale.id"
              class="border-b p-4 hover:bg-gray-50"
            >
              <div class="flex flex-row justify-between content-center">
                <div class="text-lg font-semibold">Sale ID: {{ sale.id }}</div>
                <div>
                  <div>
                    <NuxtLink
                      :to="`/sales/edit/${sale.id}`"
                      class="text-blue-500 hover:text-blue-700 mr-4" > Edit
                    </NuxtLink>
                    <button
                      @click="handleDelete(sale.id)"
                      class="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div class="text-gray-600">
                Date: {{ new Date(sale.date).toISOString().split("T")[0] }}
              </div>
              <div>
                <div class="font-semibold">Items:</div>
                <table class="w-full">
                  <tr v-for="(item, index) in sale.items" :key="index">
                    <td class="w-[20rem]">
                      #{{ item.id }} -
                      {{ items.find((i) => i.id === item.id)?.title }}
                    </td>
                    <td>Quantity: {{ item.quantity }}</td>
                    <td class="text-right">
                      ${{ calculateRevenueForItem(item, item.quantity) }}
                    </td>
                  </tr>
                </table>
                <div class="text-lg font-semibold mt-2 text-right">
                  Total: ${{ calculateTotalRevenue(sale) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Create New Sale Button -->
          <div class="mt-4">
            <NuxtLink
              to="/sales/create"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create New Sale
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let itemPrices = {};
const { data: sales, refresh: refreshSales } = await useFetch("/api/Sales");
const { data: items, refresh: refreshItems } = await useFetch("/api/Items");
if (items) {
  console.log(items.value)
  for(let i = 0; i < items.value.length; i++) {
    itemPrices[items.value[i].id] = items.value[i].price;
  }
}

const handleDelete = async (saleId) => {
  try {
    await fetch(`/api/Sales/${saleId}`, {
      method: "DELETE",
    });
    // Trigger re-fetch after deletion
    refreshSales();
  } catch (error) {
    console.error("Error deleting sale:", error);
  }
};

const calculateRevenueForItem = (item, quantity) => {
  console.log(itemPrices)
  console.log(item, quantity, itemPrices[item.id])
  const itemPrice = itemPrices[item.id] || 0; // Use 0 if price is not available
  return itemPrice * quantity;
};

const calculateTotalRevenue = (sale) => {
  console.log(sale.items, itemPrices)
  return sale.items.reduce((acc, item) => {
    const itemPrice = itemPrices[item.id] || 0; // Use 0 if price is not available
    return acc + itemPrice * item.quantity;
  }, 0);
};
</script>
