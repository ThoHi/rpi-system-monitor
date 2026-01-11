from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import psutil
import shutil

app = FastAPI()

@app.get("/api/stats")
def get_stats():
    # CPU
    cpu_percent = psutil.cpu_percent(interval=1)
    
    # Memory
    memory = psutil.virtual_memory()
    memory_percent = memory.percent
    
    # Temperature
    # Try to get temperature from psutil, fallback to reading the system file
    try:
        temps = psutil.sensors_temperatures()
        # Look for the core temperature
        core_temp = next((entry.current for entry in temps.get('coretemp', []) if entry.label == 'Core 0'), None)
        if core_temp is None:
             core_temp = next((entry.current for entry in temps.get('cpu_thermal', [])), None)
        if core_temp is None:
            with open("/sys/class/thermal/thermal_zone0/temp", "r") as f:
                core_temp = int(f.read()) / 1000.0
    except (IOError, KeyError):
        core_temp = None


    # Network
    net_io = psutil.net_io_counters()
    net_tx = net_io.bytes_sent
    net_rx = net_io.bytes_recv

    return {
        "cpu_percent": cpu_percent,
        "memory_percent": memory_percent,
        "cpu_temperature": core_temp,
        "net_tx": net_tx,
        "net_rx": net_rx,
    }

# Serve the static files from the 'static' directory
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('static/index.html')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
