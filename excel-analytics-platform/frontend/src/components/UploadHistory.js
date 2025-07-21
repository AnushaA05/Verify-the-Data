import React, { useEffect, useState, useContext } from 'react';
import { fetchHistory } from '../services/api';
import { UserContext } from '../context/UserContext';

const UploadHistory = () => {
  const { user, loading } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (user?.id) {
      fetchHistory(user.id)
        .then((res) => setHistory(res.data))
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    } else {
      setFetching(false);
    }
  }, [user, loading]);

  if (loading || fetching) return <p>Loading...</p>;
  if (!user?.id) return <p>Please login to view history.</p>;

  return (
    <div>
      <h3>Upload History</h3>
      <ul>
        {history.length === 0 ? (
          <li>No uploads found</li>
        ) : (
          history.map((file, idx) => <li key={idx}>{file.name}</li>)
        )}
      </ul>
    </div>
  );
};

export default UploadHistory;







