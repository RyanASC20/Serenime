import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from 'next/link';

import { useRouter } from "next/router";
import { auth, firestore } from "../../config/firebase";
import Button from "../elements/Buttons/Button";
import { MailIconElement, LockIconElement } from '../../icons';
import styles from './LoginForm.module.css';


interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SignUpData>();
  const [signUpError, setSignUpError] = useState(null);
  const router = useRouter();

  const SignUp = async ({ name, email, password }) => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userRef = firestore.collection("users").doc(newUser.user.uid);
      userRef.set({
        name,
        email,
      });

      router.push('/');
    } catch (err) {
      setSignUpError(err.message);
    }
  };

  const onSubmit = (data: SignUpData) => {
  
    SignUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpError && <p className="mb-3 text-red-500">{signUpError}</p>}
      <div className="relative mb-6">
        <input
          type="text"
          name="name"
          autoComplete="off"
          className={`${styles.input} appearance-none block w-full p-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
          ref={register({
            required: {
              value: true,
              message: "Please enter a name",
            },
          })}
        />
        <label htmlFor="name" className={`${styles.label} absolute transition-all top-2.5 left-2 px-1 pointer-events-none bg-white text-xs`}>Name</label>
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="relative mb-6">
        <input
          type="email"
          name="email"
          className={`${styles.input} appearance-none block w-full p-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
          ref={register({
            required: {
              value: true,
              message: "Please enter your email",
            },
          })}
        />
        <label htmlFor="email" className={`${styles.label} absolute transition-all top-2.5 left-2 px-1 pointer-events-none bg-white text-xs`}>{MailIconElement} Email</label>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="relative mb-6">
        <input
          type="password"
          name="password"
          className={`${styles.input} appearance-none block w-full p-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
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
          <p className="text-red-500 text-2xl">{errors.password.message}</p>
        )}
      </div>
      <Button text="Register" textSize="lg" full={true} />
      <p className="mt-2 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login">
          <a href="#" className="text-blue-500">
            Log in here
              </a>
        </Link>
      </p>
      <p className="mt-3 text-gray-500 text-xs">Feedback? Contact <a href="mailto:serenimeapp@gmail.com" className="underline">serenimeapp@gmail.com</a></p>
    </form>
  );
};

export default SignUpForm;