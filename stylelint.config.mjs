/** Lints the <style> block inside every .astro component, plus global.css. */

const config = {
  extends: ['stylelint-config-standard'],
  overrides: [
    { files: ['**/*.astro'], customSyntax: 'postcss-html' },
    {
      // global.css is where tokens are DEFINED, so the bans do not apply.
      files: ['src/styles/global.css'],
      rules: {
        'declaration-property-value-disallowed-list': null,
        'color-no-hex': null,
        'font-family-no-missing-generic-family-keyword': null,
      },
    },
  ],
  rules: {
    // Class names here are BEM-ish (.upload-drop-title, .btn-onDark).
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'custom-property-pattern': null,
    'number-max-precision': null,
    'declaration-block-no-redundant-longhand-properties': null,
    // `(max-width: 839px)` is clearer here than range syntax, and the design's
    // breakpoints were authored that way.
    'media-feature-range-notation': null,
    // Astro's :global() is a pseudo-class stylelint does not know.
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],

    // ---- consistency guards -------------------------------------------
    // A raw hex outside global.css means a colour escaped the palette.
    'color-no-hex': true,
    // Same for rgb()/hsl() literals and raw font stacks.
    'declaration-property-value-disallowed-list': [
      {
        '/^color$|^background|^border.*color$|^fill$|^stroke$/': [/rgba?\(/, /hsla?\(/],
        'font-family': [/^(?!var\()/],
      },
      {
        message: (prop) =>
          `Use a token for "${prop}" (see :root in src/styles/global.css) instead of a literal value.`,
      },
    ],
  },
  ignoreFiles: ['dist/**', 'node_modules/**', 'public/**'],
};

export default config;
