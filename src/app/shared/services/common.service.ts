import { Injectable } from '@angular/core';
import { UrlConstants } from '../constants/urls';
import { PlanetModel } from '../../models/planet.model';
import { VehicleModel } from '../../models/vehicle.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  selectedPlanets: string[] = [];
  selectedVehicles: string[] = [];

  planetList: PlanetModel[];
  vehicleList: VehicleModel[];

  planetServiceSubject: Subject<any>;
  selectedPlanetChanged: Observable<any>;

  vehicleServiceSubject: Subject<any>;
  selectedVehicleChanged: Observable<any>;

  timeTaken: number[] = [];
  timeTakenServiceSubject: Subject<any>;
  timeTakenChanged: Observable<any>;

  result: any = {};

  constructor(private http: HttpClient,
              private readonly api: ApiService,
              private router: Router) {
    this.planetServiceSubject = new Subject<any>();
    this.selectedPlanetChanged = this.planetServiceSubject.asObservable();

    this.vehicleServiceSubject = new Subject<any>();
    this.selectedVehicleChanged = this.vehicleServiceSubject.asObservable();

    this.timeTakenServiceSubject = new Subject<any>();
    this.timeTakenChanged = this.timeTakenServiceSubject.asObservable();

    this.planetList = [];
    this.vehicleList = [];
  }

  /**
   * @description Invoke planet details API
   */
  callPlanetDataAPI(): void {
    const apiUrl = UrlConstants.urls.planetUrl;
    this.api.ExecuteGet(apiUrl, (response) => {
      this.setPlanetList(response);
    }, error => {
      this.setPlanetList(null);
    });
  }

  /**
   * @description Save the API data to the planet list and the local storage.
   * @param responseData Planet API response.
   */
  setPlanetList(responseData: PlanetModel[]) {
    this.planetList = responseData;
    localStorage.setItem('planetList', JSON.stringify(responseData));
    this.planetServiceSubject.next();
  }

  /**
   * @description Fetch the selected planet list.
   */
  getPlanetList() {
    let self = this;
    return this.planetList.filter((item) => {
      return self.selectedPlanets.indexOf(item.name) === -1;
    });
  }

  /**
   * @description Invoke vehicle details API
   */
  callVehicleDataAPI(): void {
    const apiUrl = UrlConstants.urls.vehicleUrl;
    this.api.ExecuteGet(apiUrl, (response) => {
      this.setVehicleList(response);
    }, error => {
      this.setVehicleList(null);
    });
  }

  /**
   * @description Save the API data to the vehicle list and the local storage.
   * @param responseData Vehicle API response.
   */
  setVehicleList(responseData: VehicleModel[]) {
    this.vehicleList = responseData;
    localStorage.setItem('vehicleList', JSON.stringify(responseData));
    this.vehicleServiceSubject.next();
  }

  /**
   * @description Fetch the selected vehicle list.
   */
  getVehicleList() {
    let remainingVList: VehicleModel[] = JSON.parse(localStorage.getItem('vehicleList'));

    for (let i = 0; i < this.selectedVehicles.length; i++) {
      let index = remainingVList.findIndex(element => element.name === this.selectedVehicles[i]);

      remainingVList[index].total_no = remainingVList[index].total_no - 1;
    }
    return remainingVList;
  }

  /**
   * @description Update the selected planet list based on action.
   * @param item Selected planet
   */
  setSelectedPlanets(item: string, action: string) {
    if (action === 'add') {
      if (item && this.selectedPlanets.indexOf(item) === -1) {
        this.selectedPlanets.push(item);
      }
    }
    else if (action === 'delete') {
      let index = this.selectedPlanets.findIndex(x => x === item);
      if (index > -1) {
        this.selectedPlanets.splice(index, 1);
      }
    }
    this.planetServiceSubject.next();
    this.vehicleServiceSubject.next();
  }

  /**
   * @description Update the selected vehicle list based on action.
   * @param item Selected vehicle
   */
  setSelectedVehicles(item: string, action: string) {
    if (action === 'add') {
      this.selectedVehicles.push(item);
    }
    else if (action === 'delete') {
      let index = this.selectedVehicles.findIndex(x => x === item);
      if (index > -1) {
        this.selectedVehicles.splice(index, 1);
      }
    }
    this.vehicleServiceSubject.next();
  }

  /**
   * @description Update the total time taken.
   * @param time Time taken by the vehicle to reach the selected planet.
   */
  setTimeTaken(time: number, action: string) {
    if (action === 'add') {
      this.timeTaken.push(time);
    }
    else if (action === 'delete') {
      let index = this.timeTaken.findIndex(x => x === time);
      if (index > -1) {
        this.timeTaken.splice(index, 1);
      }
    }

    this.timeTakenServiceSubject.next();
  }

  /**
   * @description Return the total time taken for all the vehicles to reach the corresponding planet.
   */
  getTimeTaken() {
    return {
      totalTime: this.timeTaken.length > 0 ? this.timeTaken.reduce((a, b) => a + b) : 0,
      length: this.timeTaken.length
    };
  }

  /**
   * @description Fetching the token
   */
  findFalcone() {
    const apiUrl = UrlConstants.urls.tokenUrl;
    this.api.ExecutePost(apiUrl, null, (response) => {
      this.find(response);
    }, error => {
      return null;
    });
  }

  /**
   * @description Searching for the falcone with the token, selected vehicles and the selected planets.
   */
  find(token: any) {
    let body = {
      token: token.token,
      planet_names: this.selectedPlanets,
      vehicle_names: this.selectedVehicles
    };

    const apiUrl = UrlConstants.urls.falconeUrl;
    this.api.ExecutePost(apiUrl, body, (response) => {
      this.setResult(response);
      this.router.navigate(['result']);

    }, error => {
      return null;
    });

  }

  /**
   * @description Reset the selected datas.
   */
  reset() {
    this.selectedPlanets = [];
    this.selectedVehicles = [];
    this.timeTaken = [];
    this.result = {};

    this.planetServiceSubject.next();
    this.vehicleServiceSubject.next();
    this.timeTakenServiceSubject.next();

    return 'done';
  }

  /**
   * @description Save the final result.
   * @param res Response of the find falcone API.
   */
  setResult(res: any) {
    this.result = res;
    this.result['timeTaken'] = this.timeTaken.reduce((a, b) => a + b);
  }

  /**
   * @description Fetch the final result.
   */
  getResult() {
    return this.result;
  }

}
