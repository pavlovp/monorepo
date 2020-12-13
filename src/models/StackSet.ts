export default class Stack<T> {
  private _items: Array<T>;

  constructor() {
    this._items = [];
  }

  public push(elem: T): number {
    this._items.push(elem);
    return this.size();
  }

  public size() {
    return this._items.length;
  }

  public peek() {
    const size = this.size();
    if (size > 0) {
      return this._items[size - 1];
    }

    return undefined;
  }

  public pop() {
    return this._items.pop();
  }
}
