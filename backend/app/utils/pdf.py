from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime

def generate_birth_chart_pdf(data: dict):
    """
    Generate a PDF report for a birth chart.
    """
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    
    # Header
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(width/2, height - 50, "Sivakami Josiyam")
    c.setFont("Helvetica", 12)
    c.drawCentredString(width/2, height - 70, "Authentic Tamil Astrology Report")
    
    c.line(50, height - 90, width - 50, height - 90)
    
    # User Details
    c.setFont("Helvetica-Bold", 14)
    c.drawString(100, height - 130, "Birth Details")
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 150, f"Name: {data.get('name', 'N/A')}")
    c.drawString(100, height - 170, f"Date: {data.get('dob', 'N/A')}")
    c.drawString(100, height - 190, f"Time: {data.get('tob', 'N/A')}")
    
    # Results
    c.setFont("Helvetica-Bold", 14)
    c.drawString(100, height - 230, "Horoscope Summary")
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 250, f"Moon Sign (Rasi): {data.get('moon_sign', 'N/A')}")
    c.drawString(100, height - 270, f"Star (Nakshatra): {data.get('star', 'N/A')}")
    c.drawString(100, height - 290, f"Ascendant (Lagna): {data.get('lagna', 'N/A')}")
    
    # Footer
    c.setFont("Helvetica-Oblique", 8)
    c.drawCentredString(width/2, 30, f"Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} - sivakami-josiyam.com")
    
    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer
