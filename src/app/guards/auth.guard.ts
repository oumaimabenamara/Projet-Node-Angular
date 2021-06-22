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
        localStorage.removeItem('token')
        this.router.navigateByUrl('/home')
        return false;
      } else {
        return true;
      }
    }
    else {
      this.router.navigateByUrl('/home');
      return false;
    }

  }
  isExpiredToken(token: string): boolean {
    const decoded: any = jwt_decode(token);
    // console.log(decoded);
    return (Math.floor((new Date).getTime() / 1000)) >= decoded.exp;
  }

}
