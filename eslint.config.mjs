import globals from 'globals';
import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        rules: {
            'semi': ['error', 'always'],         // Требовать точку с запятой в конце каждой строки
            'quotes': ['error', 'single'],       // Использовать одинарные кавычки
            'indent': ['error', 4],      // Запретить пробелы в конце строк
            'eol-last': ['error', 'always'],     // Требовать пустую строку в конце файла
            'comma-dangle': ['error', 'never']   // Запретить висячие запятые
        }
    },
    pluginJs.configs.recommended
];
