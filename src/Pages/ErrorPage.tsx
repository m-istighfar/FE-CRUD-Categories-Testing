import { useNavigate } from 'react-router-dom';
import useTheme from '../context/useTheme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const ErrorPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <section
            className={`flex items-center justify-center min-h-screen ${
                theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
            }`}
        >
            <div className='absolute top-4 right-4'>
                <button
                    className={`rounded px-4 py-2 ${
                        theme === 'light' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                    }`}
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? (
                        <MoonIcon className='w-6 h-6' />
                    ) : (
                        <SunIcon className='w-6 h-6' />
                    )}
                </button>
            </div>
            <div className='px-4 py-8 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
                <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl'>404</h1>
                <p className='mb-4 text-3xl tracking-tight font-bold md:text-4xl'>
                    Something's missing.
                </p>
                <p className='mb-4 text-lg font-light'>
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className={`inline-flex font-medium rounded-lg text-sm px-5 py-2.5 my-4 focus:outline-none focus:ring-4 ${
                        theme === 'light'
                            ? 'text-white bg-gray-900 hover:bg-primary-800 focus:ring-primary-300'
                            : 'text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500'
                    }`}
                >
                    Back to Homepage
                </button>
            </div>
        </section>
    );
};

export default ErrorPage;
