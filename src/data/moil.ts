// Aggregated from moil_production_shortfall_dataset.csv (MOIL mine sites, daily records)
export const moil = {
  "rows": 3650,
  "start": "2024-01-01",
  "end": "2025-12-30",
  "target": 3139000,
  "actual": 2621873.0,
  "shortfall": 517169.0,
  "avgPct": 16.46,
  "riskShare": 55.3,
  "sites": [
    {
      "site": "Gumgaon",
      "state": "Maharashtra",
      "coords": "21.16\u00b0N 78.85\u00b0E",
      "target": 584000,
      "actual": 486522.5,
      "shortfall": 97489.5,
      "avgPct": 16.69,
      "riskDays": 417,
      "grade": 37.97,
      "downtime": 1.33,
      "health": 79.9,
      "workforce": 91.6
    },
    {
      "site": "Ukwa",
      "state": "Madhya Pradesh",
      "coords": "21.95\u00b0N 80.42\u00b0E",
      "target": 693500,
      "actual": 578288.2,
      "shortfall": 115216.8,
      "avgPct": 16.61,
      "riskDays": 409,
      "grade": 38.18,
      "downtime": 1.39,
      "health": 80.4,
      "workforce": 92.0
    },
    {
      "site": "Balaghat",
      "state": "Madhya Pradesh",
      "coords": "21.81\u00b0N 80.18\u00b0E",
      "target": 876000,
      "actual": 731754.7,
      "shortfall": 144261.1,
      "avgPct": 16.47,
      "riskDays": 410,
      "grade": 37.73,
      "downtime": 1.29,
      "health": 79.8,
      "workforce": 91.6
    },
    {
      "site": "Dongri Buzurg",
      "state": "Maharashtra",
      "coords": "21.44\u00b0N 79.68\u00b0E",
      "target": 511000,
      "actual": 427882.3,
      "shortfall": 83121.4,
      "avgPct": 16.27,
      "riskDays": 397,
      "grade": 38.3,
      "downtime": 1.27,
      "health": 80.1,
      "workforce": 92.0
    },
    {
      "site": "Chikla",
      "state": "Maharashtra",
      "coords": "21.28\u00b0N 79.92\u00b0E",
      "target": 474500,
      "actual": 397425.7,
      "shortfall": 77080.1,
      "avgPct": 16.24,
      "riskDays": 386,
      "grade": 38.15,
      "downtime": 1.32,
      "health": 80.0,
      "workforce": 92.0
    }
  ],
  "monthly": [
    {
      "month": "Jan",
      "pct": 16.25,
      "rain": 3.0,
      "risk": 55.5
    },
    {
      "month": "Feb",
      "pct": 15.51,
      "rain": 3.0,
      "risk": 54.4
    },
    {
      "month": "Mar",
      "pct": 15.9,
      "rain": 3.2,
      "risk": 51.6
    },
    {
      "month": "Apr",
      "pct": 15.02,
      "rain": 3.3,
      "risk": 46.3
    },
    {
      "month": "May",
      "pct": 15.03,
      "rain": 3.1,
      "risk": 48.1
    },
    {
      "month": "Jun",
      "pct": 17.99,
      "rain": 16.4,
      "risk": 65.0
    },
    {
      "month": "Jul",
      "pct": 18.35,
      "rain": 16.2,
      "risk": 64.8
    },
    {
      "month": "Aug",
      "pct": 18.56,
      "rain": 16.9,
      "risk": 66.8
    },
    {
      "month": "Sep",
      "pct": 18.73,
      "rain": 15.9,
      "risk": 68.7
    },
    {
      "month": "Oct",
      "pct": 15.34,
      "rain": 3.1,
      "risk": 46.8
    },
    {
      "month": "Nov",
      "pct": 14.95,
      "rain": 3.0,
      "risk": 47.0
    },
    {
      "month": "Dec",
      "pct": 15.81,
      "rain": 3.0,
      "risk": 48.9
    }
  ],
  "drivers": [
    {
      "name": "Equipment downtime (hrs)",
      "r": 0.716
    },
    {
      "name": "Equipment health index",
      "r": -0.415
    },
    {
      "name": "Rainfall (mm)",
      "r": 0.296
    },
    {
      "name": "Workforce availability",
      "r": -0.286
    },
    {
      "name": "Blasting delay (min)",
      "r": 0.068
    },
    {
      "name": "Ore grade %",
      "r": -0.032
    }
  ],
  "weather": [
    {
      "name": "Normal",
      "days": 3289,
      "pct": 15.9
    },
    {
      "name": "Moderate",
      "days": 351,
      "pct": 21.2
    },
    {
      "name": "Severe",
      "days": 10,
      "pct": 32.91
    }
  ],
  "monsoonPct": 18.41,
  "dryPct": 15.48
} as const;
