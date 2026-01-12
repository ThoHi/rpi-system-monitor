# RPi System Monitor

A simple, lightweight web application to monitor the CPU usage, memory usage, CPU temperature, and network traffic of a Raspberry Pi in real-time using a clean, dial-based interface.

![Screenshot](<rpi web app.png>) <!-- Placeholder for a screenshot -->

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

## Running as a Service (systemd)

To ensure the application starts automatically on boot and runs continuously in the background, you can set it up as a `systemd` service.

1.  **Create a Service File:**

    Use a text editor with `sudo` to create a service file in the system directory:
    ```bash
    sudo nano /etc/systemd/system/rpi-monitor.service
    ```

2.  **Add the Service Configuration:**

    Copy and paste the following content into the editor:
    ```ini
    [Unit]
    Description=RPi System Monitor
    After=network-online.target
    Wants=network-online.target

    [Service]
    ExecStart=/path/to/your/project/.venv/bin/python /path/to/your/project/main.py
    WorkingDirectory=/path/to/your/project
    StandardOutput=inherit
    StandardError=inherit
    Restart=always
    User=your_user

    [Install]
    WantedBy=multi-user.target
    ```

    **Important:** You must replace the placeholder values:
    *   Replace `/path/to/your/project` with the **absolute path** to the project's root directory.
    *   Replace `your_user` with your username (the user that owns the project files).

    Save the file and exit the editor (in `nano`, press `Ctrl+X`, then `Y`, then `Enter`).

3.  **Enable and Start the Service:**

    Now, manage the service with the following commands:
    ```bash
    # Reload the systemd daemon to read the new service file
    sudo systemctl daemon-reload

    # Enable the service to start automatically on boot
    sudo systemctl enable rpi-monitor.service

    # Start the service immediately
    sudo systemctl start rpi-monitor.service
    ```

4.  **Check the Status:**

    You can check if the service is running correctly at any time:
    ```bash
    sudo systemctl status rpi-monitor.service
    ```
    You should see output indicating that the service is "active (running)".

## Contributing

Contributions are welcome! If you have a suggestion or find a bug, please open an issue to discuss it.

## License

This project is open-source and licensed under the [MIT License](LICENSE).
