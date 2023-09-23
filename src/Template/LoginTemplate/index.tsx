import { LoginForm } from '../../Organism';
import jwt_decode from 'jwt-decode';
import useTheme from '../../context/useTheme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

interface LoginFormProps {
    email: string;
    password: string;
}

interface LoginResponse {
    data: {
        token: string;
    };
    errors?: string;
}

interface DecodedToken {
    id: string;
}

const LoginTemplate: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [error, setError] = useState<string | null>(null);
    const { setAuthToken } = useAuth();

    const navigate = useNavigate();
    const onSubmit = async (data: LoginFormProps) => {
        try {
            const fetching = await fetch('https://mock-api.arikmpt.com/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const response: LoginResponse = await fetching.json();
            if (response.errors) {
                console.log(response.errors);
                if (response.errors === 'we don`t have any information for your account') {
                    setError('No account found with this email.');
                } else if (response.errors === 'email or password is not match') {
                    setError('Email or password is incorrect.');
                } else {
                    setError('An error occurred during login.');
                }
            } else if (response.data && response.data.token) {
                setAuthToken(response.data.token);
                const decoded: DecodedToken = jwt_decode(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', decoded.id);
                navigate('/dashboard');
            }
        } catch (error) {
            setError('An error occurred during login.');
        }
    };

    return (
        <section className={theme === 'light' ? 'bg-gray-50' : 'dark:bg-gray-900'}>
            <div className='absolute top-4 right-4'>
                <button
                    className={`${
                        theme === 'light' ? 'bg-gray-700' : 'bg-gray-200'
                    } px-4 py-2 rounded`}
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? (
                        <MoonIcon className='w-6 h-6 text-white' />
                    ) : (
                        <SunIcon className='w-6 h-6 text-gray-900' />
                    )}
                </button>
            </div>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <a
                    href='#'
                    className={`flex items-center mb-6 text-2xl font-semibold ${
                        theme === 'light' ? 'text-gray-900' : 'dark:text-white'
                    }`}
                >
                    <img
                        className='w-8 h-8 mr-2'
                        src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                        alt='logo'
                    />
                    Flowbite
                </a>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                            Sign in to your account
                        </h1>

                        {error && (
                            <div className='bg-red-200 text-red-800 p-2 rounded-md'>{error}</div>
                        )}

                        <LoginForm onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginTemplate;
