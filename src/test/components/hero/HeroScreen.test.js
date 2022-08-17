import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HeroScreen from '../../../components/hero/HeroScreen'

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('testing <HeroScreen />', () => { 

    test('shouldnt show the heroScreen if we dont have a hero in our url', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No Hero Page</h1> } />
                </Routes>    
            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
    });

    test('should show a hero if the parameter exists', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No Hero Page</h1> } />
                </Routes>    
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists()).toBe(true)
    });

    test('should return to the previous screen', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen />} />
                </Routes>    
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    });

    test('should show the No Hero Page if we dont have a hero', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123123132']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No Hero Page</h1> } />
                </Routes>    
            </MemoryRouter>
        );

        expect( wrapper.text()).toBe('No Hero Page');
    });
})