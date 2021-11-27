export default {
  updateLanguages(state, payload) {
    state.languages = payload;
  },

  udpateTranslations(state, payload) {
    state.translations = payload;
  },

  addTranslationGroup(state, payload) {
    state.translations.push({
      language: payload,
      translations: [],
    });
  },

  removeTranslationGroup(state, payload) {
    state.translations = state.translations.filter(
      (translation) => translation.language.id !== payload
    );
  },

  // Add translation to a translation group (language)
  addTranslation(state, payload) {
    const index = state.translations.findIndex(({ language }) => language.id === payload.id);

    if (index !== -1) {
      state.translations[index].translations.push(payload.item);
    }
  },

  // Remove translation from a translation group (language)
  removeTranslation(state, payload) {
    const index = state.translations.findIndex(({ language }) => language.id === payload.id);

    if (index !== -1) {
      state.translations[index].translations = [
        ...state.translations[index].translations.filter(
          (translations) => translations.key !== payload.key
        ),
      ];
    }
  },

  editTranslation(state, payload) {
    const index = state.translations.findIndex(({ language }) => language.id === payload.id);

    if (index !== -1) {
      state.translations[index].translations = [
        ...state.translations[index].translations.map((translation) => {
          if (translation.key === payload.key) {
            return {
              ...translation,
              override: payload.override,
            };
          }
          return translation;
        }),
      ];
    }
  },

  dirty(state, payload) {
    state.dirty = payload;
  },
};
