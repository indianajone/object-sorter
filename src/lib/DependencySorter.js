class DependencySorter {
    
    sort(obj, needle) {
        let objectArray, sortedArray;
    
        if (this._isPrimetive(obj)) {
            return obj;
        }

        needle = needle || 'needs';
        objectArray = this._toArray(obj);
        sortedArray = this._hasDependency(objectArray, needle) ?
            this._sortByDependencie(objectArray, needle) :
            objectArray.sort();
      
        return this._toObject(sortedArray);
    }

    _sortByDependencie(dependencies, needle) {
        return dependencies.sort((a, b) => {            
            let position, lastDependency,
                [previousKey, previousValue] = a,
                [currentKey, currentValue] = b;

            if (
                this._currentHasNoDependencies(currentValue, needle) ||
                this._dependencyIsCurrent(previousValue[needle], currentKey)
            ) {
                position = 1;
            } else {
                lastDependency = currentValue[needle].sort().reverse()[0];
                position = lastDependency === previousKey ? 0 : lastDependency > previousKey ? -1 : 1
            }

            return position;
        });
    }

    _dependencyIsCurrent(dependencies, currentKey) {
        return dependencies && dependencies.length &&
            dependencies.sort()[0] === currentKey;
        
    }

    _currentHasNoDependencies(current, needle) {
        return !current[needle];
    }

    _hasDependency(dependencies, needle) {
        return dependencies.some(item => !!(item[1] ? item[1][needle] : false));
    }

    _isPrimetive(value) {
        /* istanbul ignore next */
        return ['string', 'number', 'boolean'].some(key => typeof value === key);
    }

    _toArray(obj) {
        return Array.isArray(obj) ? obj : Object.keys(obj).map(key => [key, obj[key]]);
    }

    _toObject(arr) {
        let obj = {}, index = 0;
        for (let [key, value] of arr) {    
            if (value) {
                obj[key] = value;
            } else {
                obj[index] = key;
                index++;
            }
        }
        return obj;
    }
}

export default DependencySorter;
