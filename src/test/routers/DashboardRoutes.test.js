import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import DashboardRoutes from "../../routers/DashboardRoutes";


describe('tests in <DashboardRoutes', () => { 
    
    const contextValue = {
        user: {
            logged: true,
            name: 'Joao Da Silva'
        }
    };

    test('should show itself correctly - marvel', () => { 

        const wrapper = mount(

            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
                
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Joao Da Silva')
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen')

    });

    test('should show itself correctly - dc', () => { 

        const wrapper = mount(

            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
                
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DcScreen')

    });
})