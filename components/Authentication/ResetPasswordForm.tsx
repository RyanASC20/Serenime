import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { auth } from '../../config/firebase';
import Button from '../Button';

const ResetPasswordForm: React.FC = () => {
    const { handleSubmit, register } = useForm();
    const [error, setError] = useState(null);


    const onSubmit = ({ email }) => {
        auth.sendPasswordResetEmail(email).then(() => {
            // Email sent.
        }).catch((error) => {
            setError(error.message);
            console.log(error)
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email:"
                    className="appearance-none block w-full mb-4 p-2 border-b-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-highlight transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    ref={register({
                        required: true
                    })}
                ></input>
                <Button text="Send reset email" full={true}/>
            </form>
            { error && 
                <p className="text-red-500">
                    { error }
                </p>
            }
        </div>
    )
}

export default ResetPasswordForm;