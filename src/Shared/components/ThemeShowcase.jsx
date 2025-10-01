import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ThemeShowcase = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(4) }}>
      <Typography variant="h2" gutterBottom>
        Brage App Theme Showcase
      </Typography>
      
      <Typography variant="body1" paragraph>
        Detta är en showcase av det nya temasystemet som kombinerar SCSS-variabler med Material-UI.
      </Typography>

      {/* Färgpalett */}
      <Typography variant="h3" gutterBottom sx={{ marginTop: theme.spacing(4) }}>
        Färgpalett
      </Typography>
      
      <Grid container spacing={2} sx={{ marginBottom: theme.spacing(4) }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Primär</Typography>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: 60,
                  borderRadius: theme.shape.borderRadius,
                  marginBottom: theme.spacing(2),
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {theme.palette.primary.main}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Sekundär</Typography>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  height: 60,
                  borderRadius: theme.shape.borderRadius,
                  marginBottom: theme.spacing(2),
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {theme.palette.secondary.main}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Accent</Typography>
              <Box
                sx={{
                  backgroundColor: theme.palette.warning.main,
                  height: 60,
                  borderRadius: theme.shape.borderRadius,
                  marginBottom: theme.spacing(2),
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {theme.palette.warning.main}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Fel</Typography>
              <Box
                sx={{
                  backgroundColor: theme.palette.error.main,
                  height: 60,
                  borderRadius: theme.shape.borderRadius,
                  marginBottom: theme.spacing(2),
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {theme.palette.error.main}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Typografi */}
      <Typography variant="h3" gutterBottom sx={{ marginTop: theme.spacing(4) }}>
        Typografi
      </Typography>
      
      <Paper sx={{ padding: theme.spacing(3), marginBottom: theme.spacing(4) }}>
        <Typography variant="h1" gutterBottom>H1 - Rubrik 1</Typography>
        <Typography variant="h2" gutterBottom>H2 - Rubrik 2</Typography>
        <Typography variant="h3" gutterBottom>H3 - Rubrik 3</Typography>
        <Typography variant="h4" gutterBottom>H4 - Rubrik 4</Typography>
        <Typography variant="h5" gutterBottom>H5 - Rubrik 5</Typography>
        <Typography variant="h6" gutterBottom>H6 - Rubrik 6</Typography>
        <Typography variant="body1" gutterBottom>
          Body1 - Detta är vanlig brödtext som används för huvudsakligt innehåll.
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Body2 - Detta är sekundär text som används för mindre viktigt innehåll.
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Caption - Detta är bildtext eller hjälptext.
        </Typography>
      </Paper>

      {/* Knappar */}
      <Typography variant="h3" gutterBottom sx={{ marginTop: theme.spacing(4) }}>
        Knappar
      </Typography>
      
      <Box sx={{ marginBottom: theme.spacing(4) }}>
        <Button variant="contained" color="primary" sx={{ margin: theme.spacing(1) }}>
          Primär
        </Button>
        <Button variant="contained" color="secondary" sx={{ margin: theme.spacing(1) }}>
          Sekundär
        </Button>
        <Button variant="outlined" color="primary" sx={{ margin: theme.spacing(1) }}>
          Kontur
        </Button>
        <Button variant="text" color="primary" sx={{ margin: theme.spacing(1) }}>
          Text
        </Button>
      </Box>

      {/* Chips */}
      <Typography variant="h3" gutterBottom sx={{ marginTop: theme.spacing(4) }}>
        Chips
      </Typography>
      
      <Box sx={{ marginBottom: theme.spacing(4) }}>
        <Chip label="Standard" color="primary" sx={{ margin: theme.spacing(0.5) }} />
        <Chip label="Sekundär" color="secondary" sx={{ margin: theme.spacing(0.5) }} />
        <Chip label="Framgång" color="success" sx={{ margin: theme.spacing(0.5) }} />
        <Chip label="Varning" color="warning" sx={{ margin: theme.spacing(0.5) }} />
        <Chip label="Fel" color="error" sx={{ margin: theme.spacing(0.5) }} />
        <Chip label="Information" color="info" sx={{ margin: theme.spacing(0.5) }} />
      </Box>

      {/* Spacing */}
      <Typography variant="h3" gutterBottom sx={{ marginTop: theme.spacing(4) }}>
        Spacing
      </Typography>
      
      <Paper sx={{ padding: theme.spacing(3) }}>
        <Typography variant="body1" gutterBottom>
          Detta papper har padding på {theme.spacing(3)} (24px).
        </Typography>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.light,
            height: theme.spacing(4),
            margin: theme.spacing(2, 0),
            borderRadius: theme.shape.borderRadius,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          Den blå rektangeln ovan har höjd på {theme.spacing(4)} (32px) och margin på {theme.spacing(2)} (16px).
        </Typography>
      </Paper>
    </Box>
  );
};

export default ThemeShowcase;

