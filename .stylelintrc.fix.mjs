export default {
  extends: ['stylelint-config-valantic/fix', './.stylelintrc.mjs'],
  overrides: [
    {
      files: ['src/styleguide/routes/**/*.*'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};
