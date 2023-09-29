import { FormField } from '../../Moleluces';
import { Button } from '../../Atoms';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './registerFormSchema';
import { Link } from 'react-router-dom';

interface RegistrationFormProps {
    name: string;
    email: string;
    password: string;
}

interface Props {
    onSubmit: (values: RegistrationFormProps) => void;
}

const RegistrationForm = ({ onSubmit }: Props) => {
    const handleSubmit = (values: RegistrationFormProps) => {
        onSubmit(values);
    };

    const formMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <form className='space-y-4 md:space-y-6' onSubmit={formMik.handleSubmit}>
            <div>
                <FormField
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Your name'
                    label='Name'
                    value={formMik.values.name}
                    onChange={formMik.handleChange('name')}
                    status={formMik.errors.name && 'error'}
                />
                {formMik.errors.name && <p>{formMik.errors.name}</p>}
            </div>
            <div>
                <FormField
                    type='email'
                    name='email'
                    id='email'
                    placeholder='name@company.com'
                    label='Your email'
                    value={formMik.values.email}
                    onChange={formMik.handleChange('email')}
                    status={formMik.errors.email && 'error'}
                />
                {formMik.errors.email && <p>{formMik.errors.email}</p>}
            </div>
            <div>
                <FormField
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    label='Password'
                    value={formMik.values.password}
                    onChange={formMik.handleChange('password')}
                    status={formMik.errors.password && 'error'}
                />
                {formMik.errors.password && <p>{formMik.errors.password}</p>}
            </div>
            <Button
                type={'submit'}
                className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
                Register
            </Button>
            <p className='text-sm font-light'>
                Already have an account?{' '}
                <Link to='/login' className='font-medium text-primary-600 hover:underline'>
                    Sign In
                </Link>
            </p>
        </form>
    );
};

export default RegistrationForm;
