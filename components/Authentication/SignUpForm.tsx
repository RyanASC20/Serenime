import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth, firestore } from "../../config/firebase";
import { userInfo } from "os";

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
    } catch (err) {
      setSignUpError(err.message);
    }
  };

  const onSubmit = (data: SignUpData) => {
    SignUp(data);
    if (!signUpError) router.push("/");
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpError && <p className="text-red-500">{signUpError}</p>}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          className="appearance-none block w-full p-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register({
            required: {
              value: true,
              message: "Please enter a name",
            },
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="appearance-none block w-full p-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register({
            required: {
              value: true,
              message: "Please enter your email",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
      <button type="submit" className="mt-3 p-2 bg-gray-300">
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
