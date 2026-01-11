document.addEventListener('DOMContentLoaded', () => {
    // Initialize JustGage instances
    const cpuGauge = new JustGage({
        id: "cpuGauge",
        value: 0,
        min: 0,
        max: 100,
        title: "CPU",
        label: "%",
        pointerOptions: {
            toplength: -15,
            bottomlength: 10,
            bottomwidth: 12,
            color: '#8e8e93',
            stroke: '#ffffff',
            stroke_width: 3,
            stroke_linecap: 'round'
        },
        valueMinFontSize: 14
    });

    const memGauge = new JustGage({
        id: "memGauge",
        value: 0,
        min: 0,
        max: 100,
        title: "Memory",
        label: "%",
        pointerOptions: {
            toplength: -15,
            bottomlength: 10,
            bottomwidth: 12,
            color: '#8e8e93',
            stroke: '#ffffff',
            stroke_width: 3,
            stroke_linecap: 'round'
        },
        valueMinFontSize: 14
    });

    const tempGauge = new JustGage({
        id: "tempGauge",
        value: 0,
        min: 0,
        max: 100, // Assuming max temp around 100C for RPi
        title: "Temperature",
        label: "°C",
        pointerOptions: {
            toplength: -15,
            bottomlength: 10,
            bottomwidth: 12,
            color: '#8e8e93',
            stroke: '#ffffff',
            stroke_width: 3,
            stroke_linecap: 'round'
        },
        valueMinFontSize: 14,
        gaugeColor: "#eeeeee",
        levelColors: [
            "#60c40e", // Green for normal
            "#ffc107", // Orange for warning
            "#dc3545"  // Red for critical
        ],
        customSectors: [{
            color: "#60c40e",
            lo: 0,
            hi: 55
        }, {
            color: "#ffc107",
            lo: 55,
            hi: 75
        }, {
            color: "#dc3545",
            lo: 75,
            hi: 100
        }]
    });

    // Get numeric display elements
    const cpuNumeric = document.getElementById('cpuNumeric');
    const memNumeric = document.getElementById('memNumeric');
    const tempNumeric = document.getElementById('tempNumeric');
    const netTxNumeric = document.getElementById('netTxNumeric');
    const netRxNumeric = document.getElementById('netRxNumeric');

    let lastNetTx = 0;
    let lastNetRx = 0;

    const fetchData = async () => {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();

            // Update CPU
            const cpuPercent = data.cpu_percent.toFixed(1);
            cpuGauge.refresh(cpuPercent);
            cpuNumeric.textContent = `${cpuPercent}%`;

            // Update Memory
            const memPercent = data.memory_percent.toFixed(1);
            memGauge.refresh(memPercent);
            memNumeric.textContent = `${memPercent}%`;

            // Update Temperature
            const cpuTemp = data.cpu_temperature ? data.cpu_temperature.toFixed(1) : 'N/A';
            if (cpuTemp !== 'N/A') {
                tempGauge.refresh(cpuTemp);
                tempNumeric.textContent = `${cpuTemp}°C`;
            } else {
                tempNumeric.textContent = 'N/A';
            }

            // Update Network I/O
            if (lastNetTx === 0 && lastNetRx === 0) {
                // Skip first update as we need a baseline for rate calculation
            } else {
                 const txRate = ((data.net_tx - lastNetTx) / 2000).toFixed(2); // KB/s
                 const rxRate = ((data.net_rx - lastNetRx) / 2000).toFixed(2); // KB/s
                 netTxNumeric.textContent = `${txRate} KB/s`;
                 netRxNumeric.textContent = `${rxRate} KB/s`;
            }
            lastNetTx = data.net_tx;
            lastNetRx = data.net_rx;

        } catch (error) {
            console.error('Error fetching data:', error);
            cpuNumeric.textContent = 'Err';
            memNumeric.textContent = 'Err';
            tempNumeric.textContent = 'Err';
            netTxNumeric.textContent = 'Err';
            netRxNumeric.textContent = 'Err';
        }
    };

    // Initial fetch and then every 2 seconds
    fetchData();
    setInterval(fetchData, 2000);
});