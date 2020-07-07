const _ = require("lodash");

function combineArraysOfObjectsNoDuplicates(o1, o2, key) {
    return _.map(
        _.assign(
          ...[o1, o2].map(
            coll => _.mapKeys(coll, v => v[key])
          )
        )
    )
}

function getOnlyKeywordsFromArrayOfObjects(array, key) {
    return array.map(elem => {
        return elem[key]
    })
}

function getUnionOfArrays(arrays) {
    return _.union(arrays)
}

function allSameCase(array) {
    return array.map(function(v) {
        return v.toUpperCase();
    })
}

function removeAllBeforeCharacter(string, char) {
    return string.substring(string.indexOf(char) + 1).trim();
}

function addInSplitTerms(keywords, splitChar, charToReplace) {
    let withSplitTerms = []
    keywords.forEach((term) => {
        if (term.includes(splitChar)) {
            let split = term.replace(charToReplace, "").split(splitChar)
            split.forEach(newTerm => {
                withSplitTerms.push(newTerm.trim())
            })
        } else {
            withSplitTerms.push(term);
        }
    })
    return withSplitTerms;
}

function getNumberOfOccurences(siteText, keyword) {
    return (siteText.match(new RegExp(keyword, "g")) || []).length;
}

module.exports = {
    combineArraysOfObjectsNoDuplicates,
    getOnlyKeywordsFromArrayOfObjects,
    getUnionOfArrays,
    allSameCase,
    removeAllBeforeCharacter,
    addInSplitTerms,
    getNumberOfOccurences
}