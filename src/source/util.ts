export class Lock {
  private l = false;

  lock() {
    this.l = true;
  }

  unlock() {
    this.l = false;
  }

  available(): boolean {
    return this.l === false;
  }
}
