import { useState } from 'react';
import axios from "axios";
import AnalysisChart from './Chart';
import CategoryPie from './Pie';
import MonthlySummaryTable from './MonthlyTable';
import CategorySummaryTable from './CategoryTable';
import DownloadPdfButton from './DownloadPDFButton';

function UploadBar() {
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [result, setResult] = useState<any>(null)
    const API_URL = import.meta.env.VITE_API_URL;


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
                <div id="dashboard-content" className='mt-4 p-4 bg-gray-100 rounded-lg shadow'>
                    <h1>AI Analysis Report</h1>

                    <h2>Overview</h2>
                    <p>{result.result.overview}</p>

                    <h2> Monthly Financial Overview</h2>
                    <br />
                    <MonthlySummaryTable data={result.monthly_summary} />
                    <br />
                    <br />
                    <AnalysisChart data={result.monthly_summary} />

                    <h2> Category Breakdown</h2>
                    <br />
                    <CategorySummaryTable data={result.category_summary} />
                    <br />
                    <br />
                    <CategoryPie data={result.category_summary} />

                    <h2>AI Insights</h2>
                    <p>{result.result.insights}</p>
                </div>
            )}
            {result && (
                <DownloadPdfButton />  
            )}
                                 
        </div>
    );
}

export default UploadBar;