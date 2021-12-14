import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';

//comment utiliser
//<app-map [address]="'addresse'"></app-map>

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() address!: string;

  private getCoordinates(address: string) {
    const Http = new XMLHttpRequest();
    const url = `http://api.positionstack.com/v1/forward?access_key=c9f2d2aaa769991d9e4d60e371687223&query=${address}`;

    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(Http.response);
        initMap(obj.data[0].latitude, obj.data[0].longitude);
      }
    };
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.getCoordinates(this.address);
  }
}

function initMap(lat: number, lgt: number): void {
  let map = L.map('map', {
    center: [lat, lgt],
    zoom: 15,
  });

  const tiles = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );

  tiles.addTo(map);
  map.locate();
}
