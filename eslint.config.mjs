import next from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

const config = [
  ...next,
  ...nextCoreWebVitals,
  prettier,
  {
    ignores: ['public/**/*.js', '.next/**', 'node_modules/**', 'next-sitemap.config.js'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
