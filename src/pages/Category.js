/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Container, Grid, Stack, Typography, TextField } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import {  postCategories } from '../../src/Redux/actions/categories'
import {getLoading} from '../../src/Redux/selectors/categories'

import Page from '../components/Page';

function Category() {
    const dispatch = useDispatch();
    const category = useRef()
    const loader = useSelector(getLoading);

    const LoginSchema = Yup.object().shape({
        category: Yup.string().required('La categoria es requerida'),
    });
    const formik = useFormik({
        initialValues: {
            category: '',
        },
        validationSchema: LoginSchema,

    });
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            category: category.current.value
        }
        dispatch(postCategories(data));

        console.log(data)
    }
    const { errors, touched, values, isSubmitting, getFieldProps } = formik;

   
    return (
        <Page title="Inicio: Categoria | GlobosApp2.0">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Categorias
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={onSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                type="text"
                                label="Categoria"
                                required
                                inputRef={category}
                                {...getFieldProps('category')}
                                error={Boolean(touched.category && errors.category)}
                                helperText={touched.category && errors.category}
                            />

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={loader}
                                disabled={Boolean(touched.category && errors.category)}>
                                Guardar Categoria
                            </LoadingButton>
                        </Stack>
                    </Form>
                </FormikProvider>
            </Container>
        </Page>
    )
}

export default Category
