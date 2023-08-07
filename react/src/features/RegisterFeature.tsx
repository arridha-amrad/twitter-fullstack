import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import Button from '../components/Button';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Spinner from '../components/Spinner';
import TextLink from '../components/TextLink';
import useForm from '../hooks/useForm';
import { useRegisterMutation } from '../redux/user-slice';

type FieldError = {
  field: keyof RegisterDTO;
  message: string;
};

const RegisterFeature = () => {
  const [errFields, setErrFields] = useState<FieldError[]>([]);

  const [registerMutation, { isLoading, isSuccess }] = useRegisterMutation();

  const register = async () => {
    setAlert(null);
    setErrFields([]);
    try {
      const result = await registerMutation(state).unwrap();
      setAlert({
        message: result,
        type: 'success'
      });
      resetState();
    } catch (err: any) {
      if (err?.data?.errors) {
        setErrFields(err.data.errors);
      }
      if (err?.data?.message) {
        setAlert({
          message: err.data.message,
          type: 'danger'
        });
      }
    }
  };

  const {
    onChange,
    onSubmit,
    state,
    setAlert,
    isShowPassword,
    setIsShowPassword,
    resetState
  } = useForm<RegisterDTO>(
    {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    register
  );
  const { email, password, username, firstName, lastName } = state;

  const [ref, { height }] = useMeasure();

  return (
    <>
      {isSuccess && (
        <motion.p
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          initial={{ opacity: 0.2 }}
          className="text-sm text-center"
        >
          Registration successful. Continue to
          <Link to="/login" className="text-blue-500">
            &nbsp; login
          </Link>
        </motion.p>
      )}
      <motion.div
        animate={{
          height: height > 0 ? height : 0,
          transition: {
            duration: 1,
            delay: 0.5
          }
        }}
      >
        {!isSuccess && (
          <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-2">
            <div className="flex w-full gap-3">
              <div className="flex-1">
                <FloatingLabelInput
                  readOnly={isLoading}
                  id="registerFirstName"
                  labelText="First Name"
                  type="text"
                  onChange={onChange}
                  value={firstName}
                  name="firstName"
                />
              </div>
              <div className="flex-1">
                <FloatingLabelInput
                  readOnly={isLoading}
                  id="registerLastName"
                  labelText="Last Name"
                  type="text"
                  onChange={onChange}
                  value={lastName}
                  name="lastName"
                />
              </div>
            </div>
            <p className="text-sm text-red-500">
              {errFields.find((err) => err.field === 'firstName')?.message}
            </p>
            <p className="text-sm text-red-500">
              {errFields.find((err) => err.field === 'lastName')?.message}
            </p>

            <FloatingLabelInput
              readOnly={isLoading}
              id="registerEmailAddress"
              labelText="Email Address"
              type="email"
              onChange={onChange}
              value={email}
              name="email"
            />

            <p className="text-sm text-red-500">
              {errFields.find((err) => err.field === 'email')?.message}
            </p>

            <FloatingLabelInput
              readOnly={isLoading}
              id="registerUsername"
              labelText="Username"
              type="text"
              onChange={onChange}
              value={username}
              name="username"
            />

            <p className="text-sm text-red-500">
              {errFields.find((err) => err.field === 'username')?.message}
            </p>

            <FloatingLabelInput
              readOnly={isLoading}
              id="registerPassword"
              labelText="Password"
              onChange={onChange}
              value={password}
              name="password"
              isPassword
            />

            <p className="text-sm text-red-500">
              {errFields.find((err) => err.field === 'password')?.message}
            </p>

            <Button
              disabled={
                !email || !username || !password || !firstName || isLoading
              }
              size="normal"
              variant="fill-primary"
              type="submit"
              className="flex justify-center"
            >
              {isLoading ? (
                <span className="flex justify-center text-blue-500 gap-2">
                  <Spinner />
                  loading...
                </span>
              ) : (
                'Register'
              )}
            </Button>
            <div className="flex justify-center mt-3 text-xs sm:text-sm">
              <span>
                have an account ? <TextLink to="/login">login</TextLink>
              </span>
            </div>
          </form>
        )}
      </motion.div>
    </>
  );
};

export default RegisterFeature;
