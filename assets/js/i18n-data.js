---
---
window.SITE_I18N = {{ site.data.i18n | jsonify }};
window.SITE_DEFAULT_LANG = {{ site.lang | default: "pt-BR" | jsonify }};
