import swisseph as swe
from datetime import datetime
import math

class AstrologyEngine:
    def __init__(self):
        # Default to Lahiri Ayanamsa for Indian Astrology
        swe.set_sid_mode(swe.SIDM_LAHIRI)
        
    def calculate_birth_details(self, dob_str: str, tob_str: str, lat: float, lon: float):
        """
        Calculate planetary positions and birth details.
        dob_str: YYYY-MM-DD
        tob_str: HH:MM
        lat/lon: Decimal coordinates
        """
        try:
            dt = datetime.strptime(f"{dob_str} {tob_str}", "%Y-%m-%d %H:%M")
            
            # Convert to Julian Day (Assuming UTC for now - in production, convert local to UTC)
            jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute/60.0)
            
            planets_to_calc = {
                "Sun": swe.SUN,
                "Moon": swe.MOON,
                "Mars": swe.MARS,
                "Mercury": swe.MERCURY,
                "Jupiter": swe.JUPITER,
                "Venus": swe.VENUS,
                "Saturn": swe.SATURN,
                "Rahu": swe.MEAN_NODE,
            }
            
            planet_results = {}
            for name, planet_id in planets_to_calc.items():
                # Calculate sidereal positions
                res, ret = swe.calc_ut(jd, planet_id, swe.FLG_SIDEREAL)
                longitude = res[0]
                rasi_idx = int(longitude / 30)
                planet_results[name] = {
                    "longitude": longitude,
                    "rasi": self.get_rasi(longitude),
                    "rasi_tamil": self.get_rasi_tamil(longitude),
                    "rasi_id": rasi_idx,
                    "nakshatra": self.get_nakshatra(longitude),
                    "nakshatra_tamil": self.get_nakshatra_tamil(longitude),
                    "pada": self.get_pada(longitude)
                }
                
            # Ketu calculation (180 degrees from Rahu)
            ketu_long = (planet_results["Rahu"]["longitude"] + 180) % 360
            ketu_rasi_idx = int(ketu_long / 30)
            planet_results["Ketu"] = {
                "longitude": ketu_long,
                "rasi": self.get_rasi(ketu_long),
                "rasi_tamil": self.get_rasi_tamil(ketu_long),
                "rasi_id": ketu_rasi_idx,
                "nakshatra": self.get_nakshatra(ketu_long),
                "nakshatra_tamil": self.get_nakshatra_tamil(ketu_long),
                "pada": self.get_pada(ketu_long)
            }
            
            # House calculation (Lagna / Ascendant)
            cusps, ascmc = swe.houses_ex(jd, lat, lon, b'P', swe.FLG_SIDEREAL)
            lagna_long = ascmc[0]
            lagna_rasi_idx = int(lagna_long / 30)
            
            planet_results["Lagna"] = {
                "longitude": lagna_long,
                "rasi": self.get_rasi(lagna_long),
                "rasi_tamil": self.get_rasi_tamil(lagna_long),
                "rasi_id": lagna_rasi_idx,
                "nakshatra": self.get_nakshatra(lagna_long),
                "nakshatra_tamil": self.get_nakshatra_tamil(lagna_long),
                "pada": self.get_pada(lagna_long)
            }
            
            return {
                "status": "success",
                "jd": jd,
                "planets": planet_results,
                "moon_sign": planet_results["Moon"]["rasi"],
                "moon_sign_tamil": planet_results["Moon"]["rasi_tamil"],
                "star": planet_results["Moon"]["nakshatra"],
                "star_tamil": planet_results["Moon"]["nakshatra_tamil"],
                "lagna": planet_results["Lagna"]["rasi"],
                "lagna_tamil": planet_results["Lagna"]["rasi_tamil"]
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_rasi(self, longitude):
        rasis = ["Mesham", "Rishabam", "Midhunam", "Kadagam", "Simmam", "Kanni", "Thulaam", "Viruchigam", "Dhanusu", "Magaram", "Kumbam", "Meenam"]
        return rasis[int(longitude / 30)]

    def get_rasi_tamil(self, longitude):
        rasis = ["மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"]
        return rasis[int(longitude / 30)]

    def get_nakshatra(self, longitude):
        nakshatras = [
            "Ashwini", "Bharani", "Krithika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
            "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
            "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
        ]
        idx = int(longitude / (360/27))
        return nakshatras[idx % 27]

    def get_nakshatra_tamil(self, longitude):
        nakshatras = [
            "அஸ்வினி", "பரணி", "கிருத்திகை", "ரோகிணி", "மிருகசீரிடம்", "திருவாதிரை", "புனர்பூசம்", "பூசம்", "ஆயில்யம்",
            "மகம்", "பூரம்", "உத்திரம்", "அஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை",
            "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதயம", "பூரட்டாதி", "உத்திரட்டாதி", "ரேவதி"
        ]
        idx = int(longitude / (360/27))
        return nakshatras[idx % 27]
        
    def get_pada(self, longitude):
        # Each pada = 3 degrees 20 minutes (3.333...)
        pada = int((longitude % (360/27)) / (360/108)) + 1
        return pada
