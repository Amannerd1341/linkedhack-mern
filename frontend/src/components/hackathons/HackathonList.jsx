import HackathonCard from './HackathonCard';

const HackathonList = ({ hackathons }) => {
  return (
    <div className="hackathon-list">
      {hackathons.length > 0 ? (
        hackathons.map((hackathon) => (
          <HackathonCard key={hackathon._id} hackathon={hackathon} />
        ))
      ) : (
        <p className="no-results">No hackathons found</p>
      )}
    </div>
  );
};

export default HackathonList;