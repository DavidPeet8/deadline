import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.sass']
})
export class AddItemModalComponent implements OnInit {
	@ViewChild('modal') modal;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  closeModal() 
  {
  	console.log("Modal Closed");
  	this.router.navigate(['']); // Navigate back
  }

  stopPropagation(event) 
  {
  	// Prevent parent element from being clicked
  	event.stopPropagation();
  }

}
