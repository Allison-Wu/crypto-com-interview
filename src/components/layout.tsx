import { Container, Typography, Grid } from '@mui/material';
import { ReactNode } from 'react';

interface IPageLayoutProps {
  children?: ReactNode;
  title: string;
}

export const PageLayout = (props: IPageLayoutProps) => (
  <Container style={{ width: '100%' }}>
    <Typography variant='h4' component='div' gutterBottom>
      {props.title}
    </Typography>
    <Grid container rowGap={2}>
      {props.children}
    </Grid>
  </Container>
);