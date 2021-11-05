import {rootReducerInitialState} from "../../../Data/Reducer/RootReducer";
import {SetupActions} from "../../../Data/Actions/Setup/SetupActions";
import {FieldState} from "../../../Data/Types/FieldState";
import {setupReducer} from "../../../Data/Reducer/SetupReducer";
import {buildMockField} from "../../TestHelpers";
import {RootState} from "../../../Data/Types/RootState";

describe('SetupReducer', () => {

    it('should initialize field', function () {
        let state: RootState = rootReducerInitialState;
        const fieldName = 'test';
        const field: FieldState = buildMockField({name: fieldName});
        const action = SetupActions.initializeField(fieldName, field);
        state = setupReducer(state, action);
        const newField = state.fields[fieldName];
        expect(newField).toBeTruthy();
        expect(newField).toEqual(field);
    });

});