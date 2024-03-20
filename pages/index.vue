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
          <Breadcrumb :paths="[{ name: 'Overview' }]" />

          <!-- Revenue Cards -->
          <div class="grid grid-cols-3 gap-4">
            <RevenueCard
              title="Past 30 Days Revenue"
              :revenue="calculateRevenueForDays(30)"
            />
            <RevenueCard
              title="Past 90 Days Revenue"
              :revenue="calculateRevenueForDays(90)"
            />
            <RevenueCard
              title="Past 365 Days Revenue"
              :revenue="calculateRevenueForDays(365)"
            />
          </div>

          <!-- Recent Sales -->
          <div class="mt-8">
            <h2 class="text-lg font-semibold mb-4">Recent Sales</h2>
            <div
              v-for="sale in getRecentSales()"
              :key="sale.id"
              class="border rounded p-4 mb-4"
            >
              <p class="text-lg font-semibold">Sale ID: {{ sale.id }}</p>
              <p class="text-gray-600">
                Date: {{ new Date(sale.date).toLocaleDateString() }}
              </p>
              <p class="text-gray-600">
                Total Revenue: ${{ calculateTotalRevenue(sale) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const sales = ref([]);
const items = ref([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  try {
    const salesResponse = await fetch("/api/Sales");
    const itemsResponse = await fetch("/api/Items");

    if (!salesResponse.ok || !itemsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    sales.value = await salesResponse.json();
    items.value = await itemsResponse.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Calculate revenue for the past n days
const calculateRevenueForDays = (days) => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  return sales.value.reduce((acc, sale) => {
    const saleDate = new Date(sale.date);
    if (saleDate >= pastDate && saleDate <= today) {
      acc += calculateTotalRevenue(sale);
    }
    return acc;
  }, 0);
};

// Calculate total revenue for a sale
const calculateTotalRevenue = (sale) => {
  return sale.items.reduce((acc, item) => {
    const itemData = items.value.find((i) => i.id === item.id);
    const itemPrice = itemData ? itemData.price : 0;
    return acc + itemPrice * item.quantity;
  }, 0);
};

// Get recent sales
const getRecentSales = () => {
  return sales.value.slice(0, 5); // Get the first 5 sales
};
</script>
