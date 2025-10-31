import { useState } from 'react';

function UploadBar() {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
                Choose File
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.csv,.xlsx,.xls,.txt"
            />
            {file && <p>Uploaded: {file.name}</p>}
        </div>
    )
}

export default UploadBar;