<template>
  <k-inside>
    <k-view class="k-localizer">
      <k-header class="k-localizer-header">
        <div class="headline-wrap">Localizer <span class="beta-badge">BETA</span></div>
        <k-text slot="right">
          <span class="k-localizer-header-desc">Override Panel and Plugin translations.</span>
        </k-text>
        <LocalizerLanguageDialog slot="left" />
      </k-header>

      <LocalizerTranslationList />

      <k-button-group v-if="isDirty">
        <nav data-theme="notice" class="k-form-buttons">
          <k-view>
            <k-button
              :text="$t('revert')"
              icon="undo"
              class="k-form-button"
              :disabled="isLoading"
              @click="revert" />
            <k-button
              :text="$t('save')"
              icon="check"
              class="k-form-button"
              :disabled="isLoading"
              @click="save" />
          </k-view>

          <k-dialog
            ref="revert"
            :submit-button="$t('revert')"
            icon="undo"
            theme="negative"
            @submit="revert">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <k-text v-html="$t('revert.confirm')" />
          </k-dialog>
        </nav>
      </k-button-group>

      <k-dialog
        ref="reloadDialog"
        submit-button="Reload"
        theme="positive"
        icon="undo"
        @submit="reload">
        <header>
          <k-headline>Reload Panel?</k-headline>
          <k-text size="small" theme="help">
            In order to apply your changes, you need to reload the panel manually.
          </k-text>
        </header>
      </k-dialog>
    </k-view>
  </k-inside>
</template>

<script>
import localizerModule from "../store";
import {
  DIRTY_CHECK,
  LANGUAGES_UPDATE,
  PERSIST,
  REVERT,
  TRANSLATIONS_UPDATE,
} from "../store/mutiation-types";
import LocalizerLanguageDialog from "./LocalizerLanguageDialog.vue";
import LocalizerTranslationList from "./LocalizerTranslationList.vue";

export default {
  name: "TranslationOverride",
  components: {
    LocalizerTranslationList,
    LocalizerLanguageDialog,
  },
  data() {
    return {
      initiallyLoaded: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    translations() {
      return this.$store.state.localizer.translations;
    },

    isDirty() {
      return this.$store.state.localizer.dirty;
    },
  },
  created() {
    this.$store.registerModule("localizer", localizerModule);
    this.$store.watch(
      (state) => state.localizer.translations,
      () => {
        if (this.initiallyLoaded) {
          this.$store.dispatch(DIRTY_CHECK);
        }
        this.initiallyLoaded = true;
      },
      {
        deep: true,
      }
    );
  },
  mounted() {
    this.loadLanguages();
    this.loadTranslations();
  },
  methods: {
    async loadLanguages() {
      const { data } = await this.$api.get("/translations");
      this.$store.dispatch(LANGUAGES_UPDATE, data);
    },
    async loadTranslations() {
      const translations = await this.$api.get("/localizer/translations");
      this.$store.dispatch(TRANSLATIONS_UPDATE, translations);
      this.$store.dispatch(PERSIST);
    },
    async save() {
      await this.$api.post("/localizer/translations", this.translations);
      this.$store.dispatch(TRANSLATIONS_UPDATE, this.translations);
      this.$store.dispatch(PERSIST);
      this.$store.dispatch(DIRTY_CHECK);

      this.$refs.reloadDialog.open();
    },
    revert() {
      this.$store.dispatch(REVERT);
      this.$store.dispatch(PERSIST);
      this.$store.dispatch(DIRTY_CHECK);
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.k-form-buttons {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
}

.k-localizer-header {
  .headline-wrap {
    display: flex;
  }

  .k-localizer-header-desc {
    font-size: var(--text-sm);
  }

  .beta-badge {
    align-self: flex-start;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    padding: var(--spacing-1);
    border-radius: var(--spacing-1);
    background-color: var(--color-yellow-200);
    font-weight: 300;
    line-height: 1;
    flex-grow: 0;
    display: inline-block;
    margin-left: var(--spacing-2);
  }
}
</style>
