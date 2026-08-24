import sys
from pathlib import Path

# Add project root to sys.path for pytest
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(BASE_DIR))
