import { useForm } from 'react-hook-form';

import { useHabitCategoriesRef} from '../../../hooks/firestoreHooks';
import { useUser } from '../../../hooks/useUser';
import { useDate } from '../../../hooks/useDate';
import Button from '../../Button';


const AddHabitForm: React.FC = () => {
    const { handleSubmit, register, reset, errors} = useForm();
    const habitCategoriesRef = useHabitCategoriesRef();
    const { date } = useDate();
    const { uid } = useUser();

    const onSubmit = async(data) => {
        reset();
        habitCategoriesRef.set({
            [ data.habitsInput ]: data.habitsInput
        }, { merge: true });
    }
    
    return (
        <div>
            <h1 className="text-lg text-green-500">Add a habit to track: </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="habitsInput"
                className="mb-2 transition duration-200 pd-2 resize-none w-full bg-base border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                ref={register({
                    required: true,
                })}
            ></input>
            <Button text="Submit" textSize="md">Add</Button>
       </form>
       </div>
    );
}

export default AddHabitForm;