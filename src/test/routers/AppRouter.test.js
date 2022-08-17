import AppRouter from "../../routers/AppRouter"
import { mount } from "enzyme"
import { AuthContext } from "../../auth/authContext";

describe('tests in <AppRouter />', () => { 

    const contextValue = {
        user: {
            logged: false
        }
    }

    test('should show the login if nobody is autenticate', () => { 

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />    
            </AuthContext.Provider>
        )

       expect(wrapper).toMatchSnapshot();
       expect(wrapper.find('h1').text().trim()).toBe('Iniciar Sesion')

    });    

    test('should show the marvel comp if somebody is autenticated', () => { 

        const contextValue = {
            user: {
                logged: true,
                name: 'pepe'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />    
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();

    });    

})