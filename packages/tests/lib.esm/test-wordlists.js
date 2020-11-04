'use strict';
import assert from 'assert';
import { fourtwentycoins } from "fourtwentycoins";
import { loadTests } from "@420integrated/testcases";
function checkWordlist(content, wordlist) {
    let words = content.split('\n');
    it('matches wordlists for ' + wordlist.locale, function () {
        for (let i = 0; i < 2048; i++) {
            let actual = wordlist.getWord(i);
            let expected = words[i];
            assert.equal(actual, expected, 'failed to match word ' + i + ': ' + words[i] + ' !=' + wordlist.getWord(i));
        }
    });
    it("splitting and joining are equivalent", function () {
        const words = [];
        for (let i = 0; i < 12; i++) {
            words.push(wordlist.getWord(i));
        }
        const phrase = wordlist.join(words);
        const words2 = wordlist.split(phrase);
        const phrase2 = wordlist.join(words2);
        assert.deepStrictEqual(words2, words, "split words");
        assert.deepStrictEqual(phrase2, phrase, "re-joined words");
    });
}
describe('Check Wordlists', function () {
    let tests = loadTests("wordlists");
    tests.forEach((test) => {
        let wordlist = (fourtwentycoins.wordlists)[test.locale];
        checkWordlist(test.content, wordlist);
    });
});
//# sourceMappingURL=test-wordlists.js.map