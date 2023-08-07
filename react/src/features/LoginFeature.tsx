import FloatingLabelInput from '../components/FloatingLabelInput';
import useForm from '../hooks/useForm';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/user-slice';

const LoginFeature = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const login = async () => {
    try {
      await loginMutation(state).unwrap();
      navigate('/', { replace: true });
    } catch (err: any) {
      setAlert({
        message: err.data.message,
        type: 'danger'
      });
    }
  };

  const { onChange, onSubmit, state, alert, isShowPassword, setAlert } =
    useForm<LoginDTO>(
      {
        identity: '',
        password: ''
      },
      login
    );

  const { identity, password } = state;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      {!!alert && <Alert type={alert.type}>{alert.message}</Alert>}

      <FloatingLabelInput
        id="loginIdentity"
        labelText="Email or Username"
        type="text"
        onChange={onChange}
        value={state.identity}
        name="identity"
      />
      <FloatingLabelInput
        id="loginPassword"
        labelText="Password"
        type={`${isShowPassword ? 'text' : 'password'}`}
        onChange={onChange}
        value={state.password}
        name="password"
        isPassword
      />
      <div className="h-2" />
      <Button
        disabled={!identity || !password || isLoading}
        size="normal"
        variant="fill-primary"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginFeature;
