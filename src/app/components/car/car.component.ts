import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { CarDetailsDto } from 'src/app/models/dtos/carDetailsDto';
import { CarImage } from 'src/app/models/entities/carImage';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { Car } from 'src/app/models/entities/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetailsDto[] = [];
  carImages: CarImage[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
 
  imageUrl = 'https://localhost:44322/Uploads/Images/';
  imageOfPath: string;

  filterText = '';
  cardetailFilter = '';
  brandFilter: number = 0;
  colorFilter: number = 0;
  branddFilter: number = 0;
  colorrFilter: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe((params) => {
      const { colorId, brandId } = params;

      if (+colorId > 0 && +brandId > 0) {
        this.getDetailsByBrandIdAndColorId(+colorId, +brandId);
      } else if (+brandId > 0) {
        this.getDetailsByBrandId(+brandId);
      } else if (+colorId > 0) {
        this.getDetailsByColorId(+colorId);
      } else {
        this.getDetails();
      }
    });
  }


  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }


  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  

  getByBrandId(brandId: number) {
    this.carService.getByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }


  getByColorId(colorId: number) {
    this.carService.getByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }


  getDetails(): void {
    this.carService.getDetails().subscribe((response) => {
      this.cars = response.data});
  }


  getDetailsByBrandId(brandId: number): void {
    if (!brandId || brandId < 1) {
      return;
    }
    this.carService.getDetailsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data});
  }


  getDetailsByColorId(colorId: number): void {
    if (!colorId || colorId < 1) {
      //Error message
      return;
    }
    this.carService
      .getDetailsByColorId(colorId).subscribe((response) => {
      this.cars = response.data});
  }


  getDetailsByBrandIdAndColorId(colorId: number, brandId: number) {
    this.carService
      .getDetailsByBrandIdAndColorId(colorId, brandId).subscribe((response) => {
        console.log(response);
        this.cars = response.data;});
  }


  getSelectedBrand(brandId: number) {
    debugger;
    if (this.brandFilter == brandId) return true;
    else return false;
  }


  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) return true;
    else return false;
  }


  image(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      const imagePath = response.data[0].imagePath;
      this.imageOfPath = this.imageUrl + imagePath;
      console.log(this.imageOfPath);
    });
    return this.imageOfPath;
  }
}
