'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Gloader
 * An abstract utiliy class that represents a Google Spreadsheet Loader.
 *
 * @extends {Function}
 * @type {GLoader}
 */
const GLoader = class GLoader extends Function {
  /**
   * Constructs a GSheets Loader
   *
   * @constructor
   *
   * @param {string} name The title of the sheet to load.
   * @param {Database} db The database this loader belongs to.
   */
  constructor(name, db) {
    super();
    ensureAbstract(this, GLoader);
    this.loadername = name;
    this.db = db;
  }
};

exports.GLoader = GLoader;
