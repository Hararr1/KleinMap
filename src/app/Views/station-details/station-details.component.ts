import { DataService } from './../../services/data.service';
import { IStation } from './../../models/IStation';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorStateHelper } from 'src/app/helpers/SensorStateHelper';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationDetailsComponent implements OnInit {

  public Station: IStation;
  public SensorStateHelper = SensorStateHelper;
  
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private changeDetector : ChangeDetectorRef) { }

  ngOnInit(): void {
    const provinceId = +this.route.snapshot.params.idState;
    const stationId = +this.route.snapshot.params.id;

    setInterval(() => {
      const province = this.dataService.Provinces.find(prov => prov.id === provinceId);

      if (province) {
        const station = province.stations.find(st => st.id === stationId);

        if (station) {
          if (this.Station === undefined) {
            this.Station = station;
          } else if (station.lastUpdate !== this.Station.lastUpdate) {

            this.Station.addressStreet  = station.addressStreet;
            this.Station.city = station.city;
            this.Station.gegrLat = station.gegrLat;
            this.Station.gegrLon = station.gegrLon;
            this.Station.id = station.id;
            this.Station.isShow = station.isShow;
            this.Station.lastUpdate = station.lastUpdate;
            this.Station.provinceState = station.provinceState;
            this.Station.state = station.state;
            this.Station.stationName = station.stationName;

            station.sensors.forEach(s => {
              const index = this.Station.sensors.findIndex(x => x.id === s.id);
              if (index !== -1) {
                this.Station.sensors[index].currentValue = s.currentValue;
                this.Station.sensors[index].data = s.data;
                this.Station.sensors[index].lastUpdate = s.lastUpdate;
                this.Station.sensors[index].param = s.param;
                this.Station.sensors[index].state = s.state;
                this.Station.sensors[index].type = s.type;
                this.Station.sensors[index].worstValue = s.worstValue;
              } else {
                this.Station.sensors.push(s);
              }
            });
          }
          this.changeDetector.detectChanges();
        }
      }
    }, 200);
  }

  public IsMiddleSensor(index: number) {
    let output = false;

    if (Math.floor(this.Station.sensors.length / 2) === index) {
      output = true;
    }

    return output;
  }

}
