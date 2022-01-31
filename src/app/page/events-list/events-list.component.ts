import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList$: Observable<Event[]> = this.eventService.getAll();

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onDelete(event: Event): void {
    let tmp = event
    this.eventService.remove(event).forEach(event => {
      console.log('Event deleted:', tmp)
      this.showDeleteSuccess(tmp)
    })
  }

  showDeleteSuccess(event: Event) {
    let name = event.name
    this.toastr.success(name, 'Removing success', {timeOut: 3000})
    this.eventList$ = this.eventService.getAll()
  }

}
