<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': pages.has_pre === false }">
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)">
            <span aria-hidden="true">上一頁</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{ 'active': page === pages.current_page }">
          <a class="page-link" href="#"
           @click.prevent="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': pages.has_next === false }">
          <a class="page-link" href="#" aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)">
            <span aria-hidden="true">下一頁</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>
<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
    },
  },
};

</script>
