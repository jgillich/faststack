let solarizedOverrides = [
  '#073642', '#dc322f', '#859900', '#b58900', '#268bd2', '#d33682', '#2aa198',
  '#eee8d5', '#002b36', '#cb4b16', '#586e75', '#657b83', '#839496', '#6c71c4',
  '#93a1a1', '#fdf6e3',
]

export default [
   {
    name: 'monokai',
    values: {
      'background-color': '#171814',
      'foreground-color': '#e9e9e9',
      'color-palette-overrides': [
        '#171814', '#f92672', '#82b414', '#fd971f', '#2196ac', '#8c54fe', '#799ba2', '#ccccc6',
        '#272822', '#f92672', '#82b414', '#e6db74', '#66d9ef', '#9e6ffe', '#a3b9bf', '#f8f8f2',
      ],
    },
  },
  {
    name: 'solarized-dark',
    values: {
      'background-color': '#002b36',
      'foreground-color': '#839496',
      'cursor-color': 'rgba(131, 148, 150, 0.5)',
      'color-palette-overrides': solarizedOverrides,
    },
  },
  {
    name: 'solarized-light',
    values: {
      'background-color': '#fdf6e3',
      'foreground-color': '#657b83',
      'cursor-color': 'rgba(101, 123, 131, 0.5)',
      'color-palette-overrides': solarizedOverrides,
    },
  },
]
