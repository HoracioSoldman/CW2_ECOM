import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import axios from 'axios'
import { SERVER_URL } from '../../constant';
import CollectionPreview from '../../components/preview-collection/collection-preview.component';

const ShopPage = ({  }) => {
    const {brand} = useParams();
    const [reqstate, setreqstate] = useState({info: {type: '', msg: ''}, loading: false, brandTitle: ""})
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.post(`${SERVER_URL}/product/branded`, {brand})
        .then(response =>{
            console.log(response.data)
            const {message, status, data, brand} = response.data

            setreqstate({
                ...reqstate,
                loading: false
            });
           
            if(status && status === 'success' && data && brand){
                setlist([...data])
                setreqstate({...reqstate, brandTitle: brand})
                console.log(data)
            }else if (status && status === 'failure'){
                this.setState({
                    ...this.state,
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
    }, [])

    return <div className='shop-page'>
            {
                list.length > 0 ?
                <CollectionPreview title={reqstate.brandTitle} list={list}/> : 
                <p style={{textAlign: "center"}}>{reqstate.info.msg}</p>
            }
        </div>
}

export default ShopPage;