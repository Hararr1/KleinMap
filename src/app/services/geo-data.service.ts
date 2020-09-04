import { Injectable } from '@angular/core';
import FeatureCollectionJSON from 'src/assets/data/coordinates.json';
import { FeatureCollection, Feature } from 'geojson';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  public FeatureCollection: FeatureCollection = FeatureCollectionJSON as FeatureCollection;
  public SelectedState: Feature;

  constructor(private router: Router) { }

  public SelectState(id: number) {
    this.SelectedState = this.FeatureCollection.features.find(state => state.id == id);
    this.router.navigate([`/state/${this.SelectedState.id}`]);
  }
}
