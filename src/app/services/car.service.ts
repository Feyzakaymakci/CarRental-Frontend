import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/entities/car';
import { CarDetailsDto } from '../models/dtos/carDetailsDto';
import { ListResponseModel } from '../models/responseModel/listResponseModel';
import { ResponseModel } from '../models/responseModel/responseModel';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44322/api/';
  constructor(private httpClient: HttpClient) {}

  carAdd(car: Car):
   Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiUrl}Cars/add`, car);}

  getCars(): 
  Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/getall`);}

  getByCarId(carId: number): 
  Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(
      `${this.apiUrl}Cars/getbycarid?carId=${carId}`);}

  getByBrandId(brandId: number): 
  Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/getbybrandid?brandId=${brandId}`);}

  getByColorId(colorId: number): 
  Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/getbycolorid?colorId=${colorId}`);}

  getDetails(): 
  Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/getdetails`);}

  getDetailsByCarId(carId: number): 
  Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/getdetailsbycarid?carId=${carId}`);}

  getDetailsByColorId(colorId: number): 
  Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/details-by-car-id?colorId=${colorId}`);}
      
   getDetailsByBrandId(brandId: number): 
    Observable<ListResponseModel<CarDetailsDto>> {
     return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
      `${this.apiUrl}Cars/getdetailsbybrandid?brandId=${brandId}`);}
    

  getDetailsByBrandIdAndColorId(brandId:number, colorId:number):
  Observable<ListResponseModel<CarDetailsDto>>{
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(
    `${this.apiUrl}Cars/getdetailsbybrandidandcolorid?brandId=${brandId}&colorId=${colorId}`);}
   

  }
  
