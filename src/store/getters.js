export default {
  languages(state) {
    const selectedLanguages = state.translations.map(({ language }) => language.id);

    return state.languages.map((lang) => {
      return {
        ...lang,
        disabled: selectedLanguages.includes(lang.id),
      };
    });
  },

  getTranslationsForLanguage: (state) => (id) => {
    return state.translations
      .filter(({ language }) => language.id === id)
      .map(({ translations }) => translations.map((translation) => translation.key))
      .flat();
  },
};
