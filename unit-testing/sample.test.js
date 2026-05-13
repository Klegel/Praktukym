import * as util from './sample.js';

describe('Math functions tests', () => {

    // 1. Тести для функції abs (модуль числа)
    describe('abs function', () => {
        test('should return positive for negative number', () => {
            expect(util.abs(-15)).toBe(15);
        });
        test('should return the same for positive number', () => {
            expect(util.abs(20)).toBe(20);
        });
        test('should return 0 for 0', () => {
            expect(util.abs(0)).toBe(0);
        });
        test('should correctly parse negative string numbers', () => {
            expect(util.abs("-5")).toBe(5);
        });
        test('should return NaN for text strings', () => {
            expect(util.abs("hello")).toBeNaN();
        });
    });

    // 2. Тести для функції round (округлення)
    describe('round function', () => {
        test('should round 4.5 up to 5', () => {
            expect(util.round(4.5)).toBe(5);
        });
        test('should round 4.4 down to 4', () => {
            expect(util.round(4.4)).toBe(4);
        });
        test('should round negative -4.5 up to -4', () => {
            expect(util.round(-4.5)).toBe(-4);
        });
        test('should return 0 for null', () => {
            expect(util.round(null)).toBe(0);
        });
        test('should return NaN for undefined', () => {
            expect(util.round(undefined)).toBeNaN();
        });
    });

    // 3. Тести для функції trunc (відкидання дробової частини)
    describe('trunc function', () => {
        test('should truncate 4.9 to 4', () => {
            expect(util.trunc(4.9)).toBe(4);
        });
        test('should truncate -4.9 to -4', () => {
            expect(util.trunc(-4.9)).toBe(-4);
        });
        test('should return 0 for 0.99', () => {
            expect(util.trunc(0.99)).toBe(0);
        });
        test('should truncate string numbers correctly', () => {
            expect(util.trunc("10.75")).toBe(10);
        });
        test('should return NaN for empty object', () => {
            expect(util.trunc({})).toBeNaN();
        });
    });
});