import {RegexBasedFieldValidator} from "../../Services/DefaultImplementation/RegexBasedFieldValidator";

describe('RegexBasedFieldValidator', function () {
    it('should return true when pattern is empty or undefined or null', function () {
        const validator = new RegexBasedFieldValidator();
        expect(validator.validate('value' , '')).toEqual(true);
        expect(validator.validate('value' , null)).toEqual(true);
        expect(validator.validate('value' , undefined)).toEqual(true);
    });

    it('should validate using regex', function () {
        const validator = new RegexBasedFieldValidator();
        expect(validator.validate('123' , '^[0-9]{1,4}$')).toEqual(true);
        expect(validator.validate('12345' , '^([0-9]{1,4})?$')).toEqual(false);
    });

    it('should use empty string when value is null or undefined', function () {
        const validator = new RegexBasedFieldValidator();
        expect(validator.validate(undefined , '^([0-9]{1,4})?$')).toEqual(true);
        expect(validator.validate(null , '^([0-9]{1,4})?$')).toEqual(true);
    });
});