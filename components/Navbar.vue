<template>
    <div>
      <div class="bg-white px-4 py-[0.65rem]">
        <div class="container mx-auto">
          <div class="text-gray-800 text-2xl font-bold">Contoso</div>
        </div>
      </div>
      <nav>
        <template v-for="(path, index) in paths" :key="index">
          <div>
            <NuxtLink
              :to="path.url"
              :class="[
                'text-lg mb-4 hover:bg-gray-50',
                { 'text-lg font-semibold mb-4 bg-gray-100': ($route.path.substring(1,).startsWith(path.url.substring(1,)) && path.url !== '/') || (path.url === '/' && $route.path === '/')}
              ]"
            >
              <div class="py-2 px-4 m-2 rounded-md bg-inherit">{{ path.name }}</div>
            </NuxtLink>
          </div>
        </template>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      paths() {
        return [
          { name: "Home", url: "/" },
          { name: "Items", url: "/items" },
          { name: "Sales", url: "/sales" }
        ];
      }
    }
  };
  </script>
  