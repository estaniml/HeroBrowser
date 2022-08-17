import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import LoginScreen from "../../../components/login/LoginScreen"
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('testing <LoginScreen />', () => { 

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='/login' element={<LoginScreen />}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
    )

    test('should match with the snapshot', () => { 

        expect(wrapper).toMatchSnapshot();

    })

    test('should do dispatch and navigate', () => { 

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: 'Estanislao' }
        });

        expect(mockNavigate).toHaveBeenCalledWith('/marvel', { replace: true });

        localStorage.setItem('lastPath', '/dc')

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace:true})
    })
})