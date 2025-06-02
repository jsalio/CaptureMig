import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheStorageService {

  constructor() {

  }

  private getStorageValue = <T extends {}>(key: string, defaultValue: T): T => {
    const value = localStorage.getItem(key);
    const initial = JSON.parse(value as any) as T;
    return initial || defaultValue;
  }


  /**
   *  Gets an item stored in local storage
   * @param key
   * @param defaultValue
   * @returns
   */
  get = <T extends {}>(key: string, defaultValue: T): T => {
    return this.getStorageValue(key, defaultValue);
  }

  /**
   *  Stores an item in local storage
   *
   * @param key
   * @param value
   */
  set = <T extends {}>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  updateValue = <T extends {}>(key: string, value: T) => {
    const currentValue = this.getStorageValue(key, value);
    const newValue = { ...currentValue, ...value };
    this.set(key, newValue);
  }

  /**
   *  Removes an item from local storage
   * @param key
   */
  destroy = (key: string) => {
    localStorage.removeItem(key);
  }
}
