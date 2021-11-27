import TranslationOverride from "./components/Localizer.vue";

window.panel.plugin("gearsdigital/localizer-for-kirby", {
  components: { "k-panel-localizer-area": TranslationOverride },
});
