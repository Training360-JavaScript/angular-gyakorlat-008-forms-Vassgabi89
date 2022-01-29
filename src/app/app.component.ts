import { Component, OnInit } from '@angular/core';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ang-basic-practice006-routing';

  constructor(
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    }
}
