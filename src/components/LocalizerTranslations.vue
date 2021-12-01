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
      :total="pagination.total"
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
    pagedTranslationDataList() {
      if (Object.keys(this.translations).length === 0) {
        return [];
      }
      return Object.entries(this.translations).map((entry) => ({
        key: entry[0],
        text: entry[1],
        disabled: this.selectedTranslations.includes(entry[0]),
      }));
    },
    selectedTranslations() {
      return this.$store.getters.getTranslationsForLanguage(this.code);
    },
  },
  mounted() {
    this.fetchTranslations();
  },
  methods: {
    async fetchTranslations(page = 1) {
      const { data, pagination } = await this.$api.get(`localizer/translations/${this.code}`, {
        page,
      });
      this.translations = data;
      this.pagination = pagination;
    },
    updatePagination(pagination) {
      this.fetchTranslations(pagination.page);
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
