import React, { useEffect } from 'react';


import { FormattedMessage } from 'react-intl';

import { useLinkFeedQuery } from '../generated/graphql';

import {
  ItemWrapper,
  ItemName,
  ItemDetails,
  ItemSize,
  OrderBox,
} from './orders/Order.style';
import OrderDetails from './orders/OrderDetails';
import VoteCarrot from './form-controls/VoteCarrot';

interface Props {}

const LinkFeed: React.FunctionComponent<Props> = ({ children }) => {
  if (children != undefined || null) {
    console.log('LinkFeed.props.children:::', children);
  }

  const { data, refetch } = useLinkFeedQuery({
    variables: {
      limit: 20,
      skip: 0,
    },
  });


  useEffect(() => {
    let links = data?.linkFeed;

    console.log('data was rerun:::', data);
    console.log('links lenght', links?.length);
    refetch();
  }),
    [data?.linkFeed];


  const orderTableColumns = [
    {
      title: <FormattedMessage id="cartItems" defaultMessage="Id" />,
      dataIndex: 'id',
      align: 'right',
      display: 'none',
      // width: 10,
      render: (record: any) => {
        //
        // this needs something like this
        //  in order to get the results to point to the data object

        return (
          <ItemDetails>
            <ItemName> {record} </ItemName>
          </ItemDetails>
        );
      },
    },

    {
      title: <FormattedMessage id="cartItems" defaultMessage="Items" />,
      dataIndex: '',
      key: 'items',
      // width: 250,
      ellipsis: true,
      render: (record: any) => {
        
        console.log('record::', record);

        return (
          <ItemWrapper>
            <ItemDetails>
              <ItemSize>
                {' '}
                <div className="ml1 gray f11">
                  <VoteCarrot link={record} />
                  <span>
                    {record.description} ({record.url}){' '}
                  </span>{' '}
                  <div className="ml1 green f11">
                    <span>{record.votes} votes </span>
                    <span>posted by: {record.postedBy} </span>
                  </div>
                </div>
              </ItemSize>
            </ItemDetails>
          </ItemWrapper>
        );
      },
    },
  ];

  

  return (
    <div id="results-body">
      <OrderBox>
        <OrderDetails columns={orderTableColumns} tableData={data?.linkFeed} />
      </OrderBox>
    </div>
  );
};

export default LinkFeed;
