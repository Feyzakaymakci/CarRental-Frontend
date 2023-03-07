import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailsDto } from 'src/app/models/dtos/carDetailsDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  
  cars:CarDetailsDto[]=[];

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
       this.getDetailsDtoByCarId(params["carId"]) 
      }
    })
  }

  getDetailsDtoByCarId(carId:number){
    this.carService.getDetailsByCarId(carId).subscribe(response=>{
      this.cars=response.data})
  }

}