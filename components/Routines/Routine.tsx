import { useState } from 'react';
import { useForm } from "react-hook-form";
import Button from '../Button';

const Routine: React.FC = () => {
    const { handleSubmit, register } = useForm();
    const [todoItems, setTodoItems] = useState([]);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="addTodo"
                    ref={register({
                        required: true
                    })}
                    className="border-2 border-black"
                >
                </input>
                <Button text="Add" textColor="green-500" />
            </form>
        </div>
    );
};

export default Routine;
