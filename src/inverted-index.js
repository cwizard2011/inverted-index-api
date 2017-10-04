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
     * @param{text},text to be splitted
      */
    static arrayFromText(text){
        text = new Set(text.toLowerCase().match(/\s+/g));
        return Array.from(text);
    }


}