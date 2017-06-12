import {Injectable} from '@angular/core';
import * as localforage from 'localforage';

export class AppStorageValue {
  private v: any;
  private cached = false;
  private _onChange: Function[] = [];

  constructor(public k: string, private driver: AppStorage) {
  }

  async get(defaultValue?: any) {
    if (!this.cached) {
      this.v = await this.driver.read(this.k, defaultValue);
      console.log(this.v);
      this.cached = true;
    }
    return this.v;
  }

  async set(v: any) {
    const old = this.v;
    this.v = v;
    this.cached = false;
    await this.driver.write(this.k, v);
    if (old !== v) {
      this._onChange.forEach(cb => cb(v, old));
    }
  }

  onChange(cb: Function) {
    this._onChange.push(cb);
  }

  clearCache() {
    this.v = null;
    this.cached = false;
  }
}


@Injectable()
export class AppStorage {
  m = new Map<string, AppStorageValue>();
  s = localforage;

  async write(key: string, value: any) {
    return this.s.setItem(key, value);
  }

  async read(key: string, defaultValue: any = null) {
    let v = await this.s.getItem(key);
    if (v === null && defaultValue !== null) {
      v = defaultValue;
      await this.write(key, defaultValue)
    }
    return v;
  }

  get(key: string) {
    const exists = this.m.has(key);
    if (!exists) {
      this.m.set(key, new AppStorageValue(key, this));
    }
    return this.m.get(key);
  }
}
