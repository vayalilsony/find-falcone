import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-search-falcone',
  templateUrl: './search-falcone.component.html',
  styleUrls: ['./search-falcone.component.scss']
})
export class SearchFalconeComponent implements OnInit {

  totalTimeTaken: number = 0;
  sendRequest: boolean = false;

  constructor(private readonly common: CommonService) {
    this.getTimeTaken();
  }

  ngOnInit() {
    this.common.callPlanetDataAPI();
    this.common.callVehicleDataAPI();
    this.common.reset();
  }

  /**
   * @description Fetching the total time taken for all the vehicles to reach the corresponding planet.
   */
  getTimeTaken(): void {

    this.common.timeTakenServiceSubject.subscribe((tt) => {

      if (this.common.getTimeTaken().length === 4) {
        this.sendRequest = true;
      }
      else {
        this.sendRequest = false;
      }
      this.totalTimeTaken = this.common.getTimeTaken().totalTime;
    });
  }

  /**
   * @description Initialising find falcone process
   */
  findFalcone() {
    this.common.findFalcone();
  }

}
