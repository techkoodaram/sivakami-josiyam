from datetime import datetime, timedelta
import swisseph as swe

class MuhurthamFinder:
    def __init__(self, engine):
        self.engine = engine

    def find_dates(self, year: int, month: int, lat: float, lon: float, weekend_only: bool = False):
        """
        Find auspicious marriage dates for a given month.
        """
        start_date = datetime(year, month, 1)
        # Handle month overflow
        if month == 12:
            end_date = datetime(year + 1, 1, 1)
        else:
            end_date = datetime(year, month + 1, 1)
            
        auspicious_dates = []
        current_date = start_date
        
        while current_date < end_date:
            if weekend_only and current_date.weekday() not in [5, 6]:
                current_date += timedelta(days=1)
                continue
                
            # Basic Auspiciousness Check (simplified for MVP)
            # 1. Calculate Sun/Moon positions
            jd = swe.julday(current_date.year, current_date.month, current_date.day, 12.0) # Noon
            res, ret = swe.calc_ut(jd, swe.MOON, swe.FLG_SIDEREAL)
            moon_long = res[0]
            star = self.engine.get_nakshatra(moon_long)
            
            # Avoid certain bad stars (simplified)
            bad_stars = ["Bharani", "Krithika", "Ashlesha", "Jyeshtha", "Mula"]
            if star not in bad_stars:
                # Calculate Sunrise/Sunset for this day
                # swe.rise_trans_true_test gives rise/set
                # For MVP, let's use fixed timings or a simple estimation
                sunrise = 6.0 # 6 AM
                sunset = 18.0 # 6 PM
                
                rahu_start, rahu_end = self.get_bad_timing(sunrise, sunset, current_date.weekday(), "rahu")
                
                auspicious_dates.append({
                    "date": current_date.strftime("%Y-%m-%d"),
                    "day": current_date.strftime("%A"),
                    "star": star,
                    "auspicious_slots": [
                        {"start": "09:00", "end": "10:30"},
                        {"start": "11:00", "end": "12:30"}
                    ],
                    "avoid": {
                        "rahu": self.format_time(rahu_start),
                        "yamagandam": self.format_time(self.get_bad_timing(sunrise, sunset, current_date.weekday(), "yama")[0])
                    }
                })
            
            current_date += timedelta(days=1)
            
        return auspicious_dates[:10] # Return top 10 as per requirements

    def get_bad_timing(self, sunrise, sunset, weekday, type="rahu"):
        day_length = sunset - sunrise
        part = day_length / 8
        
        if type == "rahu":
            rk_map = {0: 1, 1: 6, 2: 4, 3: 7, 4: 3, 5: 5, 6: 2} # Mon-Sun
        else: # Yamagandam
            rk_map = {0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5}
            
        idx = rk_map[weekday]
        start = sunrise + (idx * part)
        end = start + part
        return start, end

    def format_time(self, decimal_hour):
        hours = int(decimal_hour)
        minutes = int((decimal_hour - hours) * 60)
        return f"{hours:02d}:{minutes:02d}"
