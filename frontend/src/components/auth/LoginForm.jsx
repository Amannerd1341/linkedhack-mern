import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const LoginForm = ({ onSubmit, switchToRegister }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <p className="switch-mode">
            Don't have an account?{' '}
            <button type="button" onClick={switchToRegister}>
              Register
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;