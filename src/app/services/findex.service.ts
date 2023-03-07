import { HttpClient } from '@angular/common/http';
import { Injectable ,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Findex } from '../models/entities/findex';
import { SingleResponseModel } from '../models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl = "https://localhost:44322/api/";

  constructor(private httpClient:HttpClient) {}
  
  // getByCustomerId(): Observable<SingleResponseModel<Findex>> {
  //   return this.httpClient.get<SingleResponseModel<Findex>>(this.apiUrl+"Customers/getbyid",
  //     {
  //       params: {
  //         customerId: customerUserId.toString(),
  //       },
  //     }
  //   );
  // }
}
