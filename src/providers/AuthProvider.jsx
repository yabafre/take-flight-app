import { selectUser } from '@app/store/reducers/auth/authSlice';
import { useSelector } from 'react-redux';
import LoginScreen from "@app/screens/auth/LoginScreen";

const AuthProvider = ({ children }) => {
    const user = useSelector(selectUser);

    if (!user) {
        return <LoginScreen />;
    }

    return children;
}

export default AuthProvider;
