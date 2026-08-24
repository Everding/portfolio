module.exports = {
  presets: [
    ['@vitejs/plugin-react', { refresh: true }]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-syntax-decorators'
  ]
}