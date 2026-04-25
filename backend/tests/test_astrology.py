import pytest
from app.astrology.engine import AstrologyEngine
from app.astrology.muhurtham import MuhurthamFinder

@pytest.fixture
def engine():
    return AstrologyEngine()

@pytest.fixture
def finder(engine):
    return MuhurthamFinder(engine)

def test_engine_initialization(engine):
    assert engine is not None

def test_calculate_birth_details(engine):
    # Test with a known birth date: Jan 1, 1990, 12:00 PM, Chennai
    # Chennai: Lat 13.0827, Lon 80.2707
    result = engine.calculate_birth_details("1990-01-01", "12:00", 13.0827, 80.2707)
    assert result["status"] == "success"
    assert "planets" in result
    assert "Moon" in result["planets"]
    assert "Lagna" in result["planets"]
    
    # Verify some data exists
    assert result["moon_sign"] is not None
    assert result["star"] is not None
    assert result["lagna"] is not None

def test_muhurtham_finder(finder):
    # Test finding dates for May 2026
    dates = finder.find_dates(2026, 5, 13.0827, 80.2707)
    assert isinstance(dates, list)
    assert len(dates) >= 0
    if len(dates) > 0:
        assert "date" in dates[0]
        assert "star" in dates[0]
        assert "auspicious_slots" in dates[0]

def test_bad_timing_calculation(finder):
    # Monday (0) Rahu Kalam is usually 7:30 - 9:00
    start, end = finder.get_bad_timing(6.0, 18.0, 0, "rahu")
    assert finder.format_time(start) == "07:30"
    assert finder.format_time(end) == "09:00"
