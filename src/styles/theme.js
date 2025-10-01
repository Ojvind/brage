import { createTheme } from '@mui/material/styles';

// Import SCSS variables (these will be available at build time)
// Note: In a real implementation, you might want to use CSS custom properties
// or a build-time solution to share SCSS variables with JS

const theme = createTheme({
  palette: {
    primary: {
      main: '#58b0c3', // $primary
      dark: '#4a9ba8', // $primary-dark
      light: '#6bb8c8', // $primary-light
      lighter: '#7ec0d3', // $primary-lighter
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#63cc6c', // $secondary
      dark: '#54b85a', // $secondary-dark
      light: '#72d07a', // $secondary-light
      contrastText: '#ffffff',
    },
    error: {
      main: '#f74e1c', // $error
      light: '#f96b4a',
      dark: '#d63e0f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f9aa55', // $warning
      light: '#fbbd7a',
      dark: '#f79730',
      contrastText: '#ffffff',
    },
    info: {
      main: '#58b0c3', // $info
      light: '#6bb8c8',
      dark: '#4a9ba8',
      contrastText: '#ffffff',
    },
    success: {
      main: '#63cc6c', // $success
      light: '#72d07a',
      dark: '#54b85a',
      contrastText: '#ffffff',
    },
    grey: {
      50: '#f9fafb', // $gray-100
      100: '#f5f7f8', // $gray-200
      200: '#edf0f2', // $gray-300
      300: '#cacbd3', // $gray-400
      400: '#9ca3af', // $gray-500
      500: '#6b7280', // $gray-600
      600: '#4b5563', // Custom
      700: '#374151', // Custom
      800: '#1f2937', // Custom
      900: '#313246', // $gray-900
    },
    text: {
      primary: '#313246', // $text-primary
      secondary: '#6b7280', // $text-secondary
      disabled: '#cacbd3', // $text-disabled
    },
    background: {
      default: '#ffffff', // $background-default
      paper: '#ffffff', // $background-paper
    },
    divider: '#edf0f2', // $border-light
  },
  typography: {
    fontFamily: [
      'Verdana',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.25rem', // 36px
      fontWeight: 600,
      lineHeight: 1.25,
      color: '#313246',
    },
    h2: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.375,
      color: '#313246',
    },
    h3: {
      fontSize: '1.25rem', // 20px
      fontWeight: 400,
      lineHeight: 1.375,
      color: '#313246',
    },
    h4: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#313246',
    },
    h5: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#313246',
    },
    h6: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#313246',
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 200,
      lineHeight: 1.5,
      color: '#313246',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 200,
      lineHeight: 1.5,
      color: '#6b7280',
    },
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: 'none', // Disable uppercase transformation
    },
  },
  spacing: 8, // 8px base spacing unit
  shape: {
    borderRadius: 8, // 8px default border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 250,
          border: '1px solid #dadde9',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
