import { extendTheme,  } from '@chakra-ui/react'

// const config: ThemeConfig = {
//   initialColorMode: 'dark',
//   useSystemColorMode: false,
// }

const theme = extendTheme({
//   config,
  colors: {
    brand: {
      50: '#fef9f5',
      100: '#fcefdc',
      200: '#f7e1b8',
      300: '#f0cd8b',
      400: '#eabf6f',
      500: '#d2ac71', // primary
      600: '#b08959',
      700: '#8c6742',
      800: '#6a4b2e',
      900: '#4f3921',
    },
    background: '#121212',
  },
})

export default theme
