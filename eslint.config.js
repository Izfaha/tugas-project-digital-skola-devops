const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      '**/.venv/**',
      '**/venv/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.scannerwork/**',
      '**/.pytest_cache/**',
    ],
  },

  js.configs.recommended,

  ...compat.config({
    env: {
      es2021: true,
      node: true,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
    },
  }),

  // Global Jest hanya berlaku pada file pengujian.
  ...compat.config({
    overrides: [
      {
        files: ['tests/**/*.js'],
        env: {
          jest: true,
        },
      },
    ],
  }),

  // Script k6 menggunakan ES modules dan global __ENV.
  {
    files: ['loadtest/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        __ENV: 'readonly',
      },
    },
  },
];


// const { FlatCompat } = require('@eslint/eslintrc');
// const js = require('@eslint/js');

// // Initialize with the necessary configurations
// const compat = new FlatCompat({
//   recommendedConfig: js.configs.recommended,
//   eslintrc: true
// });

// module.exports = [
//   js.configs.recommended,
//   ...compat.config({
//     env: { 
//       es2021: true, 
//       node: true, 
//       jest: true 
//     },
//     rules: {
//       "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
//       "no-console": "off",
//       "eqeqeq": ["error", "always"]
//     }
//   })
// ];