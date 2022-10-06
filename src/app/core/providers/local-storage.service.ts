import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  getItem(key: string): string[] {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  setItem(key: string, item: string | string[]) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  addItem(key: string, item: string) {
    let currentLocalStorage: string[] =
      JSON.parse(localStorage.getItem(key)) || [];
    const index = currentLocalStorage.findIndex((value) => item === value);
    if (index === -1) {
      currentLocalStorage.push(item);
      this.setItem(key, currentLocalStorage);
    }
  }

  removeItem(key: string, item: string) {
    let currentLocalStorage: string[] =
      JSON.parse(localStorage.getItem(key)) || [];
    currentLocalStorage = currentLocalStorage.filter((value) => item !== value);
    this.setItem(key, currentLocalStorage);
  }
}
