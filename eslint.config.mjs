import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'coverage/**', '.angular/**']
  },
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates
  },
  {
    files: ['projects/ngx-progressbar/**/*.ts'],
    rules: {
      // The library ships selectors like ng-progress, so it uses no prefix.
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: '', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: '', style: 'kebab-case' }
      ],
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/no-output-native': 'off'
    }
  },
  {
    files: ['projects/ngx-progressbar-demo/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ]
  },
  {
    files: ['projects/ngx-progressbar/**/*.html'],
    rules: {
      '@angular-eslint/template/elements-content': 'off'
    }
  }
);
