import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imagePath = '../../../assets/images/king_shan.jpg';
  resourcePath = '../../../assets/images/available-resources.png';
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

}
