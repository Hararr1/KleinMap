import { Component, OnInit } from '@angular/core';
import { ArrayHelper } from 'src/app/helpers/ArrayHelper';
import { IProvince } from 'src/app/models/IProvince';
import { IStation } from 'src/app/models/IStation';
import { ISubscriber } from 'src/app/models/ISubscriber';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  public SelectedProvinces: Array<IProvince> = [];
  public StationsInProvinces: Array<IStation> = [];
  public SelectedStations: Array<IStation> = [];
  public ArrayHelper = ArrayHelper;
  public UserEmail: string;
  public IsSended: boolean;

  constructor(public DataService: DataService, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  public SelectProvince(province: IProvince) {
    const isAdded = this.SelectedProvinces.includes(province);

    if (isAdded) {
      const index = this.SelectedProvinces.findIndex(d => d.id === province.id);
      this.SelectedProvinces.splice(index, 1);
      this.StationsInProvinces = this.StationsInProvinces.filter(s =>
        s.city.commune.provinceName.toLocaleUpperCase() !== province.provinceName.toLocaleUpperCase()
      );
      this.SelectedStations = this.SelectedStations.filter(s =>
         s.city.commune.provinceName.toLocaleUpperCase() !== province.provinceName.toLocaleUpperCase()
      );
    } else {
      this.SelectedProvinces.push(province);
      const stations = this.DataService.Provinces.find(p => p.id === province.id).stations;
      this.StationsInProvinces.push(...stations);
    }
  }

  public SelectStation(station: IStation) {
    const isAdded = this.SelectedStations.includes(station);

    if (isAdded) {
      const index = this.SelectedStations.findIndex(s => s.id === station.id);
      this.SelectedStations.splice(index, 1);
    } else {
      this.SelectedStations.push(station);
    }
  }

  public SendVerifyMessage() {
    this.SelectedStations.forEach(s => {
      const newSub = new Object() as ISubscriber;
      newSub.mailAddress = this.UserEmail;
      newSub.stationId = s.id;

      this.httpService.AddNewSubscriber(newSub).subscribe();
    });

    this.IsSended = true;
  }

}
