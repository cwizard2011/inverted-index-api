/** Inverted Index Class
 *  @Author: Adeoye Peter Adeola <cwizard2011@gmail.com>
 *  @class
 */
class InvertedIndex {
    /** @constructor
     *  initialises to empty object
     */
    constructor () {
        this.indices = {};
    }
    /** check if the file is Malformed
     * @param{object}, json file
     * result return boolean
     */
    static isFileMalformed(jsonFile){
        let result = false;
        for(let i=0; i<jsonFile.length; i+=1){
            result = !("title" in jsonFile[i] 
            && "text" in jsonFile[i])
            if (result) break;
        }
        return result;
    }
    /** Split string of text into unique word
     * and form array from it
     * @param {string},text to be splitted
     * @returns {array}, unique word from the string
      */
    static arrayFromText(text){
        text = new Set(text.toLowerCase().match(/\s+/g));
        return Array.from(text);
    }
    /** Method to get all contents of JSON file
     * @param {array} jsonFile, array of book objects
     * @returns {string}, a string mixture of both title and text
     */
    static bookContent(jsonFile) {
        let bookContent = '';
        bookContent.forEach((book) => {
            bookContent += `${book.title} ${book.text}`;
        })
        return bookContent.trim();
    }
    /** The method will read the file and verify it's valid
     * create an index of the words in it
     * @param {string} fileName , the name of the book to
     * be indexed
     * @param {string} fileContent, the content of the JSON array
     * @returns {object} returns a string
     */

     /**Read file and check for errors */
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
            if (InvertedIndex
                .isFileMalformed(fileContent)) {
                throw new Error('Malformed file');
            }
        } catch (err) {
            throw new Error('Malformed file');
        }
        /**If no error found, create a method index to empty array
         * read all file content and create a variable for each
         * book content
         */
        const index = {}
        const allFileContent = InvertedIndex
        .arrayFromText(InvertedIndex.bookContent(fileContent));
        let eachContent;

        /**Read the file path for each book, and
         * set each content of title and text
         *
         */

        fileContent.forEach((book, filePath) => {
            eachContent = book;
            eachContent = 
            new Set(`${eachContent.title} ${eachContent.text} `);

            /** Create index of the word and push into 
             * filepath
             * and return the string of JSON book index
             */

            allFileContent.forEach((word) => {
                if(eachContent.has(word)) {
                    if (word in index) index[word].push(filePath);
                    else index[word] = [filePath];
                }
            })
        })
        this.indices[fileName] = index;
        return JSON.stringify(index);
    }
    /** Method to search the already created index
     * @param {object} indices - indices to be searched
     * @param {string} fileName - name of the file to be
     * searched
     * @param {string|array} terms - search terms
     * @returns {object} - contains the location of each
     * terms
     */



}