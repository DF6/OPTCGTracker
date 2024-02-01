import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent {
    @Input() text:string = '';
}
