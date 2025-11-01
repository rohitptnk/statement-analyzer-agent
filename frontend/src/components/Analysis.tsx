import { useState } from 'react';
import axios from "axios";
import AnalysisChart from './Chart';

function UploadBar() {
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [result, setResult] = useState<any>(null)
    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; 
        if (!selectedFile) return alert("Please select a file first.");

        setUploading(true);
        
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post(`${API_URL}/analyze`, formData, {
                headers: { "Content-Type": "multipart/form-data"},
            });
            console.log(response.data);
            setSuccess(true);
            setResult(response.data)
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
                {uploading ? "Analyzing..." : "Choose File"}
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
                ✅ Analysis successful
                </p>
            )}    

            {result && (
                <div className='mt-4 p-4 bg-gray-100 rounded-lg shadow'>
                    <h3 className='text-lg font-semibold mb-2'>Overview</h3>
                    <p>{result.result.overview}</p>

                    <AnalysisChart data={result.monthly_summary} />
                </div>
            )}       
        </div>
    );
}

export default UploadBar;