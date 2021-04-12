import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Zoom from 'react-reveal/Zoom';

import { auth } from '../../config/firebase';
import Button from '../elements/buttons/Button';

const ResetPasswordForm: React.FC = () => {
    const { handleSubmit, register } = useForm<{ email: string }>();

    const [error, setError] = useState(null);
    const [ sent, setSent ] = useState(false);


    const onSubmit = ({ email }) => {
        auth.sendPasswordResetEmail(email).then(() => {
            // Email sent.
            setSent(true);
        }).catch((err) => {
            if (err.code === 'auth/user-not-found') {
                setError("Uh oh! No user with that email was found.");
            }
            else {
                setError(err.message);
            }
        });
    }

    return (
        <div>
            { sent && <Zoom duration={200}>
                <div className="p-3 mb-5 rounded-md bg-highlight-secondary text-white text-sm">
                    Email successfully sent!
                </div>
            </Zoom>}
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
                <p className="text-red-500 text-sm">
                    { error }
                </p>
            }
        </div>
    )
}

export default ResetPasswordForm;