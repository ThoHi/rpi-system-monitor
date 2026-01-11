# RPi System Monitor

A simple, lightweight web application to monitor the CPU usage, memory usage, CPU temperature, and network traffic of a Raspberry Pi in real-time using a clean, dial-based interface.

![Screenshot](./images/rpi_monitor_screenshot.png) <!-- Placeholder for a screenshot -->

## Features

*   **Real-time Monitoring:** View live data from your Raspberry Pi.
*   **Dial Indicators:** Clean and clear gauges for CPU, Memory, and Temperature.
*   **Numeric Displays:** Precise values for all monitored metrics.
*   **Lightweight:** Built with Python (FastAPI) and simple JavaScript, with minimal dependencies.
*   **Self-contained:** The backend server also serves the frontend application.

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPONAME>.git
    cd <YOUR_REPONAME>
    ```

2.  **Create a Virtual Environment:**
    It is highly recommended to use a virtual environment to manage dependencies.
    ```bash
    python3 -m venv .venv
    ```

3.  **Install Dependencies:**
    Install the required Python packages using the `requirements.txt` file:
    ```bash
    ./.venv/bin/pip install -r requirements.txt
    ```

4.  **Run the Application:**
    Start the web server by running the `uvicorn` command:
    ```bash
    ./.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
    ```
    You should see output indicating that the server is running.

5.  **Access the Dashboard:**
    Open a web browser on any device connected to the same network as your Raspberry Pi. Navigate to:
    `http://<YOUR_RPI_IP_ADDRESS>:8000`

    Replace `<YOUR_RPI_IP_ADDRESS>` with the actual IP address of your Raspberry Pi (you can find it by running `hostname -I`).

## Contributing

Contributions are welcome! If you have a suggestion or find a bug, please open an issue to discuss it.

## License

This project is open-source and licensed under the [MIT License](LICENSE).
