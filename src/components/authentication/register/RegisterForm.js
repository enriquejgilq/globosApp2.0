/* eslint-disable */

import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { postUser, logoutUser } from '../../../Redux/actions/user'
import { getLoading, getError } from '../../../Redux/selectors/user'
import ResponsiveDialog from '../../modalError'
export default function RegisterForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loader = useSelector(getLoading);
	const error = useSelector(getError)
	const [open, setOpen] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Faltan caracteres')
			.max(50, 'Nombre excede el número máximo de caracteres')
			.required('Nombre Obligatorio'),
		lastName: Yup.string().min(2, 'Faltan caracteres').max(50, ' Apellido excede el número máximo de caracteres').required('Apellido Obligatorio'),
		email: Yup.string().email('El correo electrónico debe ser una dirección de correo electrónico válida').required('correo electronico es requerido'),
		password: Yup.string().required('se requiere contraseña')
	});

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		},
		validationSchema: RegisterSchema,
		onSubmit: () => {
			navigate('/dashboard', { replace: true });
		}
	});
	const name = useRef();
	const lastName = useRef();
	const email = useRef();
	const password = useRef();
	const phone = useRef();


	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: name.current.value,
			last_name: lastName.current.value,
			email: email.current.value,
			password: password.current.value,
			phone: phone.current.value,
		};
		dispatch(postUser(data));
		setOpen(false)

	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		dispatch(logoutUser());
		setOpen(false);
	};
	const { errors, touched, getFieldProps } = formik;
	useEffect(() => {
		if (error) {
			setOpen(true)
		}
	}, [error])
	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={onSubmit}>
				<Stack spacing={3}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							fullWidth
							label="Nombre"
							inputRef={name}
							{...getFieldProps('firstName')}
							error={Boolean(touched.firstName && errors.firstName)}
							helperText={touched.firstName && errors.firstName}
						/>

						<TextField
							fullWidth
							label="Apellido"
							inputRef={lastName}
							{...getFieldProps('lastName')}
							error={Boolean(touched.lastName && errors.lastName)}
							helperText={touched.lastName && errors.lastName}
						/>
					</Stack>
					<TextField
						fullWidth
						type="number"
						label="Numero de telefono"
						inputRef={phone}

					/>
					<TextField
						fullWidth
						autoComplete="username"
						type="email"
						label="Correo"
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
									<IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
										<Icon icon={showPassword ? eyeFill : eyeOffFill} />
									</IconButton>
								</InputAdornment>
							)
						}}
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>
					<LoadingButton
						fullWidth
						size="large"
						type="submit"
						variant="contained"
						loading={loader}
					>
						Registrar
					</LoadingButton>
				</Stack>
			</Form>
			<ResponsiveDialog open={open} error={error} title='Tiene uno o más errores' handleClose={handleClose} />
		</FormikProvider>
	);
}
