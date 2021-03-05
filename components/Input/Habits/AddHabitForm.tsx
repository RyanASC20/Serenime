import { useForm } from 'react-hook-form';
import { useUser } from '../../../hooks/useUser';
import { useDate } from '../../../hooks/useDate';
import Button from '../../Button';


const AddHabitForm: React.FC = () => {
    const { handleSubmit, register, errors} = useForm();
    const [date] = useDate();
    const { habitsRef } = useUser();

    const onSubmit = async(data) => {
        console.log(data);
        console.log(habitsRef);
        await habitsRef.doc(data.habitsInput).collection('data').doc(`${date.getMonth() + 1}-${date.getFullYear()}`).set({[date.getDate()]: 0}, {merge: true});
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="habitsInput"
                className="transition duration-200 pd-2 resize-none w-full bg-base border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                ref={register({
                    required: true,
                })}
            ></input>
            <Button text="Submit"></Button>
       </form>
    );
}

export default AddHabitForm;