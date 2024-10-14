import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as cardData from '../assets/cardData.json';
import * as deckData from '../assets/deckData.json';

const existingTabs: any[] = [
  {
    tabName: 'Expansiones',
    show: false
  },
  {
    tabName: 'Starter Decks',
    show: false
  },
  {
    tabName: 'Colores',
    show: false
  },
  {
    tabName: 'Rarezas',
    show: false
  },
  {
    tabName: 'Altered',
    show: false
  },
  {
    tabName: 'Rareza Especial',
    show: false
  },
  {
    tabName: 'Especiales',
    show: false
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  data: any = JSON.parse(JSON.stringify(cardData));
  deckInfo: any = JSON.parse(JSON.stringify(deckData));
  tabs: any = existingTabs;
  filters: any = {
    OP01: false,
    OP02: false,
    OP03: false,
    OP04: false,
    OP05: false,
    OP06: false,
    EB01: false,
    OP07: false,
    OP08: false,
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
    spareStock: 0,
    deckStock: 0,
    collection: 0,
    noCollection: 0,
    withCollection: 0
  };
  showFilterButtons: boolean = false;
  showDecks: boolean = false;
  showCalc: boolean = false;
  filtersStr = '';
  deckInput = '';
  leaders: any[] = [];
  deckLeaders: any[] = [];
  deckLists: any[] = [];

  constructor(private cdRef:ChangeDetectorRef) {}

  ngOnInit() {
    this.data = Object.values(this.data);
    this.data.pop();
    this.deckInfo = Object.values(this.deckInfo);
    this.deckInfo.pop();
    console.log(this.deckInfo);
    this.estimateCards();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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
      spareStock: 0,
      deckStock: 0,
      collection: 0,
      noCollection: 0,
      withCollection: 0
    };
    this.data.forEach((card: any) => {
      if (card.rarity === 'L' && !card.special) {
        this.leaders.push({ code: card.code, name: card.code + ' ' + card.name });
      }
      if (card.deckLeaderOne !== '' && this.deckLeaders.indexOf(card.deckLeaderOne) === -1) {
        this.deckLeaders.push(card.deckLeaderOne);
      }
      if (card.deckLeaderTwo !== '' && this.deckLeaders.indexOf(card.deckLeaderTwo) === -1) {
        this.deckLeaders.push(card.deckLeaderTwo);
      }
      this.estimatedValue.noCollection += card.price * card.stock;
      this.estimatedValue.spareStock += Number(card.stock);
      this.estimatedValue.deckStock += Number(card.deckOneCopies);
      this.estimatedValue.deckStock += Number(card.deckTwoCopies);
      this.estimatedValue.decks += card.price * (Number(card.deckOneCopies) + Number(card.deckTwoCopies));
      card.collection ? this.estimatedValue.withCollection += card.price * (parseInt(card.stock) + 1) : this.estimatedValue.withCollection += card.price * card.stock;
    });
    this.deckLeaders.forEach((deckLeader: any) => {
      this.deckLists[deckLeader] = '';
    });
    let deckListsLeaders = Object.keys(this.deckLists);
    this.data.forEach((card: any) => {
      if (deckListsLeaders.indexOf(card.deckLeaderOne) !== -1) {
        this.deckLists[card.deckLeaderOne] += card.deckOneCopies + 'x' + card.code + '<br/>';
      }
      if (deckListsLeaders.indexOf(card.deckLeaderTwo) !== -1) {
        this.deckLists[card.deckLeaderTwo] += card.deckTwoCopies + 'x' + card.code + '<br/>';
      }
    });
    this.estimatedValue.noCollection = Number(this.estimatedValue.noCollection.toFixed(2));
    this.estimatedValue.withCollection = Number(this.estimatedValue.withCollection.toFixed(2));
    this.estimatedValue.decks = Number(this.estimatedValue.decks.toFixed(2));
    this.estimatedValue.collection = (Number(this.estimatedValue.withCollection) - Number(this.estimatedValue.noCollection)).toFixed(2);
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
        "deckLeaderOne": card.deckLeaderOne,
        "deckOneCopies": parseInt(card.deckOneCopies),
        "deckLeaderTwo": card.deckLeaderTwo,
        "deckTwoCopies": parseInt(card.deckTwoCopies),
        "collection": card.collection,
        "special": card.special,
        "specialDescription": card.specialDescription
      };
    });
    this.saveData(savingData, 'cardData.json');
  }

  parseDeckData() {
    let savingData: any = {};
    Object.keys(this.deckLists).forEach((deck: any) => {
      savingData[deck] = {
        "deckList": this.deckLists[deck],
      };
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

  toggleDecks() {
    this.showDecks = !this.showDecks;
  }

  toggleCalc() {
    this.showCalc = !this.showCalc;
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

  updateDeckInput(e: any) {
    this.deckInput = '';
    const value = e.target.value;
    let deckToExamine = value.split('\n');
    let found = undefined;
    deckToExamine.forEach((card: any) => {
      found = this.data.find((cardToFind: any) =>{
        return cardToFind.code === card.split('x')[1];
      });
      if (found) {
        const cardsLeft = Number(card.split('x')[0]) - Number(found.stock) - Number(found.deckOneCopies) - Number(found.deckTwoCopies);
        if (cardsLeft > 0) {
          this.deckInput += '<strong class="red">Te faltan - '+ Math.abs(cardsLeft) + ' x</strong> ';
        } else if (cardsLeft < 0 && found.stock > cardsLeft) {
          this.deckInput += '<strong class="green">Te sobran</strong> - ';
        } else if (cardsLeft <= 0 && found.stock <= cardsLeft) {
          this.deckInput += '<strong class="orange">Tienes, pero en mazo:</strong> - ';
        } else {
          this.deckInput += '<strong class="green">Tienes justo</strong> - ';
        }
        this.deckInput += '<strong>' + found.name + ' - ' + found.code +
        '</strong> - En stock: ' + found.stock + ' - En mazo: ' + (Number(found.deckOneCopies) - Number(found.deckTwoCopies)) + '<br/>';
      } else {
        if (card.split('x')[1]) { this.deckInput += 'La carta ' + card.split('x')[1] + ' no se encuentra en la base de datos' }
      }
    });
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
          case 'OP07':
          case 'EB01':
          case 'OP08':
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
          case 'ST14':
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
          case 'festive':
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
          case 'mandala':
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
          case 'stockmore':
            if (response && card.stock <= 4) {
              response = false;
              discarded = true;
            };
            if (!response && card.stock > 4) { response = true };
            if (!response && card.stock <= 4) { discarded = true };
            break;
          case 'stockless':
            if (response && card.stock >= 4 || card.rarity === 'L' || card.rarity === 'P' || card.rarity === 'DON' || card.special) {
              response = false;
              discarded = true;
            };
            if (!response && card.stock < 4 && card.rarity !== 'L' && !card.special) { response = true };
            if (!response && card.stock >= 4 || card.rarity === 'L' || card.rarity === 'P' || card.rarity === 'DON' || card.special) { discarded = true };
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
