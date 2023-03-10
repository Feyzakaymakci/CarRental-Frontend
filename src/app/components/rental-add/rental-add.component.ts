import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailsDto } from 'src/app/models/dtos/carDetailsDto';
import { Customer } from 'src/app/models/entities/customer';
import { Rental } from 'src/app/models/entities/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})

export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  carDetail: CarDetailsDto[];
  minDate = new Date();
  modelOfRental:Rental;




  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,

    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService:PaymentService,
    private router:Router
  ) {}


  ngOnInit(): void {
    this.createRentalAddForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
      }
    });
  }


  getCarDetailByCarId(carId: number) {
    this.carService.getDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }


  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      //carId: ['', Validators.required],
      //customerId: ['', Validators.required],

      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  isCarAvaible() {
    if (this.rentalAddForm.valid) {
      this.rentalService
        .isCarAvaible(this.carDetail[0].carId)
        .subscribe((response) => {
          this.toastrService.success(response.message, 'Successful');
          this.sendData();
          this.router.navigate(["/cars/payment",this.carDetail[0].carId])

        },
        (responseError)=>{
          this.toastrService.error(responseError.error)
        }
        );
    } 
  }

  sendData(){
    this.modelOfRental=Object.assign({},this.rentalAddForm.value);// buradan ald??????m veriyi ba??ka componentlarda da kullanmak i??in bu servisi yazd??k
    //console.log(this.modelOfRental)
    this.paymentService.updateData(this.modelOfRental)
  }
   
}