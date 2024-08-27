import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  store: service(),
  url: "/sensor_stream/",
  eventSource: null,

  initiateSSE() {
    this.eventSource = new EventSource(this.url);
    this.eventSource.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };
  },

  handleMessage(data) {
    let object = JSON.parse(data);
    this.get("store").push({
      data: [
        {
          id: "" + object.id,
          type: "sensor-data",
          attributes: {
            hallSensor: object.hall_sensor,
            Co2Sensor: object.co2_sensor,
            timestamp: object.timestamp,
          },
        },
      ],
    });
  },
});
