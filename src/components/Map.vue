<template>
  <div ref="map-root" class="map"></div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

export default {
  name: "MapContainer",
  components: {},
  props: {
    coordinates: Object
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat(this.getCoordinates()))
      });

      new Map({
        target: this.$refs["map-root"],
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          new VectorLayer({
            source: new VectorSource({ features: [iconFeature] })
          })
        ],

        view: new View({
          zoom: 0,
          center: fromLonLat(this.getCoordinates()),
          constrainResolution: true
        })
      });
    },
    getCoordinates() {
      return [
        Number(this.coordinates.longitude),
        Number(this.coordinates.latitude)
      ];
    }
  }
};
</script>
<style scoped>
.map {
  width: 100%;
  height: 200px;
  max-height: 100%;
}
</style>