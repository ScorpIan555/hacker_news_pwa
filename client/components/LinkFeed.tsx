import React, { useEffect } from 'react';
// import Table from 'rc-table';

import { FormattedMessage } from 'react-intl';

import { useLinksQuery } from '../generated/graphql';
import { IItem } from '../lib/typescript/interfaces';
import {
  ItemWrapper,
  ItemName,
  ItemDetails,
  ItemSize,
  ItemPrice,
  // ImageWrapper,
  OrderBox,
} from './orders/Order.style';
import OrderDetails from './orders/OrderDetails';
import VoteCarrot from './form-controls/VoteCarrot';

interface Props {}

const LinkFeed: React.FunctionComponent<Props> = ({ children }) => {
  if (children != undefined || null) {
    console.log('LinkFeed.props.children:::', children);
  }

  const { data, loading, refetch } = useLinksQuery();

  useEffect(() => {
    let links = data?.links;
    console.log('data was rerun:::', data);
    console.log('links lenght', links?.length);
    refetch();
  }),
    [data?.links];

  let body = <div></div>;

  if (loading) {
    body = <div>Loading....</div>;
  } else if (data) {
    let dataLinks: Array<object> = data.links;
    body = (
      <div>
        {dataLinks.map<object>(
          (item: IItem): React.ReactElement<IItem> => {
            // item.key = `key-${id}`;
            // console.log('item:::', item);

            return (
              <ItemWrapper>
                <ItemDetails>
                  {/* <li key={`key + ${item.id}`}>
                  <p>{item.id}</p>
                  <p>{item.url}</p>
                  <p>{item.description}</p>
                  <p>{item.postedBy} </p>
                </li> */}
                  <ItemName>{item.id}</ItemName>
                  <ItemSize>{item.url}</ItemSize>
                  <ItemPrice>{item.description}</ItemPrice>
                </ItemDetails>
              </ItemWrapper>
            );
          }
        )}
      </div>
    );
  } else {
    body = <div>No links available</div>;
  }

  // const columns: any = [
  //   {
  //     dataIndex: '',
  //     ellipsis: true,
  //     key: 'items',
  //   },
  // ];

  // console.log('body:', body);
  // console.log('type of data:::', data);

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
        //let dataLinks: Array<object> = data.links;

        // console.log('record::', record);

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
        // console.log('text:::', typeof text, text);
        // console.log('record::', record);
        // console.log('foo::', foo);
        // console.log('bar:::', bar);

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

  // console.log('boddy:', body);

  return (
    <div id="results-body">
      <OrderBox>
        <OrderDetails columns={orderTableColumns} tableData={data?.links} />
      </OrderBox>
      <div id="body-only-method">{body}</div>
    </div>
  );
};

export default LinkFeed;
