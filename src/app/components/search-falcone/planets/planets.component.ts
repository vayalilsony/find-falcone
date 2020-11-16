import { Component, OnInit } from '@angular/core';
import { PlanetModel } from '../../../models/planet.model';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-planets',
    templateUrl: './planets.component.html',
    styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

    selectedPlanet: PlanetModel;
    planetList: PlanetModel[];
    imagePath: string = environment.imagePath;

    constructor(private common: CommonService) {
        this.resetSelectedPlanet();
    }

    ngOnInit() {
        this.getPlanetList();
    }
/**
 * @description Fetching the planet list.
 */
    getPlanetList(): void {
        this.common.planetServiceSubject.subscribe(() => {
            this.planetList = this.common.getPlanetList();
            if (this.selectedPlanet.name) {
                this.planetList = [this.selectedPlanet, ...this.planetList];
            }
        });
    }

/**
 * @description Update selected planets based on condition provided.
 * @param event Selected planet
 */
    updateSelectedPlanet(event: any): void {

        if (event.target.value.length > 0) {

            if (this.selectedPlanet.name) {
                this.common.setSelectedPlanets(this.selectedPlanet.name, 'delete');
            }

            this.selectedPlanet = this.planetList.find(element => element.name === event.target.value);
            this.common.setSelectedPlanets(this.selectedPlanet.name, 'add');
        }
        else {
            this.common.setSelectedPlanets(this.selectedPlanet.name, 'delete');
            this.resetSelectedPlanet();
        }
    }
/**
 * @description Reset the selected planet list.
 */
    resetSelectedPlanet(): void {
        this.selectedPlanet = { name: '', distance: 0 };
    }

}
