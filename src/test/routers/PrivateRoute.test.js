import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import PrivateRoute from "../../routers/PrivateRoute";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aquí</span>
}))

describe('Testing <PrivateRoute />', () => { 

    Storage.prototype.setItem = jest.fn();

    test('should show the component if someone is logged and save it in localStorage', () => { 

        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>    
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Private component');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    });

    test('should block the component if someone is logged out.', () => { 

        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>    
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Saliendo de aquí');

    });

});