import '@testing-library/jest-dom'
import {Header} from '../../components/header/header.component'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

const mockStore= configureStore([])

describe('Header component', ()=>{
    it('should shallow render the header with the menu', ()=>{

        const wrapper = shallow(<Header />)

        expect(wrapper.exists()).toBe(true)
        
        expect(wrapper.find('.option')).toHaveLength(3)
        
        expect(wrapper.contains('SIGN IN')).toEqual(true)
    })

})
