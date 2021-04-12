import Head from 'next/head';

import Navbar from '../components/elements/test/Navbar';
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const SignUpPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Serenime | Reset Password</title>
      </Head>
      <div className="min-h-screen bg-base">
        <Navbar />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">
            <h2 className="mt-6 text-center text-3xl leading-9 font-sans2 font-extrabold text-highlight">
              Reset Password
          </h2>
            <p className="mt-2 text-center text-md text-gray-500">
              Please enter the email you registered with
          </p>
          </div>
          <div className="mt-8 mx-8 md:mx-0 bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;