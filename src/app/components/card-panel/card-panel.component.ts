import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent implements OnInit, AfterViewInit {
    @Input() card: any;
    @Input() mode: any;
    @Input() deckData: any;
    @Output() stockEv = new EventEmitter();
    @Output() priceEv = new EventEmitter();
    @Output() collectionEv = new EventEmitter();
    @Output() selectionEv = new EventEmitter();
    @Output() copiesEv = new EventEmitter();
    @Output() chosenDeckEv = new EventEmitter<string>();
    @ViewChild('stockInput') stockInput!: ElementRef;
    @ViewChild('priceInput') priceInput!: ElementRef;
    @ViewChild('collectionInput') collectionInput!: ElementRef;
    @ViewChild('selectionInput') selectionInput!: ElementRef;
    @ViewChild('copiesInput') copiesInput!: ElementRef;
    leaders: string[] = [];
    objectKeys = Object.keys;
    el = ElementRef;

    ngOnInit() {
    }

    ngAfterViewInit() {
      if (this.mode === 'collection') {
        this.stockInput.nativeElement.value = this.card.stock;
        this.priceInput.nativeElement.value = this.card.price;
        this.collectionInput.nativeElement.checked = this.card.collection;
      } else if (this.mode === 'selection') {
        Object.keys(this.deckData).forEach((leader) => {
          this.leaders.push(leader);
        });
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

    changeSelection(leader: string, card: string) {
      this.selectionEv.emit({leader, card});
    }

    changeSelectionMode(rarity: string) {
      if (rarity === 'L') {
        return;
      }
      switch (this.mode) {
        case 'collection': this.mode = 'selection';
          break;
        case 'selection': this.mode = 'collection';
          break;
        default:
          break;
      }
    }

    changeCopies(leader: string, card: string) {
      this.copiesEv.emit({leader, card, copies: this.copiesInput.nativeElement.value});
    }

    chooseDeck(card: any) {
      this.chosenDeckEv.emit(card);
    }
}
