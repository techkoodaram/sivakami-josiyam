from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from .astrology.engine import AstrologyEngine
from .astrology.muhurtham import MuhurthamFinder
from .utils.pdf import generate_birth_chart_pdf
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI(title="Sivakami Josiyam API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = AstrologyEngine()
muhurtham = MuhurthamFinder(engine)

class BirthChartRequest(BaseModel):
    name: str
    dob: str # YYYY-MM-DD
    tob: str # HH:MM
    lat: float
    lon: float

class MarriageDatesRequest(BaseModel):
    bride_name: Optional[str] = None
    groom_name: Optional[str] = None
    year: int
    month: int
    lat: float
    lon: float
    weekend_only: bool = False

@app.get("/")
async def root():
    return {"message": "Sivakami Josiyam API is running"}

@app.post("/api/birth-chart")
async def get_birth_chart(req: BirthChartRequest):
    result = engine.calculate_birth_details(req.dob, req.tob, req.lat, req.lon)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["message"])
    return result

@app.post("/api/marriage-dates")
async def get_marriage_dates(req: MarriageDatesRequest):
    try:
        dates = muhurtham.find_dates(req.year, req.month, req.lat, req.lon, req.weekend_only)
        return {"dates": dates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/report/birth-chart")
async def download_report(req: BirthChartRequest):
    result = engine.calculate_birth_details(req.dob, req.tob, req.lat, req.lon)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["message"])
    
    data = {**result, "name": req.name, "dob": req.dob, "tob": req.tob}
    pdf_buffer = generate_birth_chart_pdf(data)
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={req.name}_horoscope.pdf"}
    )
