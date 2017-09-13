
const BattleshipGameShip = class BattleshipGameShip {
  constructor(opts) {
    Object.entries(opts).map(([k, v]) => this[k] = v);
  }
}
