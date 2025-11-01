from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from agent import analysis_agent
from mock_agent import mock_agent
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        result = mock_agent(file_path)

        out_df = pd.DataFrame(result["transactions"])
        out_df["date"] = pd.to_datetime(out_df["date"])

        # Create a readable month label (e.g., "October 2025")
        out_df["month"] = out_df["date"].dt.strftime("%B %Y")

        monthly_summary = (
            out_df.groupby(["month", "type"])["amount"]
            .sum()
            .unstack(fill_value=0)
            .reset_index()
            .rename_axis(None, axis=1)
        )

        monthly_summary["savings"] = monthly_summary.get("income", 0) + monthly_summary.get("expense", 0)

        return {"message": "File analyzed successfully", "result": result, "monthly_summary": monthly_summary.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
