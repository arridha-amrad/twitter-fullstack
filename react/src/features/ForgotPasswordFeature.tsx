import Alert from '../components/Alert';
import Button from '../components/Button';
import FloatingLabelInput from '../components/FloatingLabelInput';
import useForm from '../hooks/useForm';

const ForgotPasswordFeature = () => {
  const send = async () => {
    setAlert({
      type: 'success',
      message: 'please check your email'
    });
  };

  const { onChange, onSubmit, state, alert, setAlert } = useForm(
    {
      email: ''
    },
    send
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {!!alert && <Alert type={alert.type}>{alert.message}</Alert>}

      <FloatingLabelInput
        labelText="Email Address"
        type="text"
        onChange={onChange}
        value={state.email}
        name="email"
      />

      <Button size="normal" variant="fill-primary" type="submit">
        Send
      </Button>
    </form>
  );
};

export default ForgotPasswordFeature;
