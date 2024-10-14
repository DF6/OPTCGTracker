import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss']
})
export class DropdownSelectorComponent {
  @Input() config: any = {};
  @Output() selectionChanged = new EventEmitter<any>();
  dropDownList: any[] = [];
  selectedValue: any = null;
  valueField: string = '';
  labelField: string = '';
  placeholder: string = '';
  heading: string = '';

  ngAfterViewInit() {
      this.dropDownList = this.config.dropDownList || [];
      this.selectedValue = this.config.selectedValue ?? -1;
      this.valueField = this.config.valueField || 'value';
      this.labelField = this.config.labelField || 'label';
      this.placeholder = this.config.placeholder || 'placeholder';
      this.heading = this.config.heading;
  }

  onSelectionChange(e: any) {
    this.selectedValue = e.target.value;
    this.selectionChanged.emit(this.selectedValue);
  }
}
