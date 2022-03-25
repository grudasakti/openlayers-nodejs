import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Image from 'ol/layer/Image';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import ImageWMS from 'ol/source/ImageWMS';

import OSM from 'ol/source/OSM';

var format = 'image/png';
var imagery = new XYZ({
  url: "https://geoservices.big.go.id/rbi/rest/services/BASEMAP/Rupabumi_Indonesia/MapServer/tile/{z}/{y}/{x}",
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      //source: new OSM()
      source: imagery,
      visible: true
    })
  ],
  view: new View({
    center: fromLonLat([110.500697, -7.333249]),
    zoom: 12
  })
});

const wms_source = new ImageWMS({
  ratio: 1,
          url: 'http://localhost:8080/geoserver/SALATIGA/wms',
          params: {'FORMAT': format,
                  'VERSION': '1.1.1',  
                "STYLES": '',
                "LAYERS": 'SALATIGA:salatiga',
                "exceptions": 'application/vnd.ogc.se_inimage',
          }
});

const petasl3 = new Image({
  source: wms_source,
  visible: true
});

const wms_jalan = new ImageWMS({
  ratio: 1,
          url: 'http://localhost:8080/geoserver/SALATIGA/wms',
          params: {'FORMAT': format,
                  'VERSION': '1.1.1',  
                "STYLES": '',
                "LAYERS": 'SALATIGA:JALAN_LN_25K',
                "exceptions": 'application/vnd.ogc.se_inimage',
          }
});

const petajalan = new Image({
  source: wms_jalan,
  visible: true
});

map.addLayer(petasl3);
map.addLayer(petajalan);