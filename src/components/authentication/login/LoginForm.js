/* eslint-disable */
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {postLogin, logoutUser} from '../../../Redux/actions/user'
import { useSelector, useDispatch } from 'react-redux';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { getError } from 'src/Redux/selectors/user';
import ResponsiveDialog from 'src/components/modalError';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getError)
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const email = useRef();
  const password = useRef();
 

  useEffect(() => {
   if (error) {
      setOpen(true)
       }
    }, [error])
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    //onSubmit: (e) => {
    //e.preventDefault();
    //const data = {
    //  email: email.current.value,
    //  password: password.current.value
    //};

    //  navigate('/dashboard', { replace: true });
    //}
  });
 

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value
    };
    dispatch(postLogin(data));
  }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClose = () => {
    dispatch(logoutUser());
    setOpen(false);
};

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Correo Electronico"
            inputRef={email}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            inputRef={password}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Recordarme"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Olvidaste la contraseña?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Iniciar sesión
        </LoadingButton>
      </Form>
      <ResponsiveDialog open={open} error={error} title='Tiene uno o más errores' handleClose={handleClose} />

    </FormikProvider>
  );
}
