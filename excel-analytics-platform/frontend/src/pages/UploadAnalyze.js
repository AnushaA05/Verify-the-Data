import React, { useState, useContext } from 'react';
import axios from 'axios';
import { saveUpload } from '../services/api';
import { UserContext } from '../context/UserContext';

const UploadAnalyze = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(UserContext);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile) return alert('Select a file');

    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log("👤 Uploading as user:", user); // ✅ Log user info

    try {
      // Step 1: Upload the file
      const uploadResponse = await axios.post('http://localhost:5000/api/files/upload', formData);
      console.log("✅ File uploaded:", uploadResponse.data);

      // Step 2: Save the upload to history
      const saveResponse = await saveUpload({ userId: user.id, name: selectedFile.name });
      console.log("📝 History saved:", saveResponse.data);

      alert('Upload saved');
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadAnalyze;




