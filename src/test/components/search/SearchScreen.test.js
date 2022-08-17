import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom";
import SearchScreen from "../../../components/search/SearchScreen"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('test in <SearchScreen', () => { 

    test('should show the component', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>    
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un heroe');

    });

    test('should show Batman and the input with the queryString value', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>    
        );

        expect(wrapper.find('input').prop('value')).toBe('batman')

    });

    test('should show batman123', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>    
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados sobre: batman123');
    });


    test('should call the navigate in the new screen', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>    
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
    })

});