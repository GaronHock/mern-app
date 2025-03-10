// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { username } = useParams(); // Get the username from the URL params
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from localStorage

        if (!token) {
          throw new Error('No token, please login.');
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/user/username/${username}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.message || 'Failed to fetch user data');
        }

        setUserData(resData); // Store user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      fetchUserData(); // Fetch user data when the component mounts
    }
  }, [username]); // Run the effect when the username changes

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard for {userData.username}</h1>
      <p>Email: {userData.email}</p>
      {/* Display more user data here */}
    </div>
  );
};

export default Dashboard;
