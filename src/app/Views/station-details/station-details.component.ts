import { DataService } from './../../services/data.service';
import { IStation } from './../../models/IStation';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorStateHelper } from 'src/app/helpers/SensorStateHelper';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { IData } from 'src/app/models/IParamData';
import * as ChartZoom from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationDetailsComponent implements OnInit {

 public ChartData: ChartDataSets[] = [];
 public ChartLabels: Label[] = [];

  lineChartOptions = {
    maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        mode: 'x',
        intersect: false,
        enabled: true,
      },
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            fontColor: 'white'
          },
          gridLines: {
            color: '#bee4ff',
          },
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'hours',
            unitStepSize: 1,
            displayFormats: {
              'hours': 'HH:mm:SS'
            },
          },
          gridLines: {
            color: '#bee4ff',
          },
          ticks: {
            fontColor: 'white',
          }
        }]
      },
      plugins: {
        zoom: {
          // pan: { // Add only if zoom isn't drag: true
          //   // Boolean to enable panning
          //   enabled: true,

          //   // Panning directions. Remove the appropriate direction to disable
          //   // Eg. 'y' would only allow panning in the y direction
          //   mode: 'x'
          // },
          zoom: {
            enabled: true,
            drag: true,
            mode: 'x'
          },

          drag: {
            borderColor: 'rgba(225,225,225,0.3)',
            borderWidth: 5,
            backgroundColor: 'rgb(225,225,225)',
            animationDuration: 0
          },
    
          // Speed of zoom via mouse wheel
          // (percentage of zoom on a wheel event)
          speed: 0.5,
    
          // Minimal zoom distance required before actually applying zoom
          threshold: 20,
    
          // On category scale, minimal zoom level before actually applying zoom
          sensitivity: 10,
        }
      }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#7cdbff',
    },
    {
      borderColor: '#black',
      backgroundColor: '#fd79b6',
    },
    {
      borderColor: '#black',
      backgroundColor: '#00ffad',
    },
    {
      borderColor: '#black',
      backgroundColor: '#da44ff',
    },
    {
      borderColor: '#black',
      backgroundColor: '#426bff',
    },
    {
      borderColor: '#black',
      backgroundColor: '#1000ff',
    },
    {
      borderColor: '#black',
      backgroundColor: '#ff8100',
    }
  ];

  lineChartLegend = true;
  lineChartType = 'line';
  public lineChartPlugins = [
    ChartZoom
    ];
  
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
            this.UpdateChart();
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


  private UpdateChart() {
    this.ChartData = [];
    this.ChartLabels = [];

    let maxLenght = 0;

    this.Station.sensors.forEach(s => {
      if (maxLenght < s.data.values.length) {
        maxLenght = s.data.values.length;
      }
    });

    this.Station.sensors.forEach(s => {
      this.ChartData.push({data: [...this.PushValueData(s.data.values.reverse())], label:SensorStateHelper.GetNameState(s.type)})
    });
  }

  private PushValueData(data: IData[]) {
    let output = [];
    data.forEach(d => {
      if (d.value) {
        output.push({ "t": d.date.toString(), "y": d.value});
      }
    })

    return output;
  }

}
