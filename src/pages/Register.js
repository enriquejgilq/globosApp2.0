/* eslint-disable */

import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography } from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import {getUser} from '../Redux/selectors/user'
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------
 

export default function Register() {
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  console.log(user)
  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        Ya tienes una cuenta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Iniciar sesión
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <img alt="register" src="/static/illustrations/pexels-cottonbro-3584967.jpg" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Registro
            </Typography>
          </Box>
          <RegisterForm />

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Ya tienes una cuenta?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
