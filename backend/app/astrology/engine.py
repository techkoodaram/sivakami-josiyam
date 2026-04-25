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
                planet_results[name] = {
                    "longitude": longitude,
                    "rasi": self.get_rasi(longitude),
                    "nakshatra": self.get_nakshatra(longitude),
                    "pada": self.get_pada(longitude)
                }
                
            # Ketu calculation (180 degrees from Rahu)
            ketu_long = (planet_results["Rahu"]["longitude"] + 180) % 360
            planet_results["Ketu"] = {
                "longitude": ketu_long,
                "rasi": self.get_rasi(ketu_long),
                "nakshatra": self.get_nakshatra(ketu_long),
                "pada": self.get_pada(ketu_long)
            }
            
            # House calculation (Lagna / Ascendant)
            # b'P' is Placidus, but for Rasi chart we just need the Ascendant sign
            cusps, ascmc = swe.houses_ex(jd, lat, lon, b'P', swe.FLG_SIDEREAL)
            lagna_long = ascmc[0]
            
            planet_results["Lagna"] = {
                "longitude": lagna_long,
                "rasi": self.get_rasi(lagna_long),
                "nakshatra": self.get_nakshatra(lagna_long),
                "pada": self.get_pada(lagna_long)
            }
            
            return {
                "status": "success",
                "jd": jd,
                "planets": planet_results,
                "moon_sign": planet_results["Moon"]["rasi"],
                "star": planet_results["Moon"]["nakshatra"],
                "lagna": planet_results["Lagna"]["rasi"]
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_rasi(self, longitude):
        rasis = ["Mesham", "Rishabam", "Midhunam", "Kadagam", "Simmam", "Kanni", "Thulaam", "Viruchigam", "Dhanusu", "Magaram", "Kumbam", "Meenam"]
        return rasis[int(longitude / 30)]

    def get_nakshatra(self, longitude):
        nakshatras = [
            "Ashwini", "Bharani", "Krithika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
            "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
            "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
        ]
        # Each nakshatra is 13 degrees 20 minutes (13.333...)
        idx = int(longitude / (360/27))
        return nakshatras[idx % 27]
        
    def get_pada(self, longitude):
        # Each pada = 3 degrees 20 minutes (3.333...)
        pada = int((longitude % (360/27)) / (360/108)) + 1
        return pada
