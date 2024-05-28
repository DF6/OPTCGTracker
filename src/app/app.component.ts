import { Component, OnInit } from '@angular/core';
import * as cardData from '../assets/cardData.json';
import * as deckData from '../assets/deckData.json';

const existingTabs: any[] = [
  {
    tabName: 'Expansiones',
    show: false,
    content: `<div *ngIf="showFilterButtons" class="card-container button-size">
      <filter-button text="OP-01" (click)="toggleFilter('OP01', $event)"></filter-button>
      <filter-button text="OP-02" (click)="toggleFilter('OP02', $event)"></filter-button>
      <filter-button text="OP-03" (click)="toggleFilter('OP03', $event)"></filter-button>
      <filter-button text="OP-04" (click)="toggleFilter('OP04', $event)"></filter-button>
      <filter-button text="OP-05" (click)="toggleFilter('OP05', $event)"></filter-button>
      <filter-button text="OP-06" (click)="toggleFilter('OP06', $event)"></filter-button>
      <filter-button text="EB-01" (click)="toggleFilter('EB01', $event)"></filter-button>
    </div>`
  },
  {
    tabName: 'Starter Decks',
    show: false,
    content: `<div *ngIf="showFilterButtons" class="card-container button-size">
      <filter-button text="ST-01" (click)="toggleFilter('ST01', $event)"></filter-button>
      <filter-button text="ST-02" (click)="toggleFilter('ST02', $event)"></filter-button>
      <filter-button text="ST-03" (click)="toggleFilter('ST03', $event)"></filter-button>
      <filter-button text="ST-04" (click)="toggleFilter('ST04', $event)"></filter-button>
      <filter-button text="ST-05" (click)="toggleFilter('ST05', $event)"></filter-button>
      <filter-button text="ST-06" (click)="toggleFilter('ST06', $event)"></filter-button>
      <filter-button text="ST-07" (click)="toggleFilter('ST07', $event)"></filter-button>
      <filter-button text="ST-08" (click)="toggleFilter('ST08', $event)"></filter-button>
      <filter-button text="ST-09" (click)="toggleFilter('ST09', $event)"></filter-button>
      <filter-button text="ST-10" (click)="toggleFilter('ST10', $event)"></filter-button>
      <filter-button text="ST-11" (click)="toggleFilter('ST11', $event)"></filter-button>
      <filter-button text="ST-12" (click)="toggleFilter('ST12', $event)"></filter-button>
      <filter-button text="ST-13" (click)="toggleFilter('ST13', $event)"></filter-button>
    </div>`
  },
  {
    tabName: 'Colores',
    show: false,
    content: `<div *ngIf="showFilterButtons" class="card-container button-size">
      <filter-button text="Rojo" (click)="toggleFilter('red', $event)"></filter-button>
      <filter-button text="Verde" (click)="toggleFilter('green', $event)"></filter-button>
      <filter-button text="Azul" (click)="toggleFilter('blue', $event)"></filter-button>
      <filter-button text="Morado" (click)="toggleFilter('purple', $event)"></filter-button>
      <filter-button text="Negro" (click)="toggleFilter('black', $event)"></filter-button>
      <filter-button text="Amarillo" (click)="toggleFilter('yellow', $event)"></filter-button>
    </div>`
  },
  {
    tabName: 'Rarezas',
    show: false,
    content: `<div *ngIf="showFilterButtons" class="card-container button-size">
      <filter-button text="C" (click)="toggleFilter('C', $event)"></filter-button>
      <filter-button text="UC" (click)="toggleFilter('UC', $event)"></filter-button>
      <filter-button text="R" (click)="toggleFilter('R', $event)"></filter-button>
      <filter-button text="SR" (click)="toggleFilter('SR', $event)"></filter-button>
      <filter-button text="SEC" (click)="toggleFilter('SEC', $event)"></filter-button>
      <filter-button text="L" (click)="toggleFilter('L', $event)"></filter-button>
      <filter-button text="DON" (click)="toggleFilter('DON', $event)"></filter-button>
      <filter-button text="Promo" (click)="toggleFilter('P', $event)"></filter-button>
    </div>`
  },
  {
    tabName: 'Altered',
    show: false,
    content: `<div *ngIf="showFilterButtons" class="card-container button-size">
      <filter-button text="AA" (click)="toggleFilter('alternative', $event)"></filter-button>
      <filter-button text="No AA" (click)="toggleFilter('noAA', $event)"></filter-button>
      <filter-button text="Judge" (click)="toggleFilter('judge', $event)"></filter-button>
      <filter-button text="Boxtopper" (click)="toggleFilter('boxtopper', $event)"></filter-button>
      <filter-button text="Pre-release" (click)="toggleFilter('prerelease', $event)"></filter-button>
      <filter-button text="Championship" (click)="toggleFilter('championship', $event)"></filter-button>
      <filter-button text="STP" (click)="toggleFilter('stp', $event)"></filter-button>
      <filter-button text="Regionals" (click)="toggleFilter('regional', $event)"></filter-button>
      <filter-button text="Store" (click)="toggleFilter('store', $event)"></filter-button>
    </div>`
  },
  {
    tabName: 'Especiales',
    show: false,
    content: `<div *ngIf="showFilterButtons" class="card-container button-size">
      <filter-button text="Manga" (click)="toggleFilter('manga', $event)"></filter-button>
      <filter-button text="Numerada" (click)="toggleFilter('limited', $event)"></filter-button>
      <filter-button text="Wanted" (click)="toggleFilter('wanted', $event)"></filter-button>
      <filter-button text="01 Reprint" (click)="toggleFilter('reprint', $event)"></filter-button>
      <filter-button text="04 Specials" (click)="toggleFilter('disney', $event)"></filter-button>
      <filter-button text="04 Dash" (click)="toggleFilter('04dash', $event)"></filter-button>
      <filter-button text="05 Specials" (click)="toggleFilter('ugly', $event)"></filter-button>
      <filter-button text="06 Specials" (click)="toggleFilter('colourful', $event)"></filter-button>
      <filter-button text="Anniversary" (click)="toggleFilter('oda', $event)"></filter-button>
      <filter-button text="Premium" (click)="toggleFilter('premium', $event)"></filter-button>
      <filter-button text="Winner" (click)="toggleFilter('winner', $event)"></filter-button>
      <filter-button text="Solo Japón" (click)="toggleFilter('japan', $event)"></filter-button>
    </div>`
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  data: any = JSON.parse(JSON.stringify(cardData));
  tabs: any = existingTabs;
  decks: any = JSON.parse(JSON.stringify(deckData));
  filters: any = {
    OP01: false,
    OP02: false,
    OP03: false,
    OP04: false,
    OP05: false,
    OP06: false,
    EB01: false,
    red: false,
    green: false,
    blue: false,
    purple: false,
    black: false,
    yellow: false,
    common: false,
    uncommon: false,
    rare: false,
    superRare: false,
    secret: false,
    leader: false,
    alternative: false,
    promo: false,
    judge: false
  }
  estimatedValue: any = {
    decks: 0,
    collection: 0,
    noCollection: 0,
    withCollection: 0
  };
  showFilterButtons: boolean = false;
  showDecks: boolean = false;
  filtersStr = '';

  ngOnInit() {
    this.data = Object.values(this.data);
    this.data.pop();
    this.estimateCards();
    // this.temporalDeckSaving();
  }

  activateTab(tab: any) {
    tab.show = !tab.show;
  }

  saveData(data: any, fileName: any) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    let json = JSON.stringify(data),
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  estimateCards() {
    this.estimatedValue = {
      decks: 0,
      collection: 0,
      noCollection: 0,
      withCollection: 0
    };
    this.data.forEach((card: any) => {
      this.estimatedValue.noCollection += card.price * card.stock;
      card.collection ? this.estimatedValue.withCollection += card.price * (parseInt(card.stock) + 1) : this.estimatedValue.withCollection += card.price * card.stock;
    })
    this.estimatedValue.noCollection = Number(this.estimatedValue.noCollection.toFixed(2));
    this.estimatedValue.withCollection = Number(this.estimatedValue.withCollection.toFixed(2));
    this.estimatedValue.collection = (Number(this.estimatedValue.withCollection) - Number(this.estimatedValue.noCollection)).toFixed(2);
  }

  chooseDeck(card: any) {
    if (Object.keys(this.decks).includes(card.code)) {
      alert('HABEMUS MAZO');
    }
  }

  parseCollectionData() {
    let savingData: any = {};
    this.data.forEach((card: any) => {
      savingData[card.code] = {
        "code": card.code,
        "name": card.name,
        "rarity": card.rarity,
        "colors": card.colors,
        "image": card.image,
        "price": parseFloat(card.price),
        "stock": parseInt(card.stock),
        "collection": card.collection,
        "special": card.special,
        "specialDescription": card.specialDescription
      };
    });
    this.saveData(savingData, 'cardData.json');
  }

  temporalDeckSaving() {
    let deck: string[] = ['1xST01-001',
    '4xST01-002',
    '4xST01-003',
    '4xST01-004',
    '4xST01-005',
    '4xST01-006',
    '4xST01-007',
    '4xST01-008',
    '4xST01-009',
    '4xST01-010',
    '2xST01-011',
    '2xST01-012',
    '2xST01-013',
    '2xST01-014',
    '2xST01-015',
    '2xST01-016',
    '2xST01-017'];
    let savingData: any = {};
    savingData[deck[0].split('x')[1]] = [];
    deck.forEach((card: any, index) => {
      if (index > 0) {
        savingData[deck[0].split('x')[1]].push({
          "code": card.split('x')[1],
          "copies": parseInt(card.split('x')[0])
        });
      }
    });
    this.saveData(savingData, 'deckData.json');
  }

  toggleFilter(filterToggled: string, ev: any) {
    ev.target.classList.value === 'card selected' ? ev.target.classList.value = 'card' : ev.target.classList.value = 'card selected';
    this.filters[filterToggled] = !this.filters[filterToggled];
    this.data.forEach((card: any) => {
      this.filterCard(card);
    })
    this.stringifyFilters();
  }

  stringifyFilters() {
    this.filtersStr = '';
    Object.keys(this.filters).forEach((fil) => {
      if (this.filters[fil]) { this.filtersStr += fil + ' '; }
    });
  }

  toggleFilterButtons() {
    this.showFilterButtons = !this.showFilterButtons;
  }

  toggleDecks() {
    this.showDecks = !this.showDecks;
  }

  filterCard(card: any) {
    let response = false;
    let filtered = false;
    let discarded = false;
    Object.keys(this.filters).forEach((filterKey) => {
      if (this.filters[filterKey]) {
        filtered = true;
        switch (filterKey) {
          case 'OP01': 
          case 'OP02':
          case 'OP03':
          case 'OP04':
          case 'OP05':
          case 'OP06':
          case 'EB01':
          case 'ST01': 
          case 'ST02':
          case 'ST03':
          case 'ST04':
          case 'ST05':
          case 'ST06':
          case 'ST07': 
          case 'ST08':
          case 'ST09':
          case 'ST10':
          case 'ST11':
          case 'ST12':
          case 'ST13':
            if (response && !card.code.includes(filterKey)) {
              response = false;
              discarded = true;
            };
            if (!response && card.code.includes(filterKey)) { response = true };
            if (!response && !card.code.includes(filterKey)) { discarded = true };
            break;
          case 'red':
          case 'green':
          case 'blue':
          case 'purple':
          case 'black':
          case 'yellow':
            if (response && !card.colors.includes(filterKey)) {
              response = false;
              discarded = true;
            };
            if (!response && card.colors.includes(filterKey)) { response = true };
            if (!response && !card.colors.includes(filterKey)) { discarded = true };
            break;
          case 'C':
          case 'UC':
          case 'R':
          case 'SR':
          case 'SEC':
          case 'L':
          case 'DON':
          case 'P':
            if (response && card.rarity !== filterKey) {
              response = false;
              discarded = true;
            };
            if (!response && card.rarity === filterKey) { response = true };
            if (!response && card.rarity !== filterKey) { discarded = true };
            break;
          case 'alternative':
          case 'judge':
          case 'boxtopper':
          case 'prerelease':
          case 'championship':
          case 'manga':
          case 'wanted':
          case 'disney':
          case 'ugly':
          case 'colourful':
          case 'oda':
          case 'japan':
          case 'stp':
          case 'premium':
          case 'winner':
          case 'reprint':
          case 'limited':
          case 'regional':
          case '04dash':
          case 'store':
            if (response && !(card.special && card.specialDescription.includes(filterKey))) {
              response = false;
              discarded = true;
            };
            if (!response && card.special && card.specialDescription.includes(filterKey)) { response = true };
            if (!response && !(card.special && card.specialDescription.includes(filterKey))) { discarded = true };
            break;
          case 'noAA':
            if (response && card.special) {
              response = false;
              discarded = true;
            };
            if (!response && !card.special) { response = true };
            if (!response && card.special) { discarded = true };
            break;
        }
      }
    });
    if (discarded) { return false; }
    if (filtered) {
      return response;
    } else {
      return true;
    }
  }
}
