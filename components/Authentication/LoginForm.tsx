import firebase from 'firebase/app';
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from 'next/link';


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


  const login = async ({ email, password }) => {
    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await auth.signInWithEmailAndPassword(email, password);
      // router.push("/")
    } catch (err) {
      console.log(err);
      switch(err.code) {
        case "auth/user-not-found": 
          setLoginError("Uh oh! No user was found.");
          break;
        case "auth/wrong-password":
          setLoginError("Uh oh! That password is incorrect.");
          break;
      }
    }
  };

  const onSubmit = (data: LoginData) => {
    login(data);
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <p className="mb-5 text-red-500 text-sm">{loginError}</p>}
      <div className="relative">
        <input
          type="email"
          name="email"
          className={`${styles.input} appearance-none block w-full mb-4 p-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
          ref={register({
            required: {
              value: true,
              message: "Please enter your email",
            },
          })}
          autoComplete="off"
        />
        <label htmlFor="email" className={`${styles.label} absolute transition-all top-2.5 left-2 px-1 pointer-events-none bg-white text-xs`}>{MailIconElement} Email</label>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          className={`${styles.input} appearance-none block w-full mb-4 p-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
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
          <p className="text-red-500 text-sm">{errors.password.message}</p>
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
      <p className="mt-3 text-gray-500 text-xs">Feedback? Contact <a href="mailto:serenimeapp@gmail.com" className="underline">serenimeapp@gmail.com</a></p>
    </form>
    </>
  );
};

export default LoginForm;
