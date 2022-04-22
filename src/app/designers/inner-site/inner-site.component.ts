import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { DesignerItems } from '@core/model/designerItemsRegistration';
import { Designer } from '@core/model/designerRegistration';
import { empty, Subscription } from 'rxjs';

@Component({
  selector: 'app-inner-site',
  templateUrl: './inner-site.component.html',
  styleUrls: ['./inner-site.component.css']
})
export class InnerSiteComponent implements OnInit {

  designer: any;
  designerSubscription: Subscription | any;
  idOfSelectedDesigner: any;
  selectedEmail: any;
  loadedItems: File | any;
  relItems: DesignerItems[] = [];



  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idOfSelectedDesigner = this.activatedRoute.snapshot.paramMap.get("id");
    this.selectedEmail = this.activatedRoute.snapshot.paramMap.get("email");
    console.log(this.selectedEmail);

    this.authService.getDesigners();
    this.designerSubscription = this.authService.getDesignersStream().subscribe((designers: Designer[]) => {
      
      for (const designer of designers) {
        if(this.selectedEmail==designer.designerRegShopEmail){
          this.designer = designer;
        }
      }
    });
    this.loadingRelShopItemsDesigner();
    
  }

  onDestroy(): void {
    this.designerSubscription.unsubscribe();
     this.loadedItems.unsubscribe();
  }

  loadingRelShopItemsDesigner(){
    this.authService.loadingRelShopItemsDesigner(this.idOfSelectedDesigner, this.selectedEmail).subscribe(items => {
      this.loadedItems = items;
      for (let index = 0; index < this.loadedItems.length; index++) {
        if(this.idOfSelectedDesigner==this.loadedItems[index].designerSystemId){
          this.relItems.push(this.loadedItems[index]);
        }
      }
      console.log(this.relItems);
    });
   
  };
}
