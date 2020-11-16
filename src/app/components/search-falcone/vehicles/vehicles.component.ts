import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { PlanetModel } from '../../../models/planet.model';
import { VehicleModel } from '../../../models/vehicle.model';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnChanges {

    @Input() public selectedPlanet: PlanetModel;
    vehicleList: VehicleModel[];
    selectedVehicle: string = '';
    timeTaken: number = 0;
    imagePath: string = environment.imagePath;

    constructor(private common: CommonService, private cdr: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.getVehicleList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        setTimeout(() => {
            this.resetSelectedVehicle();
        }, 100);

    }

/**
 * @description Fetching the vehicle list.
 */
    getVehicleList(): void {
        this.common.vehicleServiceSubject.subscribe(() => {
            this.vehicleList = this.common.getVehicleList();
        }, error => {
        });
    }

/**
 * @description Update selected vehicles based on condition provided.
 * @param event Selected planet
 */
    updateSelectedVehicle(event: any): void {

        if (this.selectedPlanet.name) {

            if (this.selectedVehicle) {
                this.common.setSelectedVehicles(this.selectedVehicle, 'delete');

                this.common.setSelectedVehicles(event.target.value, 'add');
                this.selectedVehicle = event.target.value;
            }
            else {
                this.common.setSelectedVehicles(event.target.value, 'add');
                this.selectedVehicle = event.target.value;
            }

            this.updateTimeTaken();
        }
    }

/**
 * @description Reset the selected vehicle list.
 */
    resetSelectedVehicle(): void {
        if (this.selectedVehicle) {
            this.common.setSelectedVehicles(this.selectedVehicle, 'delete');
        }

        this.selectedVehicle = '';

        this.removeTimeTaken();
    }

/**
 * @description Calculate the time taken for each vehicle to reach the planet.
 */
    updateTimeTaken(): void {

        let sVehicle = this.vehicleList.find(element => element.name === this.selectedVehicle);
        if (sVehicle && sVehicle.name) {
            let timeTaken = this.selectedPlanet.distance / sVehicle.speed;

            if (this.timeTaken > 0) {
                this.common.setTimeTaken(this.timeTaken, 'delete');     // delete time take from the array in service
                this.timeTaken = timeTaken;     // add time taken for this planet
                this.common.setTimeTaken(this.timeTaken, 'add');
            }
            else {
                this.timeTaken = timeTaken;     // add time taken for this planet
                this.common.setTimeTaken(timeTaken, 'add');
            }
        }
    }

    /**
     * @description Remove the added time from the time array.
     */
    removeTimeTaken(): void {
        if (this.timeTaken > 0) {
            this.common.setTimeTaken(this.timeTaken, 'delete');
        }
    }
}
