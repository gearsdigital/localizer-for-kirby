<template>
  <k-button-group>
    <k-button icon="add" @click="$refs.dialog.open()">Add Language</k-button>
    <k-dialog ref="dialog">
      <header>
        <k-headline>Select language</k-headline>
        <k-text size="small" theme="help">
          Please pick one of all available languages you want to customize...
        </k-text>
      </header>

      <div class="k-panel-localizer-translations">
        <k-item
          v-for="lang in languages"
          :key="lang.id"
          :text="lang.name"
          :info="lang.id"
          :class="{ disabled: lang.disabled }"
          @click="selectLanguage(lang)" />
      </div>

      <template slot="footer">
        <k-button-group>
          <k-button icon="cancel" @click="cancel">Cancel</k-button>
          <k-button icon="check" @click="addTranslationGroup">Add</k-button>
        </k-button-group>
      </template>
    </k-dialog>
  </k-button-group>
</template>
<script>
import { TRANSLATION_GROUP_ADD } from "../store/mutiation-types";

export default {
  name: "LocalizerLanguageDialog",
  props: {
    openDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      language: {},
    };
  },
  computed: {
    languages() {
      return this.$store.getters.languages;
    },
  },
  methods: {
    selectLanguage(language) {
      this.language = language;
    },
    addTranslationGroup() {
      this.$store.dispatch(TRANSLATION_GROUP_ADD, this.language);
      this.$refs.dialog.close();
      this.language = {};
    },
    cancel() {
      this.$refs.dialog.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.k-panel-localizer-translations {
  margin-top: var(--spacing-4);
  grid-gap: var(--spacing-2);
  grid-template-columns: 1fr;

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .k-item {
    margin-bottom: 4px;
  }
}
</style>
