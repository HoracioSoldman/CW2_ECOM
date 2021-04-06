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
    const reversed_brands = {
		"Air Jordan":"air-jordan",
		"adidas":"adidas",
		"ASICS":"asics",
		"Jordan": "jordan" ,
		"Converse": "converse",
		"New Balance": "new-balance",
		"Nike": "nike",
		"Reebok": "reebok",
		"Under Armour": "under-armour",
		"Vans": "vans"
	}
    const categories_names = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR', 'VANS', 'ADIDAS']
	
    const [reqstate, setreqstate] = useState({info: {type: '', msg: ''}, loading: false, brandTitle: "", brand: '', recommended: false})
    const [list, setlist] = useState([])
    
    useEffect(() => {
        
        localStorage.setItem('redirection', '/')
  
        if(currentUser && !reqstate.recommended){
            //go...
            console.log('misy userject:', currentUser)
            const {email} = currentUser
            
            axios.post(`${SERVER_URL}/users/recommend`, {email})
            .then(response =>{
                console.log(response.data)
                const {message, status, data, brand} = response.data

                setreqstate({
                    ...reqstate, brand,
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


        }else{
            let brand = brands_dico[Math.floor(Math.random() * 10)]
            setreqstate({...reqstate, brand})
        }
        
    }, [currentUser])

    useEffect(() => {
        if(list.length > 0) return;
        axios.post(`${SERVER_URL}/product/branded`, {brand: reqstate.brand})
        .then(response =>{
            console.log(response.data)
            const {message, status, data, brand} = response.data

            setreqstate({
                ...reqstate, brand,
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
                            currentUser ? reqstate.brand ? <Link to={`/shop/${reversed_brands[reqstate.brand]}`}>View All</Link> : <span></span>
                            : <span>Please <Link to={'/signin'}>SIGN IN</Link> to see the most relevent pick for you</span>
                        }
                    </p>
                </div>
                <CollectionPreview list={list}/> 
                </>: 
                <p style={{textAlign: "center"}}></p>
            }
        </div>
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
}) 

export default connect(mapStateToProps, null)(Bestpick);

