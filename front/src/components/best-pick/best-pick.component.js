import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import axios from 'axios'
import { connect } from 'react-redux';
import { SERVER_ML_URL, SERVER_URL } from '../../constant';
import CollectionPreview from '../../components/preview-collection/collection-preview.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { Link } from 'react-router-dom';

const Bestpick = ({ currentUser }) => {
    const brands_dico = [
		"air-jordan", "asics", "jordan", "converse", "new-balance", "nike", "reebok", "under-armour", "vans", "adidas"
    ]
    const categories_names = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR', 'VANS', 'ADIDAS']
	
    const [reqstate, setreqstate] = useState({info: {type: '', msg: ''}, loading: false, brandTitle: "", brand: ''})
    const [list, setlist] = useState([])

    const convert_brands_values = arr=>{
        let formatted = {}
        
        arr.forEach((val, i)=>{
            formatted[categories_names[i]] = val
        })
        return JSON.stringify(formatted)
    }

    useEffect(async() => {
        
        localStorage.setItem('redirection', '/')
  
        if(currentUser){
            //alefaaa...
            console.log('misy userject:', currentUser)
            const {country, gender, age, size, chosenCategories, whatAlreadyHas} = currentUser
            const userdata = {
                country, gender, age, mostLikedCategory: convert_brands_values(chosenCategories),
                whatAlreadyHas: convert_brands_values(whatAlreadyHas)
            }
            console.log(userdata)
            
            // axios.post(`${SERVER_ML_URL}/predict`, userdata)
            axios({
                method: 'post',
                url: `${SERVER_ML_URL}/predict`,
                headers: { 'Content-Type': 'application/json' }, 
                data: JSON.stringify(userdata)
              })
            .then(response =>{
                console.log(response.data)
                
                setreqstate({
                    ...reqstate,
                    loading: false
                });
            
            })
            .catch(error=>{
                console.error(error);
                setreqstate({
                ...reqstate,
                info: {type: 'failure', msg: 'An error has occured'},
                loading: false
                });
            })


        }else{
            let brand = brands_dico[Math.floor(Math.random() * 10)]
            setreqstate({...reqstate, brand})
        }
        
    }, [currentUser])

    useEffect(() => {
        axios.post(`${SERVER_URL}/product/branded`, {brand: reqstate.brand})
        .then(response =>{
            console.log(response.data)
            const {message, status, data, brand} = response.data

            setreqstate({
                ...reqstate,
                loading: false
            });
           
            if(status && status === 'success' && data && brand){
                let temp_list = data.filter((sh, i)=>i<4)
                setlist([...temp_list])
                setreqstate({...reqstate, brandTitle: brand})
                console.log(data)
            }else if (status && status === 'failure'){
                setreqstate({
                    ...reqstate,
                    info: {type: 'failure', msg: message},
                    loading: false
                });
            }
        })
        .catch(error=>{
            console.error(error);
            setreqstate({
              ...reqstate,
              info: {type: 'failure', msg: 'An error has occured'},
              loading: false
            });
        })
    }, [reqstate.brand])

    const sectionTitleCss = {
          fontSize: '2rem',
          fontWeight: '600',
          textAlign: 'start',
          width: '50%',
          marginBottom: '1rem'
        }

    return <div style={{width: '100%'}}>
            {
                list.length > 0 ?
                <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={sectionTitleCss}>Best pick for you</h2>
                    <p>
                        {
                            currentUser ? <Link to={`/shop/${reqstate.brand}`}>View All</Link> : 
                            <span>Please <Link to={'/signin'}>SIGN IN</Link> to see the most relevent pick for you</span>
                        }
                    </p>
                </div>
                <CollectionPreview list={list}/> 
                </>: 
                <p style={{textAlign: "center"}}>{reqstate.info.msg}</p>
            }
        </div>
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
}) 

export default connect(mapStateToProps, null)(Bestpick);

