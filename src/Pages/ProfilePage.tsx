import { useEffect, useState } from 'react';

type ProfileData = {
    id: number;
    name: string;
    email: string;
};

const ProfilePage = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Authorization token is not available');
                }

                const response = await fetch('https://mock-api.arikmpt.com/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setProfile(data.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile Page</h1>
            {error && <p>Error: {error}</p>}
            {profile && (
                <div>
                    <p>ID: {profile.id}</p>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
