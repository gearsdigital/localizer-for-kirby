<template>
  <div>
    <k-input
      v-model="q"
      :icon="isLoading ? 'loader' : 'search'"
      :placeholder="$t('search') + ' …'"
      autofocus="true"
      class="k-dialog-search"
      type="text" />

    <div v-if="pagedTranslationDataList.length > 0" class="k-panel-localizer-translations">
      <k-item
        v-for="entry in pagedTranslationDataList"
        :key="entry.key"
        :text="entry.text"
        :info="entry.key"
        :class="{ disabled: entry.disabled }"
        layout="cards"
        @click="$emit('select', entry)" />
    </div>

    <k-empty v-else>Nothing found</k-empty>

    <k-pagination
      ref="pagination"
      align="center"
      :details="true"
      :limit="pagination.limit"
      :total="pagination.total"
      @paginate="updatePagination" />
  </div>
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
      q: null,
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
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  watch: {
    q: function (val, oldVal) {
      if (val !== oldVal) {
        this.fetchTranslations();
      }
    },
  },
  created() {
    this.fetchTranslations = this.$helper.debounce(this.fetchTranslations, 250);
  },
  mounted() {
    this.fetchTranslations();
  },
  methods: {
    async fetchTranslations(page = 1) {
      const { data, pagination } = await this.$api.get(`localizer/translations/${this.code}`, {
        page,
        q: this.q,
      });
      this.translations = data ?? [];
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
  margin-top: var(--spacing-4);
  grid-gap: var(--spacing-2px);
  grid-template-columns: 1fr;

  .k-item {
    margin-bottom: 4px;
  }
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
