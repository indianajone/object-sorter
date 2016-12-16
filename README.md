# Object Sorter

Sorting object according to its dependencies.

## Usage

```javascript
    let sorted = sorter.sort({
        'A': {'code': 'A', 'needs': ['X', 'Z'] },
        'X': {'code': 'X', 'needs': ['Z'] },
        'B': {'code': 'B', 'needs': ['A', 'X'] },
        'Z': {'code': 'Z'},
        'C': {'code': 'C', 'needs': ['A', 'B'] },
        'Y': {'code': 'Y' }
    });

    console.log(sorted);

    // should return
    {
        'Y': {'code': 'Y' },
        'Z': {'code': 'Z'},
        'X': {'code': 'X', 'needs': ['Z'] },
        'A': {'code': 'A', 'needs': ['X', 'Z'] },
        'B': {'code': 'B', 'needs': ['A', 'X'] },
        'C': {'code': 'C', 'needs': ['A', 'B'] }
    }
```

## Test

Test module:

    `npm test`

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Ravi Vaisayawan