'use strict';

var _invertedIndex = require('../src/inverted-index.js');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

var _valid = require('../fixtures/valid.json');

var _valid2 = _interopRequireDefault(_valid);

var _book = require('../fixtures/book1.json');

var _book2 = _interopRequireDefault(_book);

var _malformed = require('../fixtures/malformed.json');

var _malformed2 = _interopRequireDefault(_malformed);

var _bad = require('../fixtures/bad.json');

var _bad2 = _interopRequireDefault(_bad);

var _searchValid = require('../fixtures/search-valid.json');

var _searchValid2 = _interopRequireDefault(_searchValid);

var _searchAll = require('../fixtures/search-all.json');

var _searchAll2 = _interopRequireDefault(_searchAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invertedIndexTest = new _invertedIndex2.default(); /** Inverted index test 
                                                        *  @Author: Adeoye Peter Adeola
                                                        */


describe('Inverted Index Test', function () {
  describe('Is createIndex properly called?', function () {
    it('should throw, `Improper arguement`', function () {
      expect(function () {
        invertedIndexTest.createIndex();
      }).toThrow('Improper arguement');
      expect(function () {
        invertedIndexTest.createIndex(_valid2.default);
      }).toThrow('Improper arguement');
    });
    it('should throw, `Empty JSON array`', function () {
      expect(function () {
        invertedIndexTest.createIndex('string', []);
      }).toThrow('Empty JSON array');
    });
    it('should throw, `not JSON array`', function () {
      expect(function () {
        invertedIndexTest.createIndex('string', 3);
      }).toThrow('not JSON array');
    });
    it('should throw,` not JSON array`', function () {
      expect(function () {
        invertedIndexTest.createIndex('string', {});
      }).toThrow('not JSON array');
    });
    /* it('should throw, `Improper file name`', () => {
      expect(invertedIndexTest.createIndex([], [])).toThrow('Improper file name');
    });
    it('should throw, `Malformed file`', () => {
      expect(invertedIndexTest.createIndex('string', ['title'])).toThrow('Malformed file');
      expect(invertedIndexTest.createIndex('string', malformed)).toThrow('Malformed file');
      expect(invertedIndexTest.createIndex('string', bad)).toThrow(Error('Malformed file'));
    });
    });
    describe('Checks If file is malformed', () => {
    it('should return `true` for malformed JSON file', () => {
      expect(InvertedIndex.isFileMalformed(malformed)).toBe(true);
    });
    it('should return `false` for valid JSON file', () => {
      expect(() => { InvertedIndex.isFileMalformed(valid); }).toBe(false);
    });
    });
    describe('Check if array or token is formed from file', () => {
    const text1 = valid[0].text;
    const text2 = valid[1].text;
    const validTokens1 = Array.from(new Set(text1.toLowerCase().split(' ')));
    const validTokens2 = Array.from(new Set(text2.toLowerCase().split(' ')));
    it('Should return an array of unique token', () => {
      expect(InvertedIndex.arrayFromText(text1)).toBeTruthy();
      expect(InvertedIndex.arrayFromText(text1)).toEqual(validTokens1);
      expect(() => { InvertedIndex.arrayFromText(text2); }).toEqual(validTokens2);
    });
    });
    describe('Is JSON content properly flattened in the method bookContent?', () => {
    const expected = 'I love being a developer Being a developer is one of my greatest dream'
    + 'Life is full of mystery Your student today will be your teacher tomorrow, its dancing time';
    it('Should return a string of all titles and texts', () => {
      expect(InvertedIndex.bookContent(book1)).toBe(expected);
    });
    });
    describe('Checks if the `searchIndex` returns valid results', () => {
    invertedIndexTest.createIndex('valid.json', valid);
    invertedIndexTest.createIndex('book1.json', valid);
    const indices = invertedIndexTest.indices;
    it('Should return a valid result for one file', () => {
      expect(InvertedIndex.searchIndex(indices, 'valid.json', 'dancing')).toEqual(searchValid);
    });
    it('Should return a valid result for all files', () => {
      expect(InvertedIndex.searchIndex(indices, 'dancing')).toEqual(searchAll);
    });
    it('Should return a valid result for all files', () => {
      expect(InvertedIndex.searchIndex(indices, ['dancing'])).toEqual(searchAll);
    });
    it('Should return `try not in index`', () => {
      expect(InvertedIndex.searchIndex(indices, 'try.json', 'laughs')).toBe('try.json not in index');
    });
    it('Should return `{meh:[]}`', () => {
      expect(InvertedIndex.searchIndex(indices, 'valid.json', 'meh')).toEqual({ meh: [] });
    });
    const expected = {
      'valid.json': { meh: [] },
      'book1.json': { meh: [] }
    };
    it('Should return appropriate result', () => {
      expect(InvertedIndex.searchIndex(indices, 'meh')).toEqual(expected);
    }); */
  });
});