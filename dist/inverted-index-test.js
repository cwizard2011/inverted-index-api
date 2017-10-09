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
    it('should throw, `Improper file name`', function () {
      expect(function () {
        invertedIndexTest.createIndex([], []);
      }).toThrow('Improper file name');
    });
    it('should throw, `Malformed file`', function () {
      expect(function () {
        invertedIndexTest.createIndex('string', ['title']);
      }).toThrow('Malformed file');
      expect(function () {
        invertedIndexTest.createIndex('string', _malformed2.default);
      }).toThrow('Malformed file');
      expect(function () {
        invertedIndexTest.createIndex('string', _bad2.default);
      }).toThrow(Error('Malformed file'));
    });
  });
  describe('Checks If file is malformed', function () {
    it('should return `true` for malformed JSON file', function () {
      expect(_invertedIndex2.default.isFileMalformed(_malformed2.default)).toBe(true);
    });
    it('should return `false` for valid JSON file', function () {
      expect(_invertedIndex2.default.isFileMalformed(_valid2.default)).toBe(false);
    });
  });
  describe('Check if array or token is formed from file', function () {
    var text1 = _valid2.default[0].text;
    var text2 = _valid2.default[1].text;
    var validTokens1 = Array.from(new Set(text1.toLowerCase().split(' ')));
    var validTokens2 = Array.from(new Set(text2.toLowerCase().split(' ')));
    it('Should return an array of unique token', function () {
      expect(_invertedIndex2.default.arrayFromText(text1)).toBeTruthy();
      expect(_invertedIndex2.default.arrayFromText(text1)).toEqual(validTokens1);
      expect(_invertedIndex2.default.arrayFromText(text2)).toEqual(validTokens2);
    });
  });
  describe('Is JSON content properly flattened in the method bookContent?', function () {
    var expected = 'I love being your developer Being a developer is one of my greatest dream ' + 'in life Life is full of mystery Your student today will be your teacher tomorrow, its dancing time';
    it('Should return a string of all titles and texts', function () {
      expect(_invertedIndex2.default.bookContent(_book2.default)).toBe(expected);
    });
  });
  describe('Checks if the `searchIndex` returns valid results', function () {
    invertedIndexTest.createIndex('valid.json', _valid2.default);
    invertedIndexTest.createIndex('book1.json', _book2.default);
    var indices = invertedIndexTest.indices;
    it('Should return a valid result for one file', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'valid.json', 'dancing')).toEqual(_searchValid2.default);
    });
    it('Should return a valid result for all files', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'dancing')).toEqual(_searchAll2.default);
    });
    it('Should return a valid result for all files', function () {
      expect(_invertedIndex2.default.searchIndex(indices, ['dancing'])).toEqual(_searchAll2.default);
    });
    it('Should return `try not in index`', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'try.json', 'dancing')).toBe('try.json not in index');
    });
    it('Should return `{yeh:[]}`', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'valid.json', 'yeh')).toEqual({ yeh: [] });
    });
    var expected = {
      'valid.json': { yeh: [] },
      'book1.json': { yeh: [] }
    };
    it('Should return appropriate result', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'yeh')).toEqual(expected);
    });
  });
});