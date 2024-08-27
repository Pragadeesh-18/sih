import Component from "@ember/component";
import { inject as service } from "@ember/service";
import Ember from "ember";

export default Component.extend({
  store: service(),
  init() {
    this._super(...arguments);
    this.set("sensor", this.get("sensor"));
    this.set("chartId", this.get("chartId"));
    this.set("data", Ember.A());
    this.set("labels", Ember.A());
    this.set("residueData", Ember.A());
    this.set("residueLabel", Ember.A());
    this.set("clearCount", 0);
  },
  didInsertElement() {
    this._super(...arguments);
    this.set("ctx", document.getElementById(this.chartId).getContext("2d"));
    this.createChart();
    this.setupHoverEffect();
    this.set(
      "intervalId",
      setInterval(() => this.addData(), 1000)
    );
  },
  setupHoverEffect() {
    $(`#pausebutton-${this.sensor}`).on("mouseenter", () => {
      this.set("isPauseHovered", true);
    });

    $(`#pausebutton-${this.sensor}`).on("mouseleave", () => {
      this.set("isPauseHovered", false);
    });
  },
  willDestroyElement() {
    this._super(...arguments);
    clearInterval(this.get("intervalId"));
    if (this.chart) {
      this.chart.destroy();
    }
  },

  createChart() {
    this.chart = new Chart(this.get("ctx"), {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "timestamp",
            data: this.data,
          },
        ],
      },
      options: {
        responsive: true,
        animations: {
          duration: 1000,
          easing: "linear",
        },
      },
    });
  },

  addData() {
    let records = this.store.peekAll("sensor-data")._arrangedContent;
    let data = records[records.length - 1].__data;
    if (this.isPauseHovered) {
      this.residueData.push(data[this.sensor]);
      this.residueLabel.push(data.timestamp);
      if (this.data.length > 30) {
        this.clearCount += 1;
      }
    } else {
      if (this.residueData.length != 0) {
        this.data.push(...this.residueData);
        this.labels.push(...this.residueLabel);
        this.residueData.clear();
        this.residueLabel.clear();
        if (this.clearCount > 0) {
          this.data.splice(0, this.clearCount);
          this.labels.splice(0, this.clearCount);
          this.set("clearCount", 0);
        }
      }
      if (this.data.length > 30) {
        this.data.shift();
        this.labels.shift();
      }
      this.data.push(data[this.sensor]);
      this.labels.push(data.timestamp);
      this.chart.update();
    }
  },
  actions: {
    clearChart() {
      this.data.clear();
      this.labels.clear();
    },
  },
  willDestroyElement() {
    this.data.clear();
    this.labels.clear();
    this.residueData.clear();
    this.residueLabel.clear();
  },
});
