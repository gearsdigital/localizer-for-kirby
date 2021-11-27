<template>
  <table v-if="entry.translations.length > 0">
    <tr>
      <th>Key</th>
      <th>Text</th>
      <th>Override</th>
      <th></th>
    </tr>

    <tr v-for="(translation, i) in entry.translations" :key="translation.key">
      <td>
        <code>{{ translation.key }}</code>
      </td>
      <td>{{ translation.text }}</td>
      <td v-if="translation.override">
        <b>{{ translation.override }}</b>
      </td>
      <td v-if="!translation.override">–</td>
      <td>
        <k-dropdown>
          <k-button icon="dots" @click="$refs.dropdown[i].toggle()"></k-button>
          <k-dropdown-content
            ref="dropdown"
            align="right"
            :options="[
              {
                icon: 'edit',
                text: 'Edit',
                click: () =>
                  $emit('edit', {
                    id: entry.language.id,
                    key: translation.key,
                    text: translation.text,
                    override: translation.override,
                  }),
              },
              {
                icon: 'trash',
                text: 'Delete',
                click: () =>
                  $emit('remove', {
                    id: entry.language.id,
                    key: translation.key,
                  }),
              },
            ]" />
        </k-dropdown>
      </td>
    </tr>
  </table>
  <k-empty v-else layout="cards" @click="$emit('add', entry.language.id)">
    Add your first translation.
  </k-empty>
</template>
<script>
export default {
  name: "LocalizerTranslationListEntry",
  props: {
    entry: {
      type: Object,
      default: null,
    },
  },
};
</script>
<style lang="scss">
table {
  text-align: left;
  font-variant-numeric: tabular-nums;
  border-spacing: 1px;
  width: 100%;
  font-variant-numeric: tabular-nums;
  table-layout: fixed;

  th {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-gray-600);
  }

  th,
  td {
    background-color: var(--color-white);
    font-weight: var(--font-normal);
    font-size: var(--text-sm);
    padding: var(--spacing-2);
    text-align: left;

    &:last-child {
      width: 3rem;
      text-align: center;
    }

    .k-field-header {
      display: none;
    }
  }

  code {
    font-size: var(--text-xs);
    font-family: var(--font-mono);
    background: var(--color-gray-100);
    display: inline-block;
    padding: var(--spacing-1);
    border-radius: var(--spacing-1);
  }

  tr:nth-of-type(even) {
    td {
      background-color: var(--color-gray-100);
    }
  }
}
</style>
