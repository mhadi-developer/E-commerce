import React, { Children } from 'react'
import { useAuth } from '../Custom-context/AuthProvider'
import { Navigate } from 'react-router';

const Protected = ({children}) => {
    const { loggedInUserData , loggedInUserError , loggedInUserLoading} = useAuth();

    if (loggedInUserLoading) return <h1>Loading..... Please wait</h1>;
    if (loggedInUserError) return <h1>Something went wrong</h1>;

    if (!loggedInUserData || !loggedInUserData?.fullName) return <Navigate to={'/signin'} replace />;

// checking the user is authenticated to see profile ;


    return <>
        
        {children}
    </>

  
}

export default Protected ;