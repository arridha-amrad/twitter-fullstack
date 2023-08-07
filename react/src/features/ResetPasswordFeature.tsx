import Alert from "../components/Alert";
import Button from "../components/Button";
import FloatingLabelInput from "../components/FloatingLabelInput";
import LabeledCheckBox from "../components/LabeledCheckBox";
import useForm from "../hooks/useForm";

const ResetPasswordFeature = () => {
  const send = async () => {};
  const {
    alert,
    onChange,
    onSubmit,
    isShowPassword,
    setIsShowPassword,
    state,
    isLoading,
  } = useForm(
    {
      password: "",
    },
    send
  );
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      {!!alert && <Alert type={alert.type}>{alert.message}</Alert>}

      <FloatingLabelInput
        labelText="Password"
        type={`${isShowPassword ? "text" : "password"}`}
        onChange={onChange}
        value={state.password}
        name="password"
      />
      <LabeledCheckBox
        checked={isShowPassword}
        onChange={(e) => setIsShowPassword((val) => !val)}
      >
        Show Password
      </LabeledCheckBox>

      <Button size="normal" variant="fill-primary" type="submit">
        Login
      </Button>
    </form>
  );
};

export default ResetPasswordFeature;
