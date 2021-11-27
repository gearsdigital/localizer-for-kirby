import {
  DIRTY_CHECK,
  LANGUAGES_UPDATE,
  PERSIST,
  REVERT,
  TRANSLATION_ADD,
  TRANSLATION_EDIT,
  TRANSLATION_GROUP_ADD,
  TRANSLATION_GROUP_REMOVE,
  TRANSLATION_REMOVE,
  TRANSLATIONS_UPDATE,
} from "./mutiation-types";

export default {
  [LANGUAGES_UPDATE]({ commit }, payload) {
    commit("updateLanguages", payload);
  },

  [TRANSLATIONS_UPDATE]({ commit }, payload) {
    commit("udpateTranslations", payload);
  },

  [TRANSLATION_GROUP_ADD]({ commit }, payload) {
    commit("addTranslationGroup", payload);
  },

  [TRANSLATION_GROUP_REMOVE]({ commit }, payload) {
    commit("removeTranslationGroup", payload);
  },

  [TRANSLATION_ADD]({ commit }, payload) {
    commit("addTranslation", payload);
  },

  [TRANSLATION_REMOVE]({ commit }, payload) {
    commit("removeTranslation", payload);
  },

  [TRANSLATION_EDIT]({ commit }, payload) {
    commit("editTranslation", payload);
  },

  [PERSIST]({ state }) {
    localStorage.setItem("$localizer$", JSON.stringify(state.translations));
  },

  [DIRTY_CHECK]({ commit, state }) {
    const inital = localStorage.getItem("$localizer$") ?? "";
    const current = JSON.stringify(state.translations);

    commit("dirty", inital !== current);
  },

  [REVERT]({ state }) {
    const savedState = JSON.parse(localStorage.getItem("$localizer$"));
    if (savedState) {
      state.translations = savedState;
    }
  },
};
