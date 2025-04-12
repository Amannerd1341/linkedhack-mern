import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHackathons } from '../store/slices/hackathonSlice';
import HackathonList from '../components/hackathons/HackathonList';
import Spinner from '../components/layout/Spinner';

const HackathonsPage = () => {
  const dispatch = useDispatch();
  const { hackathons, loading, error } = useSelector((state) => state.hackathons);

  useEffect(() => {
    dispatch(fetchHackathons());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div className="alert error">{error}</div>;

  return (
    <div className="page-container">
      <h1>Upcoming Hackathons</h1>
      <HackathonList hackathons={hackathons} />
    </div>
  );
};

export default HackathonsPage;