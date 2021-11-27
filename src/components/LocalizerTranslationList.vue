<template>
  <div>
    <div v-if="translationList.length">
      <section
        v-for="entry in translationList"
        :key="entry.language.id"
        class="k-localizer-section">
        <header class="k-section-header">
          <k-headline>
            {{ entry.language.name }}
            <abbr>{{ entry.language.id }}</abbr>
          </k-headline>
          <k-button-group
            :buttons="[
              {
                text: $t('add'),
                icon: 'add',
                click: () => openTranslationDialog(entry.language.id),
              },
              {
                text: $t('delete'),
                icon: 'trash',
                click: () => openDeleteDialog(entry),
              },
            ]" />
        </header>

        <LocalizerTranslationListEntry
          :entry="entry"
          @add="openTranslationDialog($event)"
          @remove="removeFromGroup"
          @edit="openTranslationEditDialog" />
      </section>
    </div>
    <k-empty v-else>Start by adding a language which you want to adapt.</k-empty>
    <k-dialog
      ref="deleteDialog"
      submit-button="Delete"
      theme="negative"
      icon="trash"
      @submit="removeTranslationGroup">
      <header>
        <k-headline>Delete »{{ dialogContent.language.name }}«</k-headline>
        <k-text size="small" theme="help">
          Do you really want to delete all custom translations for this language?
        </k-text>
      </header>
    </k-dialog>

    <k-dialog
      ref="addDialog"
      submit-button="Add"
      theme="positive"
      icon="add"
      size="medium"
      @submit="addSelectedTranslation">
      <header>
        <k-headline>Add translation</k-headline>
        <k-text size="small" theme="help"> Select the translation you want to override.</k-text>
      </header>

      <LocalizerTranslations :code="code" @select="select" />
    </k-dialog>

    <k-dialog
      ref="editDialog"
      submit-button="Save"
      theme="positive"
      icon="add"
      size="medium"
      @submit="saveEditedTranslation">
      <header class="edit-dialog-header">
        <k-headline>
          <code>{{ editDialogContent.key }}</code>
          <abbr>{{ editDialogContent.id }}</abbr>
        </k-headline>
        <k-text size="small" theme="help">Define your custom translation override.</k-text>
      </header>

      <k-form
        v-model="editDialogContent"
        :fields="{
          override: {
            label: false,
            counter: false,
            buttons: false,
            help: editDialogContent.text,
            type: 'textarea',
          },
        }" />
    </k-dialog>
  </div>
</template>

<script>
import {
  TRANSLATION_ADD,
  TRANSLATION_EDIT,
  TRANSLATION_GROUP_REMOVE,
  TRANSLATION_REMOVE,
} from "../store/mutiation-types";
import LocalizerTranslationListEntry from "./LocalizerTranslationListEntry.vue";
import LocalizerTranslations from "./LocalizerTranslations.vue";

export default {
  name: "LocalizerTranslationList",
  components: { LocalizerTranslationListEntry, LocalizerTranslations },
  data() {
    return {
      code: null,
      selected: {},
      dialogContent: {
        language: {},
        translations: [],
      },
      editDialogContent: {},
      translationCollection: [],
    };
  },
  computed: {
    translationList() {
      return this.$store.state.localizer.translations;
    },
  },
  methods: {
    removeTranslationGroup() {
      this.$store.dispatch(TRANSLATION_GROUP_REMOVE, this.dialogContent.language.id);
      this.$refs.deleteDialog.close();
    },
    openDeleteDialog(content) {
      this.dialogContent = content;
      this.$refs.deleteDialog.open();
    },
    openTranslationDialog(code) {
      this.code = code;
      this.$refs.addDialog.open();
    },
    openTranslationEditDialog(content) {
      this.editDialogContent = {
        ...content,
        override: content.override || content.text,
      };
      this.$refs.editDialog.open();
    },
    select(item) {
      this.selected = item;
    },
    addSelectedTranslation() {
      this.$store.dispatch(TRANSLATION_ADD, {
        id: this.code,
        item: this.selected,
      });
      this.$refs.addDialog.close();
    },
    removeFromGroup(translation) {
      this.$store.dispatch(TRANSLATION_REMOVE, translation);
    },
    saveEditedTranslation() {
      this.$store.dispatch(TRANSLATION_EDIT, this.editDialogContent);
      this.$refs.editDialog.close();
      this.editDialogContent = {};
    },
  },
};
</script>

<style lang="scss">
.k-localizer-section {
  margin-bottom: var(--spacing-8);
}

.k-localizer-section-header {
  margin-bottom: var(--spacing-2);
}

.k-headline code {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  padding: var(--spacing-1);
  border-radius: var(--spacing-1);
  background-color: var(--color-yellow-200);
  font-weight: 300;
}

.edit-dialog-header {
  margin-bottom: var(--spacing-2);
}
</style>
