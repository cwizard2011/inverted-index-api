/**Inverted index test 
 * @Author: Adeoye Peter Adeola
 */
import InvertedIndex from '../src/inverted-index.js';
import valid from '../fixtures/valid.json';
import book1 from '../fixtures/book1.json';
import malformed from '../fixtures/malformed.json';
import bad from '../fixtures/bad.json';
import searchValid from '../fixtures/search-valid.json';
import searchAll from '../fixtures/search-all.json';

const invertedIndexTest = new InvertedIndex();

describe('Inverted Index Test', () => {
    describe('Is createIndex properly called?', () => {
        it('should throw, `Improper arguements`', () => {
            expect(() => {invertedIndexTest.createIndex();} )
            .toThrow('improper arguement');
            expect(() => {invertedIndexTest.createIndex(valid); })
            .toThrow('improper arguement');
        })
        it('should throw, `Empty JSON array`', () => {
            expect(() => {invertedIndexTest.
                createIndex('string', []);})
                .toThrow('Empty JSON array');

        })
        it('should throw, `not JSON array`', () => {
            expect(() => {invertedIndexTest.createIndex('string',3); })
            .toThrow('not JSON array');
        })
        it('should throw,` not JSON array`', () => {
            expect(() => {invertedIndexTest.createIndex('string' ,{ }); })
            .toThrow('not JSON array');
        })
        it('should throw, `Improper file name`', () => {
            expect(() => {invertedIndexTest.createIndex([], []); })
            .toThrow('Improper file name');
        })
        it('should throw, `Malformed file`', () => {
            expect(() => {invertedIndexTest
                .createIndex('string', ['title']); })
                .toThrow('Malformed file');
            
            expect(() => {invertedIndexTest.
                createIndex('string', malformed)})
                .toThrow('Malformed file');
            expect(() => {invertedIndexTest.createIndex('string',bad); })
            .toThrow(Error('Malformed file'));
            

        });

    });
    describe

})