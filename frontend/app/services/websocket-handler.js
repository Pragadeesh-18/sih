import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  store: service(),
  socket: null,

  connect(url) {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  },

  handleMessage(message) {
    const data = JSON.parse(message);

    if (data.type !== "Connection") {
      this.get("store").push({
        data: [
          {
            id: data.id.toString(),
            type: "sensor-data",
            attributes: {
              hallSensor: data.hall_sensor,
              Co2Sensor: data.co2_sensor,
              timestamp: data.timestamp,
            },
          },
        ],
      });
    } else {
      this.sendMessage({ status: "200" });
    }
  },

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  },
});
