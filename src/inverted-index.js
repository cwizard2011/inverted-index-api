/** 
 *  Inverted Index Class
 *  @Author: Adeoye Peter Adeola <cwizard2011@gmail.com>
 *  @class
 */
class InvertedIndex {
  /** 
   *  Initialises to empty object
   *  @constructor
   */
  constructor() {
    this.indices = {};
  }
  /** 
   *  Checks if the file is Malformed
   *  @param {object}, json file
   *  @param {boolean}, result
   *  @returns {boolean}, result return boolean i.e true or false
   */
  static isFileMalformed(jsonFile) {
    let result = false;
    for (let i = 0; i < jsonFile.length; i += 1) {
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
  static arrayFromText(text) {
    text = new Set(text.toLowerCase().match(/\s+/g));
    return Array.from(text);
  }
  /** 
   *  Method to get all contents of JSON file
   *  @param {array} jsonFile, array of book objects 
   *  @returns {string}, a string mixture of both title and text i.e JASON content flattened
   */
  static bookContent(jsonFile) {
    let bookedContent = '';
    jsonFile.forEach((book) => {
      bookedContent += `${book.title} ${book.text}`;
    });
    return bookedContent.trim();
  }
  /** 
   *  The method will read the file and verify it's valid create an index of the words in it
   *  @param {string} fileName , the name of the book to be indexed
   *  @param {string} fileContent, the content of the JSON array
   *  @returns {object} returns a string
   */
  createIndex(fileName, fileContent) {
    if (!fileName || fileContent === undefined) {
      throw new Error('Improper arguements');
    }
    if (!Array.isArray(fileContent)) {
      throw new Error('Not JSON array');
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
    const index = {};
    const allFileContent = InvertedIndex.arrayFromText(InvertedIndex.bookContent(fileContent));
    let eachContent;
    fileContent.forEach((book, filePath) => {
      eachContent = book;
      eachContent = new Set(`${eachContent.title} ${eachContent.text} `);
      allFileContent.forEach((word) => {
        if (eachContent.has(word)) {
          if (word in index) index[word].push(filePath);
          else index[word] = [filePath];
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
  static searchIndex(indices, ...terms) {
    let searchTerms = [];
    const result = {};
    const keys = Object.keys(indices);
    terms.forEach((term) => {
      if (Array.isArray(term)) {
        searchTerms.push(...term);
      }
      if (typeof term === 'string') {
        searchTerms.push(...InvertedIndex.arrayFromText(term));
      }
    });
    keys.forEach((index) => {
      result[index] = {};
    });
    let fileName;
    if (searchTerms[1] === 'json') {
      fileName = `${searchTerms[0]}.json`;
      searchTerms = searchTerms.slice(2);
    } else {
      fileName = 'all';
        }
    keys.forEach((index) => {
      searchTerms.forEach((word) => {
        if (word in indices[index]) {
          result[index][word] = indices[index][word];
        }
      });
    });
    if (!(fileName in indices) && fileName !== 'all') {
      return `${fileName} not in index`;
    }
    if (fileName === 'all') {
      return result;
    }
    return result[fileName];
    }
}

export default InvertedIndex;
