import { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/api/files/history')
      .then(res => setFiles(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDownload = (id) => window.open(`/api/files/download/${id}`, '_blank');
  const handleDelete = (id) => {
    axios.delete(`/api/files/${id}`).then(() =>
      setFiles(files.filter(f => f._id !== id))
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🕘 Upload History</h2>
      <table className="w-full border">
        <thead>
          <tr><th>File Name</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file._id}>
              <td>{file.name}</td>
              <td>{new Date(file.uploadedAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDownload(file._id)} className="btn">Download</button>
                <button onClick={() => handleDelete(file._id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
