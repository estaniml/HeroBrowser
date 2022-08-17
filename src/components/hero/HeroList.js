import { useMemo } from 'react';

import HeroCard from './HeroCard';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';

const HeroList = ({ publisher }) => {
    
    const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher])
    
    return (
        <div className='animate__animated animate__fadeIn row rows-cols-1 row-cols-md-3 g-3'>
            {
                heroes.map(  hero => ( 
                    
                    <HeroCard 
                        key={ hero.id } 
                        { ...hero }
                    />
                    
                ))
            }
    </div>
  )
}

export default HeroList