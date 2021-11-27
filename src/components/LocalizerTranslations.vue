<template>
  <k-loader v-if="!pagedTranslationDataList.length" />
  <article v-else>
    <k-items class="k-panel-localizer-translations">
      <k-item
        v-for="entry in pagedTranslationDataList"
        :key="entry.key"
        :text="entry.text"
        :info="entry.key"
        :class="{ disabled: entry.disabled }"
        layout="cards"
        @click="$emit('select', entry)" />
    </k-items>
    <k-pagination
      ref="pagination"
      align="center"
      :details="true"
      :limit="pagination.limit"
      :total="paginationTotal"
      @paginate="updatePagination" />
  </article>
</template>

<script>
export default {
  name: "LocalizerTranslations",
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      translations: [],
      pagination: {
        limit: 10,
        total: 0,
        page: 1,
      },
    };
  },
  computed: {
    paginationTotal() {
      return this.translationDataList.length;
    },
    translationDataList() {
      if (Object.keys(this.translations).length === 0) {
        return [];
      }
      return Object.entries(this.translations).map((entry) => ({
        key: entry[0],
        text: entry[1],
        disabled: this.selectedTranslations.includes(entry[0]),
      }));
    },
    pagedTranslationDataList() {
      if (this.translationDataList.length === 0) {
        return [];
      }

      // This is only poor-mans pager because the /translations/:lang
      // endpoint isn't pagable out of the box.
      return this.translationDataList.slice(this.pagination.offset).slice(0, this.pagination.limit);
    },
    selectedTranslations() {
      return this.$store.getters.getTranslationsForLanguage(this.code);
    },
  },
  mounted() {
    this.fetchTranslations();
  },
  methods: {
    async fetchTranslations() {
      const { data } = await this.$api.get(`translations/${this.code}`);
      this.translations = data;
    },
    updatePagination(pagination) {
      this.pagination = pagination;
    },
  },
};
</script>

<style lang="scss" scoped>
.k-loader {
  min-height: 6rem;
  display: flex;
  justify-content: center;
  margin-bottom: -1rem;
}

.k-panel-localizer-translations {
  display: grid;
}

.k-panel-localizer-translations {
  margin-top: var(--spacing-4);
  grid-gap: var(--spacing-2px);
  grid-template-columns: 1fr;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
