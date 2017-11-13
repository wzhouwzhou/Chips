'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Gloader
 * An abstract utiliy class that represents a Google Spreadsheet Loader.
 *
 * @extends {Runnable}
 * @type {GLoader}
 */
const GLoader = class GLoader extends require('./Runnable').Runnable {
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

    /**
    * Ensures that this class is not instantiated.
    */
    ensureAbstract(this, GLoader);

    /**
    * The name of the loader.
    * @type {string}
    */
    this.loadername = name;

    /**
    * The database this loader belongs to.
    * @type {Database}
    */
    this.db = db;
  }

  run(...args) {
    return this.load(...args);
  }
};

exports.GLoader = GLoader;
