import { useState } from 'react';
import axios from "axios";

function UploadBar() {
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; 
        if (!selectedFile) return alert("Please select a file first.");

        setUploading(true);
        
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data"},
            });
            console.log(response.data);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Upload failed:");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-bar">
            <p className='upload-text'>
                Upload your bank statements to get AI-powered analysis and insights.
            </p>
            <p className="text-sm text-gray-500 text-center">
                Supported formats: PDF, CSV, XLSX
            </p>
            <label htmlFor="file-upload" className="upload-label">
                {uploading ? "Uploading..." : "Choose File"}
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={handleUpload}
                accept=".pdf,.csv,.xlsx,.xls,.txt"
                disabled={uploading}
            />

            {success && (
                <p className="text-green-600 font-semibold mt-3">
                    ✅ Upload successful
                </p>
            )}           
        </div>
    );
}

export default UploadBar;