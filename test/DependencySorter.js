import {expect} from 'chai';
import DependencySorter from '../src/lib/DependencySorter';

describe('Dependency Sorter', () => {

    let sorter;

    beforeEach(() => {
        sorter = new DependencySorter;
    });

    it('should be exist.', () => {
        expect(sorter).to.be.exist;
    });

    it('should sort first level by alphabet.', () => {
        let value = {'A': 'a', 'C': 'c', 'B': 'b'};
        let result = Object.keys(sorter.sort(value));
        
        expect(result[0]).to.equals('A');
        expect(result[1]).to.equals('B');
        expect(result[2]).to.equals('C');
    });

    it('should just sort if passing object is already an array', () => {
        let value = ['A', 'C', 'B'];
        let result = sorter.sort(value);
        
        expect(result[0]).to.equals('A');
        expect(result[1]).to.equals('B');
        expect(result[2]).to.equals('C');
    });

    it('should do nothing if passing object is primetive.', () => {
        expect(sorter.sort('string')).to.equals('string');
        expect(sorter.sort(true)).to.equals(true);
        expect(sorter.sort(123)).to.equals(123);
    });

    it('should sort first level according to second level value', () => {
        let value1 = {'B': { 'needs': ['A'] }, 'A': 'a'};
        let value2 = {'B': { 'needs': ['A'] }, 'A': 'a', 'C': { 'needs': ['B'] }};
        let value3 = {'A': 'a', 'B': { 'needs': ['C'] }, 'C': { 'needs': ['A'] }};
        
        let result1 = Object.keys(sorter.sort(value1));
        expect(result1[0], 'result1').to.equals('A');
        expect(result1[1], 'result1').to.equals('B');

        let result2 = Object.keys(sorter.sort(value2));
        expect(result2[0], 'result2').to.equals('A');
        expect(result2[1], 'result2').to.equals('B');
        expect(result2[2], 'result2').to.equals('C');
       
        let result3 = Object.keys(sorter.sort(value3));
        expect(result3[0], 'result3').to.equals('A');
        expect(result3[1], 'result3').to.equals('C');
        expect(result3[2], 'result3').to.equals('B');
    });

    it('should be able to sort multiple dependencies.', () => {
        let value1 = {'B': { 'needs': ['C' ,'A'] }, 'C': { 'needs': ['A'] }, 'A': 'a'};
        let value2 = {'B': { 'needs': ['A' ,'C'] }, 'C': { 'needs': ['A'] }, 'A': { 'needs': ['D'] }, 'D': 'd'};
        
        let result1 = Object.keys(sorter.sort(value1));
        expect(result1[0], 'result1').to.equals('A');
        expect(result1[1], 'result1').to.equals('C');
        expect(result1[2], 'result1').to.equals('B');

        let result2 = Object.keys(sorter.sort(value2));
        expect(result2[0], 'result2').to.equals('D');
        expect(result2[1], 'result2').to.equals('A');
        expect(result2[2], 'result2').to.equals('C');
        expect(result2[3], 'result2').to.equals('B');
    });

    it('should sort a complex dependencies.', () => {
        let value = {
            'A': {'code': 'A', 'dep': ['X', 'Z'] },
            'X': {'code': 'X', 'dep': ['Z'] },
            'B': {'code': 'B', 'dep': ['A', 'X'] },
            'Z': {'code': 'Z'},
            'C': {'code': 'C', 'dep': ['A', 'B'] },
            'Y': {'code': 'Y' }
        };
        let result = Object.keys(sorter.sort(value, 'dep'));
        
        expect(result[0]).to.equals('Y');
        expect(result[1]).to.equals('Z');
        expect(result[2]).to.equals('X');
        expect(result[3]).to.equals('A');
        expect(result[4]).to.equals('B');
        expect(result[5]).to.equals('C');
    });
});
