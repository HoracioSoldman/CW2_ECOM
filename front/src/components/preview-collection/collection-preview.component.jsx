import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, list }) => (
    <div className={'collections-overview'}>
        <div className='collection-preview' >
            {
                title && <h1 className='title'>{title.toUpperCase()}</h1>
            }
            <div className='preview'>
                {list.map((item) => (
                    <CollectionItem key={item._id} item={item} className="collection-item"/>
                ))}
            </div>
        </div>
    </div>
)

export default CollectionPreview