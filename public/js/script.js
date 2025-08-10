const socket = io();
const map = L.map("map").setView([20, 78], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap",
}).addTo(map);

const markers = {};

// Send my location
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit('send-location', { latitude, longitude });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
}

// Receive other users' locations
socket.on('receive-location', (data) => {
    const { id, latitude, longitude } = data;

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }

    if (id === socket.id) {
        map.setView([latitude, longitude], 16);
    }
});

// Remove marker on disconnect
socket.on('user-disconnected', (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});