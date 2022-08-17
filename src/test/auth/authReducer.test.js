import authReducer from "../../auth/authReducer"
import { types } from "../../types/types"


describe('tests in authReducer', () => { 

    test('should return the default state', () => { 

        const state = authReducer( {logged: false}, {});

        expect( state ).toEqual({ logged: false })

    })

    test('should autenticate and put the name of the user', () => { 

        const action = {
            type: types.login,
            payload: {
                name: 'Estanislao'
            }
        }

        const state = authReducer( {logged: false}, action);

        expect(state).toEqual({
            logged: true,
            name: 'Estanislao'
        })


    })

    test('should delete the username and logged to false', () => { 

        const action = {
            type: types.logout
        };

        const state = authReducer( {logged: true}, action);
        expect(state).toEqual({ logged: false })

    })
})