import { Component, OnInit } from '@angular/core';
import * as cardData from '../assets/cardData.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  data: any = JSON.parse(JSON.stringify(cardData));
  filters: any = {
    OP01: false,
    OP02: false,
    OP03: false,
    OP04: false,
    OP05: false,
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
    noCollection: 0,
    withCollection: 0
  };
  showFilterButtons: boolean = false;
  filtersStr = '';

  ngOnInit() {
    this.data = Object.values(this.data);
    this.data.pop();
    this.estimateCards();
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
      noCollection: 0,
      withCollection: 0
    };
    this.data.forEach((card: any) => {
      this.estimatedValue.noCollection += card.price * card.stock;
      card.collection ? this.estimatedValue.withCollection += card.price * (parseInt(card.stock) + 1) : this.estimatedValue.withCollection += card.price * card.stock;
    })
    this.estimatedValue.noCollection = Number(this.estimatedValue.noCollection.toFixed(2));
    this.estimatedValue.withCollection = Number(this.estimatedValue.withCollection.toFixed(2));
  }

  parseSavingData() {
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
            if (response && card.rarity !== filterKey) {
              response = false;
              discarded = true;
            };
            if (!response && card.rarity === filterKey) { response = true };
            if (!response && card.rarity !== filterKey) { discarded = true };
            break;
          case 'alternative':
          case 'promo':
          case 'judge':
          case 'boxtopper':
          case 'prerelease':
          case 'championship':
          case 'manga':
          case 'wanted':
          case 'disney':
          case 'ugly':
          case 'oda':
          case 'japan':
          case 'stp':
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
