import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
});

const LoginBox = styled(Box)({
  color: 'rgb(0, 0, 0)',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'center',
  marginTop: '12px',
  width: '350px',
  height: '400px',
});

const StyledDiv = styled(Box)({
  alignItems: 'center',
  backgroundColor: '#fff',
  border: '1px solid rgb(219, 219, 219)',
  borderRadius: '1px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  font: 'inherit',
  fontSize: '100%',
  margin: '0 0 10px',
  padding: '10px 0',
  position: 'relative',
  verticalAlign: 'baseline',
});

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const validateEmail = (value: string) => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return true;
  };
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Login failed');
      }

      localStorage.setItem('token', resData.token); // Store JWT token

      navigate(`/dashboard/${data.username}`); // Redirect to the dashboard with username
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <StyledBox>
      <LoginBox>
        <StyledDiv>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h3"
              sx={{
                marginTop: '10px',
                fontFamily: 'Cookie, cursive',
                backgroundColor: 'white',
                paddingBottom: '20px',
              }}
            >
              <b>Instagaron</b>
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ''}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  margin="normal"
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '16px' }}
            >
              Login
            </Button>
          </form>
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </StyledDiv>
      </LoginBox>
    </StyledBox>
  );
};

export default Login;
