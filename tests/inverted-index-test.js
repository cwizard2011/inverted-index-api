const invertedIndexTest = new InvertedIndex();

describe ( "Inverted Index Test", () =>{
    describe("Is createIndex properly called?", () => {
        it("should throw, Improper arguements", () => {
            expect(() => {invertedIndexTest.createIndex()} )
            .toThrow("improper arguement")
            expect(() => {invertedIndexTest.createIndex(valid)})
            .toThrow("improper arguement");
        })
        it("should throw, Empty JSON array", () => {
            expect(() => {invertedIndexTest.
                createIndex("string", [])})
                .toThrow("Empty JSON array");

        })
    })
})