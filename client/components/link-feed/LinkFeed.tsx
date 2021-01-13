import { withStyle } from 'baseui';
import React, { useEffect } from 'react';
import { useLinkFeedQuery } from '../../generated/graphql';
import { Col as Column, Grid, Row as Rows } from '../FlexBox/FlexBox';
import NoResult from '../NoResult/NoResult';
import { Wrapper } from '../Wrapper.style';
import { StyledCell, StyledTable, TableWrapper } from './LinkFeed.style';




const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

const categorySelectOptions = [
  { value: 'grocery', label: 'Grocery' },
  { value: 'women-cloths', label: 'Women Cloth' },
  { value: 'bags', label: 'Bags' },
  { value: 'makeup', label: 'Makeup' },
];


interface Props {}

const LinkFeed: React.FunctionComponent<Props> = ({ children }) => {
  if (children != undefined || null) {
    // console.log('LinkFeed.props.children:::', children);
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


    return (
      <Grid fluid={true}>
      <Row>
        <Col md={12}>
        <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) auto">
             
                {data? (
                  data.linkFeed?.length ? (
                    data.linkFeed
                    .map((item: any) => Object.values(item))
                    .map((row: any, index: any) => (
                      <React.Fragment key={index}>
                        <StyledCell>
                         
                        </StyledCell>
                        <StyledCell>{row[1]}</StyledCell>
                        <StyledCell>{row[3]}</StyledCell>
                        <StyledCell>{row[4]}</StyledCell>
                        <StyledCell>{row[5]}</StyledCell>
                      </React.Fragment>
                    ))
                ) : (
                  <NoResult
                    hideButton={false}
                    style={{
                      gridColumnStart: '1',
                      gridColumnEnd: 'one',
                    }}
                  />
                )
              ) : null}
          


              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
    )

}


  // const orderTableColumns = [
  //   {
  //     title: <FormattedMessage id="cartItems" defaultMessage="Id" />,
  //     dataIndex: 'id',
  //     align: 'right',
  //     display: 'none',
  //     // width: 10,
  //     render: (record: any) => {
  //       //
  //       // this needs something like this
  //       //  in order to get the results to point to the data object

  //       return (
  //         <ItemDetails>
  //           <ItemName> {record} </ItemName>
  //         </ItemDetails>
  //       );
  //     },
  //   },

  //   {
  //     title: <FormattedMessage id="cartItems" defaultMessage="Items" />,
  //     dataIndex: '',
  //     key: 'items',
  //     // width: 250,
  //     ellipsis: true,
  //     render: (record: any) => {
        
  //       console.log('record::', record);

  //       return (
  //         <ItemWrapper>
  //           <ItemDetails>
  //             <ItemSize>
  //               {' '}
  //               <div className="ml1 gray f11">
  //                 <VoteCarrot link={record} />
  //                 <span>
  //                   {record.description} ({record.url}){' '}
  //                 </span>{' '}
  //                 <div className="ml1 green f11">
  //                   <span>{record.votes} votes </span>
  //                   <span>posted by: {record.postedBy} </span>
  //                 </div>
  //               </div>
  //             </ItemSize>
  //           </ItemDetails>
  //         </ItemWrapper>
  //       );
  //     },
  //   },
  // ];

  

//   return (
//     <div id="results-body">
//       <OrderBox>
//         <OrderDetails columns={orderTableColumns} tableData={data?.linkFeed} />
//       </OrderBox>
//     </div>
//   );
// };



export default LinkFeed;
