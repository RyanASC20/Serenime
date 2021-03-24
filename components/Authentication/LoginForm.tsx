import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";


import { auth } from "../../config/firebase";
import Button from '../Button';
import { MailIconElement, LockIconElement } from '../../public/static/icons';
import styles from './LoginForm.module.css';

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
      // router.push("/")
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
      <div className="relative">
        <input
          type="email"
          name="email"
          className={`${styles.input} appearance-none block w-full mb-4 p-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
          ref={register({
            required: {
              value: true,
              message: "Please enter your email",
            },
          })}
          autoComplete="off"
        />
        <label htmlFor="email" className={`${styles.label} absolute transition-all top-2.5 left-2 px-1 pointer-events-none bg-white text-xs`}>{MailIconElement} Email</label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          className={`${styles.input} appearance-none block w-full border mb-4 p-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
          ref={register({
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <label htmlFor="password" className={`${styles.label} absolute transition-all top-2.5 left-2 px-1 pointer-events-none bg-white text-xs`}>{LockIconElement} Password</label>
        
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4 text-sm">
        <Link href="/resetPassword">
          <a href="#" className="text-blue-500">Forgot password?</a>
        </Link>
      </div>
      <Button text="Login" textSize="lg" full={true} />
      <p className="mt-5 text-sm">
        Don't have an account?{' '}
        <Link href="/signup">
          <a href="#" className="text-blue-500">
            Sign Up here
          </a>
        </Link>
      </p>

    </form>
  );
};

export default LoginForm;
