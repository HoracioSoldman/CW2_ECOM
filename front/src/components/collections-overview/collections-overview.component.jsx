import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollections } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../preview-collection/collection-preview.component';

import './collections.overview.styles.scss'

const CollectionsOverview = ({ list, title }) => (
    <div className={'collections-overview'}>
        {list.map(({ _id, ...otherCollectionProps }) => (
        <CollectionPreview key={_id} {...otherCollectionProps} />
        ))}
    </div>
)


export default CollectionsOverview