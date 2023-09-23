import { Link } from 'react-router-dom';
import useTheme from '../context/useTheme';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const HomePage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <section
            className={`flex flex-col min-h-screen ${
                theme === 'light' ? 'bg-gray-50' : 'dark:bg-gray-900'
            }`}
        >
            <div className='absolute top-4 right-4'>
                <button
                    className={`${
                        theme === 'light' ? 'bg-gray-700' : 'bg-gray-200'
                    } px-4 py-2 rounded transform transition-transform duration-300 hover:scale-105`}
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? (
                        <MoonIcon className='w-6 h-6 text-white' />
                    ) : (
                        <SunIcon className='w-6 h-6 text-gray-900' />
                    )}
                </button>
            </div>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='w-full max-w-lg bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white'>
                            Welcome to My App
                        </h1>
                        <div className='flex justify-center space-x-4'>
                            <Link
                                to='/login'
                                className='px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition duration-300'
                            >
                                Login
                            </Link>
                            <Link
                                to='/register'
                                className='px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition duration-300'
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
