import { mount } from "enzyme";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import Navbar from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('testing <Navbar />', () => { 

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Pedro',
            logged: true
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should show itself correctly', () => {   
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');
    });

    test('should call the logout, the navigate and dispatch with their arguments', () => { 

        wrapper.find('button').prop('onClick')();
        
        expect( contextValue.dispatch).toHaveBeenCalledWith({'type': types.logout});
        expect( mockNavigate).toHaveBeenCalledWith('/login', {"replace": true})

    });

})