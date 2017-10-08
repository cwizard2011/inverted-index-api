'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 *  Inverted Index Class
 *  @Author: Adeoye Peter Adeola <cwizard2011@gmail.com>
 *  @class
 */
var InvertedIndex = function () {
  /** 
   *  Initialises to empty object
   *  @constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.indices = {};
  }
  /** 
   *  Checks if JSON file is Malformed
   *  @param {object}, json file
   *  @returns {boolean}, result return boolean i.e true or false
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',

    /** 
     *  The method will read the file and verify it's valid create an index of the words in it
     *  @param {string} fileName , the name of the book to be indexed
     *  @param {string} fileContent, the content of the JSON array
     *  @returns {object} returns a string
     */
    value: function createIndex(fileName, fileContent) {
      if (!fileName || fileContent === undefined) {
        throw new Error('Improper arguement');
      }
      if (!Array.isArray(fileContent)) {
        throw new Error('not JSON array');
      }
      if (typeof fileName !== 'string') {
        throw new Error('Improper file name');
      }
      if (!fileContent.length) {
        throw new Error('Empty JSON array');
      }
      try {
        if (InvertedIndex.isFileMalformed(fileContent)) {
          throw new Error('Malformed file');
        }
      } catch (err) {
        throw new Error('Malformed file');
      }
      var index = {};
      var allFileContent = InvertedIndex.arrayFromText(InvertedIndex.bookContent(fileContent));
      var eachContent = void 0;
      fileContent.forEach(function (book, filePath) {
        eachContent = book;
        eachContent = new Set(eachContent.title + ' ' + eachContent.text + ' ');
        allFileContent.forEach(function (word) {
          if (eachContent.has(word)) {
            if (word in index) index[word].push(filePath);else index[word] = [filePath];
          }
        });
      });
      this.indices[fileName] = index;
      return JSON.stringify(index);
    }
    /** 
     *  Method to search the already created index
     *  @param {object} indices - indices to be searched
     *  @param {string} fileName - name of the file to be searched
     *  @param {string|array} terms - search terms
     *  @returns {object} - contains the location of each terms
     */

  }], [{
    key: 'isFileMalformed',
    value: function isFileMalformed(jsonFile) {
      var result = false;
      for (var i = 0; i < jsonFile.length; i += 1) {
        result = !('title' in jsonFile[i] && 'text' in jsonFile[i]);
        if (result) break;
      }
      return result;
    }
    /**
     *  Split string of text into unique word and form array from it i.e tokens
     *  @param {string},text to be splitted
     *  @returns {array}, unique word from the strings
     */

  }, {
    key: 'arrayFromText',
    value: function arrayFromText(text) {
      text = new Set(text.toLowerCase().match(/\s+/g));
      return Array.from(text);
    }
    /** 
     *  Method to get all contents of JSON file
     *  @param {array} jsonFile, array of book objects 
     *  @returns {string}, a string mixture of both title and text i.e JASON content flattened
     */

  }, {
    key: 'bookContent',
    value: function bookContent(jsonFile) {
      var bookedContent = '';
      jsonFile.forEach(function (book) {
        bookedContent += book.title + ' ' + book.text;
      });
      return bookedContent.trim();
    }
  }, {
    key: 'searchIndex',
    value: function searchIndex(indices) {
      var searchTerms = [];
      var result = {};
      var keys = Object.keys(indices);

      for (var _len = arguments.length, terms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        terms[_key - 1] = arguments[_key];
      }

      terms.forEach(function (term) {
        if (Array.isArray(term)) {
          var _searchTerms;

          (_searchTerms = searchTerms).push.apply(_searchTerms, _toConsumableArray(term));
        }
        if (typeof term === 'string') {
          var _searchTerms2;

          (_searchTerms2 = searchTerms).push.apply(_searchTerms2, _toConsumableArray(InvertedIndex.arrayFromText(term)));
        }
      });
      keys.forEach(function (index) {
        result[index] = {};
      });
      var fileName = void 0;
      if (searchTerms[1] === 'json') {
        fileName = searchTerms[0] + '.json';
        searchTerms = searchTerms.slice(2);
      } else {
        fileName = 'all';
      }
      keys.forEach(function (index) {
        searchTerms.forEach(function (word) {
          if (word in indices[index]) {
            result[index][word] = indices[index][word];
          }
        });
      });
      if (!(fileName in indices) && fileName !== 'all') {
        return fileName + ' not in index';
      }
      if (fileName === 'all') {
        return result;
      }
      return result[fileName];
    }
  }]);

  return InvertedIndex;
}();

exports.default = InvertedIndex;