import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './pages/common/loading/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sspfrontend';
  loaderVisible: any
  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef  ){
    this.loaderVisible = this.loaderService.loaderVisible$;
  }
  
  ngOnInit(): void {
   
    this.cdr.detectChanges();
    
  }
  
}
