import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.css']
})
export class LogoutPopupComponent implements OnInit {

  cancelMessage = "dashboard";
  constructor(private router: Router, private authService: AuthService) { }
  @Output() event = new EventEmitter<string>()
  
  logout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
  cancel() {
   this.event.emit(this.cancelMessage);
  }

  ngOnInit(): void {
   
  }  
}
