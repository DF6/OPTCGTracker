import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent implements OnInit, AfterViewInit {
    dropdownConfig: any;
    @Input() card: any;
    @Input() mode: any;
    @Input() leaders: any[] = [];
    @Output() stockEv = new EventEmitter();
    @Output() priceEv = new EventEmitter();
    @Output() collectionEv = new EventEmitter();
    @Output() selectionEv = new EventEmitter();
    @Output() copiesEv = new EventEmitter();
    @Output() deckCopiesEv = new EventEmitter<string>();
    @ViewChild('stockInput') stockInput!: ElementRef;
    @ViewChild('priceInput') priceInput!: ElementRef;
    @ViewChild('collectionInput') collectionInput!: ElementRef;
    @ViewChild('selectionInput') selectionInput!: ElementRef;
    @ViewChild('copiesOneInput') copiesOneInput!: ElementRef;
    @ViewChild('copiesTwoInput') copiesTwoInput!: ElementRef;
    objectKeys = Object.keys;
    el = ElementRef;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
      this.dropdownConfig = {
        selectedValue: -1,
        valueField: 'code',
        labelField: 'name',
        dropDownList: this.leaders
      };
    }

    ngAfterViewInit() {
      if (this.mode === 'collection') {
        this.stockInput.nativeElement.value = this.card.stock;
        this.priceInput.nativeElement.value = this.card.price;
        this.collectionInput.nativeElement.checked = this.card.collection;
      } else if (this.mode === 'selection') {
        this.copiesOneInput.nativeElement.value = this.card.deckOneCopies;
        this.copiesTwoInput.nativeElement.value = this.card.deckTwoCopies;
      }
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

    changeSelection(leader: string) {
      if (leader === this.card.deckLeaderOne) {
        this.card.deckOneCopies = this.copiesOneInput.nativeElement.value;
      }
      if (leader === this.card.deckLeaderTwo) {
        this.card.deckTwoCopies = this.copiesTwoInput.nativeElement.value;
      }
      this.deckCopiesEv.emit();
    }

    changeSelectionMode() {
      switch (this.mode) {
        case 'collection': this.mode = 'selection';
        if (this.copiesOneInput){ this.copiesOneInput.nativeElement.value = this.card.deckOneCopies }
        if (this.copiesTwoInput){ this.copiesTwoInput.nativeElement.value = this.card.deckTwoCopies }
          break;
        case 'selection': this.mode = 'collection';
          this.stockInput.nativeElement.value = this.card.stock;
          this.priceInput.nativeElement.value = this.card.price;
          this.collectionInput.nativeElement.checked = this.card.collection;
          break;
        default:
          break;
      }
    }

    updateUid(code: any) {
      if (this.card.deckLeaderOne === '') {
        this.card.deckLeaderOne = code;
        this.card.deckOneCopies = 0;
        this.cdr.detectChanges();
        this.copiesOneInput.nativeElement.value = this.card.deckOneCopies;
      } else if (this.card.deckLeaderTwo === '') {
        this.card.deckLeaderTwo = code;
        this.card.deckTwoCopies = 0;
        this.cdr.detectChanges();
        this.copiesTwoInput.nativeElement.value = this.card.deckTwoCopies;
      }
    }
}
