import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnections } from '../store/slices/userSlice';
import UserCard from '../components/users/UserCard';
import Spinner from '../components/layout/Spinner';

const NetworkPage = () => {
  const dispatch = useDispatch();
  const { connections, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div className="alert error">{error}</div>;

  return (
    <div className="network-page">
      <h1>Your Network</h1>
      <div className="connections-list">
        {connections.length > 0 ? (
          connections.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p>You haven't connected with anyone yet</p>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;