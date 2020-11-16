import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result',
    templateUrl: 'result.component.html',
    styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

    imagePath = '../../../assets/images/king_shan.jpg';
    finalResponse: any = {};

    constructor(private common: CommonService, private router: Router) { }

    ngOnInit() {
        this.finalResponse = this.common.getResult();  //Fetch the final result from the service.
    }
/**
 * @description To reset the selected planets and vehicles and navigate back to home page.
 */
    reset() {
        this.common.reset();
        this.router.navigate(['']);
    }
}
