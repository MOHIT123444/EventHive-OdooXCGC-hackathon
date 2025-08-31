import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user, token } = useSelector((state) => state.auth);
  return { user, token, isAuthenticated: !!token };
};

export default useAuth;
