import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params['id']))
  )

  saved: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, event: Event): void {
    if (event.id !== 0) {
      this.eventService.update(event).forEach(event => {
        console.log('Event: updated', event)
        this.showUpdateSuccess(event)
        this.router.navigateByUrl('/')
      })
    }
    else {
      this.eventService.create(event).forEach(event => {
        this.saved = true
        console.log(`Event created with id ${event.id}`)
        this.showCreateSuccess(event)
        //this.router.navigateByUrl('/')
      })
    }
  }

  showUpdateSuccess(event: Event) {
    this.toastr.success(`Event with id ${event.id}`, 'Updating success', { timeOut: 3000 })
  }

  showCreateSuccess(event: Event) {
    this.toastr.success(`Event: ${event.name}`, 'Creating success', { timeOut: 3000 })
  }

}
