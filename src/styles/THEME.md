# Brage App Theme System

Detta dokument beskriver det centrala temasystemet för Brage-appen, som kombinerar SCSS-variabler med Material-UI (MUI) tema för en konsekvent design genom hela applikationen.

## Översikt

Temasystemet består av:
- **SCSS-variabler** för färger, typografi och spacing
- **MUI-tema** som använder samma färgpalett
- **Centraliserad konfiguration** på ett ställe
- **Semantiska färgnamn** för bättre förståelse

## Färgpalett

### Primära färger
```scss
$primary: #58b0c3;        // Huvudblå
$primary-dark: #4a9ba8;   // Mörkare blå
$primary-light: #6bb8c8;  // Ljusare blå
$primary-lighter: #7ec0d3; // Ännu ljusare blå
```

### Sekundära färger
```scss
$secondary: #63cc6c;       // Grön
$secondary-dark: #54b85a;  // Mörkare grön
$secondary-light: #72d07a; // Ljusare grön
```

### Accentfärger
```scss
$accent: #f9aa55;         // Orange
$accent-dark: #f79730;    // Mörkare orange
$accent-light: #fbbd7a;   // Ljusare orange
```

### Statusfärger
```scss
$success: #63cc6c;        // Framgång
$warning: #f9aa55;         // Varning
$error: #f74e1c;          // Fel
$info: #58b0c3;           // Information
```

### Gråskala
```scss
$gray-900: #313246;       // Mörkast
$gray-800: #1f2937;       // Mycket mörk
$gray-700: #374151;       // Mörk
$gray-600: #6b7280;       // Medium mörk
$gray-500: #9ca3af;       // Medium
$gray-400: #cacbd3;       // Ljus
$gray-300: #edf0f2;       // Ljusare
$gray-200: #f5f7f8;       // Mycket ljus
$gray-100: #f9fafb;       // Ljusast
```

### Semantiska färgaliases
```scss
$text-primary: $gray-900;     // Huvudtext
$text-secondary: $gray-600;   // Sekundär text
$text-disabled: $gray-400;    // Inaktiverad text
$text-hint: $gray-500;        // Hjälptext

$background-default: $white;  // Standardbakgrund
$background-paper: $white;    // Pappersbakgrund
$background-elevated: $gray-100; // Höjd bakgrund

$border-light: $gray-300;     // Ljus kantlinje
$border-medium: $gray-400;    // Medium kantlinje
$border-dark: $gray-500;      // Mörk kantlinje
```

## Typografi

### Fontfamiljer
```scss
$font-family-primary: 'Verdana', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
$font-family-secondary: 'Georgia', 'Times New Roman', serif;
$font-family-mono: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
```

### Fontvikter
```scss
$font-weight-light: 200;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### Fontstorlekar
```scss
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 3rem;      // 48px
```

## Spacing

### Basenhet
```scss
$spacing-unit: 0.5rem; // 8px
```

### Spacing-skala
```scss
$spacing-1: 2px;   // 0.25rem
$spacing-2: 4px;   // 0.5rem
$spacing-4: 8px;   // 1rem
$spacing-8: 16px;  // 2rem
$spacing-16: 32px; // 4rem
$spacing-32: 64px; // 8rem
```

### Semantisk spacing
```scss
$spacing-xs: $spacing-2;   // 4px
$spacing-sm: $spacing-4;   // 8px
$spacing-md: $spacing-8;   // 16px
$spacing-lg: $spacing-16;  // 32px
$spacing-xl: $spacing-24;  // 48px
```

## Border Radius

```scss
$border-radius-sm: 0.25rem;   // 4px
$border-radius-md: 0.5rem;    // 8px
$border-radius-lg: 0.75rem;   // 12px
$border-radius-xl: 1rem;      // 16px
$border-radius-2xl: 1.5rem;   // 24px
$border-radius-full: 9999px;  // Helt rundad
```

## Användning

### I SCSS-filer
```scss
@import '../styles/variables/all';

.my-component {
  color: $text-primary;
  background-color: $background-paper;
  border: 1px solid $border-light;
  border-radius: $border-radius-md;
  padding: $spacing-md;
  font-family: $font-family-primary;
  font-size: $font-size-base;
}
```

### I React-komponenter med MUI
```jsx
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      }}
    >
      Innehåll
    </Box>
  );
};
```

### Med styled-components
```jsx
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const StyledComponent = styled.div`
  color: ${theme.palette.text.primary};
  background-color: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.divider};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)}px;
`;
```

## Filstruktur

```
src/styles/
├── variables/
│   ├── _all.scss          # Importerar alla variabler
│   ├── colors.scss        # Färgpalett
│   ├── typography.scss    # Typografi
│   ├── spacing.scss       # Spacing och border radius
│   ├── _content.scss      # Innehållsrelaterade variabler
│   └── _responsive.scss   # Responsiva breakpoints
├── theme.js               # MUI-tema
├── global/
│   └── _typography.scss   # Global typografi
└── THEME.md              # Denna dokumentation
```

## Fördelar

1. **Konsistens**: Samma färger och spacing genom hela appen
2. **Underhållbarhet**: Ändra färger på ett ställe
3. **Skalbarhet**: Lätt att lägga till nya färger och variabler
4. **Utvecklarupplevelse**: Tydliga, semantiska namn
5. **Designsystem**: Följer moderna designsystem-principer

## Framtida förbättringar

- [ ] Mörkt tema (dark mode)
- [ ] Fler semantiska färgaliases
- [ ] Animationer och övergångar
- [ ] Responsiva typografi-skala
- [ ] CSS custom properties för runtime-ändringar

