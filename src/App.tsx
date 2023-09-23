import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import DashboardPage from './Pages/DashboardPage';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';
import DashboardPage2 from './Pages/DashboardPage2';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from './Template';
import ThemeProvider from './context/ThemeProvider';
import { AuthProvider } from './context/AuthProvider';
function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            element: <PublicLayout />,
            children: [
                {
                    path: '/dashboard',
                    element: <DashboardPage />,
                },
                {
                    path: '/dashboard2',
                    element: <DashboardPage2 />,
                },
            ],
        },

        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegistrationPage />,
        },
        {
            path: '*',
            element: <ErrorPage />,
        },
    ]);

    return (
        <>
            <ThemeProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
