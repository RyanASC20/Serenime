import { useForm } from "react-hook-form";
import { useState } from "react";

import { auth } from "../../config/firebase";
import { useRouter } from "next/router";
import Button from '../Button';

interface LoginData {
  name: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginData>();
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();


  const login = async ({ email, password }) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/")
      return;
    } catch (err) {
      setLoginError(err);
    }
  };

  const onSubmit = (data: LoginData) => {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <p className="text-red-500">{loginError.message}</p>}
      <div>
        <label htmlFor="email" className="transform translate-x-10">Email</label>
        <input
          type="email"
          name="email"
          className="appearance-none block w-full mb-4 p-2 border-b-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register({
            required: {
              value: true,
              message: "Please enter your email",
            },
          })}
          autoComplete="off"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="appearance-none block w-full border-b-2 mb-4 p-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register({
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      {/* <div className="w-full border border-black"> */}
        <Button text="Login" textSize="lg" />
      {/* </div> */}
    </form>
  );
};

export default LoginForm;
