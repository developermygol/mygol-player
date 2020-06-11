

export const findInNormalizedTable = (data, searchField, searchValue) => {
    for (var id in data) {
        const row = data[id];
        const fieldValue = row[searchField];
        if (fieldValue === searchValue) 
            return row;
    }

    return null;    
}

export const normalize = (dataArray) => {
    let result = {};

    dataArray.forEach(element => {
        const id = element.id;
        result[id] = element;
    });

    return result;
}


export const getIndexForId = (array, id) => {
    if (!array) return null;
    
    id = parseInt(id, 10);
    
    for (let i = 0; i < array.length; ++i) {
        const row = array[i];
        if (!row) continue;
        if (row.id === id) return i;
    }
    
    return null;
}

export const findByIdInArray = (array, id) => {
    const i = getIndexForId(array, id);
    if (i !== null) return array[i];
}

export const updateByIdInArray = (array, id, newRow) => {
    const i = getIndexForId(array, id);
    if (i !== null) array[i] = newRow;
}

export const removeByIdInArray = (array, id) => {
    const i = getIndexForId(array, id);
    if (i !== null) array.splice(i, 1);
}

export const updateOrInsertInArray = (array, id, newRow) => {
    const i = getIndexForId(array, id);
    if (i !== null) {
        array[i] = newRow;
    }
    else {
        array.push(newRow);
    }
}

// If it is a normal array, it will be sorted in place and return value will be undefined.
// If it is a mobx observableArray, sort returns a new sorted array. 
export const sortArrayById = (array) => {
    if (!array) return null;
    return array.sort((a, b) => a.id - b.id);
}

export const sortArrayByTimeStamp = (array) => {
    if (!array) return null;
    return array.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
}


export const sortArrayByTimeStampDesc = (array) => {
    if (!array) return null;
    return array.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
}


export const groupBy = (list, groupEntities, groupField, listField) => {
    const result = groupEntities.map(entity => {
        return { 
            ...entity, 
            grouped: list.filter(e => {
                return e[listField] === entity[groupField]
            })
        }
    })

    return result;
}