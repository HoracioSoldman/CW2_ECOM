import {shallow} from 'enzyme'
import { Bestpick } from '../../components/best-pick/best-pick.component'

describe('Best pick component: recommendation', ()=>{
    it('checks that the component renders correctly', ()=>{
        const wrapper= shallow(<Bestpick brand={'adidas'}/>)
        
        expect(wrapper.exists()).toBe(true)

        expect(wrapper.contains('Nothing to show')).toBe(true)        
    })
})