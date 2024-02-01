import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent implements OnInit, AfterViewInit {
    @Input() card: any;
    @Output() stockEv = new EventEmitter();
    @Output() priceEv = new EventEmitter();
    @Output() collectionEv = new EventEmitter();
    @ViewChild('stockInput') stockInput!: ElementRef;
    @ViewChild('priceInput') priceInput!: ElementRef;
    @ViewChild('collectionInput') collectionInput!: ElementRef;

    ngOnInit() {
    }

    ngAfterViewInit() {
      this.stockInput.nativeElement.value = this.card.stock;
      this.priceInput.nativeElement.value = this.card.price;
      this.collectionInput.nativeElement.checked = this.card.collection;
    }

    changeStock() {
      this.card.stock = this.stockInput.nativeElement.value;
      this.stockEv.emit();
    }

    changePrice() {
      this.card.price = this.priceInput.nativeElement.value;
      this.priceEv.emit();
    }

    changeCollection() {
      this.card.collection = this.collectionInput.nativeElement.checked;
      this.collectionEv.emit();
    }
}
