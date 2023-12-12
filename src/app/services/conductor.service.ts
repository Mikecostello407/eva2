import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  //Charmeleon llora por las noches porque no puede manejar y no genera ingresos para sus hijos charmanders.

  private apiUrl= 'https://dummyjson.com/users';

  constructor(
    private http:HttpClient
    ) { }
   
  getConductorLista(limit:number):Observable<any>{
    const url= `${this.apiUrl}?limit=${limit}`;
    return this.http.get(url);
    
  }
  getConductor(conductorId:string):Observable<any>{
    const url= `${this.apiUrl}/${conductorId}`;
    return this.http.get(url);
  }
}
