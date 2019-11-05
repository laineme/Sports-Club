const baseFonts = [
  'Open Sans',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
];

export default {
  palette: {
    primary: {
      lighter: '#FFCF74',
      light: '#FFC14A',
      main: '#FDB01F',
      dark: '#D48C02',
      darker: '#A76D00',
    },
    secondary: {
      lighter: '#7E6ACC',
      light: '#5E45B9',
      main: '#4428AE',
      dark: '#2D1392',
      darker: '#220C73',
    },
    tertiary: {
      lighter: '#57C0B8',
      light: '#31A89F',
      main: '#139B92',
      dark: '#018279',
      darker: '#00675F',
    },
  },
  typography: {
    base: {
      fontFamily: baseFonts.join(','),
    },
    title: {
      fontFamily: ['Vollkorn', ...baseFonts].join(','),
    },
  },
};
