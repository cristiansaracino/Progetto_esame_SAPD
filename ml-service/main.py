import pandas as pd
import joblib
import json
import re
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager

# --- CONFIGURAZIONE ---
MODEL_PATH = "rf_convenience.pkl"
DATA_PATH = "comuni_italiani2.json"

# Dizionario globale per mantenere le risorse in memoria
resources = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Caricamento Modello
    if os.path.exists(MODEL_PATH):
        try:
            resources['model'] = joblib.load(MODEL_PATH)
            print(f"Modello caricato: {MODEL_PATH}")
        except Exception as e:
            print(f"Errore caricamento modello: {e}")
    else:
        print(f"ATTENZIONE: File modello '{MODEL_PATH}' non trovato.")

    # 2. Caricamento Database Comuni
    if os.path.exists(DATA_PATH):
        try:
            with open(DATA_PATH, "r", encoding="utf-8") as f:
                dati_comuni = json.load(f)
                resources['mappa_zone'] = {c["comune"].lower(): c["zona"] for c in dati_comuni}
        except Exception as e:
            print(f"Errore caricamento JSON comuni: {e}")
    else:
        print(f"ATTENZIONE: File comuni '{DATA_PATH}' non trovato.")

    yield

    resources.clear()

# Inizializzazione App
app = FastAPI(lifespan=lifespan)

# --- MODELLO DATI
class AnnuncioInput(BaseModel):
    città: str
    lavoro: str
    tariffa: float

# --- ENDPOINT PREDITTIVO ---
@app.post("/prevedi")
def prevedi(data: AnnuncioInput):
    model = resources.get('model')
    mappa_zone = resources.get('mappa_zone')

    if not model:
        raise HTTPException(status_code=503, detail="Modello AI non caricato sul server.")
    if not mappa_zone:
        raise HTTPException(status_code=503, detail="Database comuni non caricato sul server.")

    # --- 1. PULIZIA E NORMALIZZAZIONE ---
    # Rimuove parentesi e provincia. Es: "Crissolo (CN)" -> "crissolo"
    citta_pulita = re.sub(r'\s*\(.*\)', '', data.città).strip().lower()
    zona_rilevata = mappa_zone.get(citta_pulita)

    # --- 2. PREPARAZIONE DATI PER IL MODELLO ---
    input_df = pd.DataFrame([{
        "categoria": data.lavoro,
        "regione": zona_rilevata,
        "prezzo_orario": data.tariffa
    }])

    # --- 3. PREDIZIONE ---
    try:
        # predict restituisce un array, prendiamo il primo elemento [0]
        prediction = model.predict(input_df)[0]
        
        result = {
            "valore": int(prediction),
            "zona_usata": zona_rilevata,
            "citta_pulita": citta_pulita
        }
        
        return result

    except Exception as e:
        print(f"Errore durante model.predict: {e}")
        raise HTTPException(status_code=500, detail=f"Errore interno predizione: {str(e)}")