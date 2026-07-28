from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

app = FastAPI(
    title="DaleTePido API",
    description="Servidor Backend en Python para el procesamiento de solicitudes de DaleTePido",
    version="1.0.0"
)

# Configuración de CORS para pruebas locales y dominios del proyecto
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "DaleTePido API",
        "documentation": "/docs"
    }

@app.post("/api/solicitud")
async def recibir_solicitud(payload: Dict[str, Any]):
    """
    Ruta POST que recibe un JSON dinámico, procesa los datos
    y devuelve una confirmación en formato JSON.
    """
    try:
        # Aquí se pueden integrar validaciones, guardados en base de datos o lógica de negocio
        return {
            "status": "success",
            "message": "Solicitud procesada correctamente",
            "recibido": payload
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
