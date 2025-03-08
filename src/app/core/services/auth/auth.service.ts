import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Token } from '../../../shared/interfaces/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any=null;
  private readonly httpClient= inject (HttpClient);
  private readonly router= inject (Router);
  
  sendDataRegsiterForm(data: object): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  sendDataLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }
  saveUserToken(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData= jwtDecode(localStorage.getItem('userToken')!)
    }
  }
  Logout():void
  {
    localStorage.removeItem('userToken');
    this.userData=null;
    this.router.navigate(['/Login']);
  }


  setEmailvarify(data:object):Observable<any>{
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",data)
  }
  setCodevarify(data:object):Observable<any>{
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",data)
  }
  setRestpasswordvarify(data:object):Observable<any>{
    return this.httpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",data)
  }


}


