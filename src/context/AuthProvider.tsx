import { createContext, useState } from 'react';

interface AuthContextProps {
    authToken: string | null;
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>
    );
};
