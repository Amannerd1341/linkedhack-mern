import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <Header />
      <main className="hero">
        <h1>Welcome to LinkedHack</h1>
        <p>Connect with professionals and discover exciting hackathons</p>
        {!isAuthenticated ? (
          <Link to="/auth" className="cta-button">
            Get Started
          </Link>
        ) : (
          <div className="cta-buttons">
            <Link to="/hackathons" className="cta-button">
              Browse Hackathons
            </Link>
            <Link to="/network" className="cta-button">
              View Network
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;