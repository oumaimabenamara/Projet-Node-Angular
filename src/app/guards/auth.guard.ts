import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token !== null) {
      if (this.isExpiredToken(token)) {
        this.router.navigateByUrl('/login')
        return false;
      } else {
        return true;
      }
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  isExpiredToken(token: string): boolean {
    const decoded: any = jwt_decode(token);
    // console.log(decoded);
    const currentDate = new Date();
    const tokenDate = new Date().setUTCSeconds(decoded.exp);
    return (tokenDate.valueOf() < currentDate.valueOf());
  }

}
