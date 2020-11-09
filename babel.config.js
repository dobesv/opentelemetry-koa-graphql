/*
 * This is babel configuration for server, for frontend webpack uses own config
 */

module.exports = {
  only: ['./src', './tests'],

  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: true,
        },
      },
    ],
    '@babel/flow',
  ],

  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
  ],
};
