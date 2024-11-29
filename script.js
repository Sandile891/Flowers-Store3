
// Function to start the scanner
function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner')
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        Quagga.start();
        console.log("Scanner started");
    });

    // Listen for detected barcodes
    Quagga.onDetected(result => {
        const code = result.codeResult.code;
        console.log("Barcode detected:", code);
        playVideoForBarcode(code);
        Quagga.stop(); // Stop scanning after successful detection
    });
}

// Function to play the video associated with the scanned barcode
function playVideoForBarcode(barcode) {
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.getElementById('promoVideo');

    if (videoMap[barcode]) {
        videoElement.src = videoMap[barcode];
        videoElement.play();
        videoContainer.style.display = 'block';
    } else {
        alert("No video found for this barcode.");
    }
}
///////
function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code scanned: ${decodedText}`);
    
    if (decodedText === "https://qrco.de/bfYNKb") {
        const imageElement = document.getElementById('scanned-image');
        imageElement.style.display = 'block';
    } else {
        alert("This QR code is not recognized.");
    }
}

function onScanFailure(error) {
    console.warn(`Code scan error: ${error}`);
}

// Initialize the QR code scanner
const html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", 
    { fps: 10, qrbox: 250 },
    false
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);

///////////////////
