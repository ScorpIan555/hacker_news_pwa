import { Container, Link, List, ListItem, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { themeGet } from '@styled-system/theme-get';
import VoteCarrot from 'components/form-controls/VoteCarrot';
import LinkSubRow from 'components/LinkSubRow';
import { useAuthState } from 'lib/store/contexts';
import { ILink } from 'lib/typescript/interfaces';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLinkFeedQuery } from '../../generated/graphql';

// const StyledGrid = styled.button`
//   /* ... */
// `;

// const Col = withStyle(Column, () => ({
//   '@media only screen and (max-width: 767px)': {
//     marginBottom: '20px',

//     ':last-child': {
//       marginBottom: 0,
//     },
//   },
// }));

// const Row = withStyle(Rows, () => ({
//   '@media only screen and (min-width: 768px)': {
//     alignItems: 'center',
//   },
// }));

// const categorySelectOptions = [
//   { value: 'grocery', label: 'Grocery' },
//   { value: 'women-cloths', label: 'Women Cloth' },
//   { value: 'bags', label: 'Bags' },
//   { value: 'makeup', label: 'Makeup' },
// ];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // display: 'safe',
      // backgroundColor: theme.palette.primary.light
      // display: 'flex',
      // justifyContent: 'flex-end',
    },
    // toolbar: {
    //   // display: 'flex',
    //   flexWrap: 'wrap',
    //   // backgroundColor: theme.palette.background.paper,
    //   // color: theme.palette.info.contrastText,
    // },
    menuButton: {
      // not in use
      marginRight: theme.spacing(2),
      color: 'red',
    },
    urlText: {
      color: 'grey',
    },
    // title: {
    //   marginLeft: '.1rem',
    // },

    // logoutButton: {
    //   // color: 'default',
    //   // flex: 'flex-end',
    //   // alignSelf: 'flex-end',
    // },
    loginLogoutButton: {
      // justifyContent: 'flex-end',
      // justifySelf: 'flex-end',
      position: 'absolute',
      right: '0',
      // color: theme.palette.info.main,
    },
  })
);

const LinkDescription = styled.span`
  font-size: ${themeGet('fontSizes.2', '15')}px;
  font-weight: ${themeGet('fontWeights.6', '400')};
  color: ${themeGet('colors.darkBold', '#0D1136')};
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;

  text-align: center;
`;

const UrlText = styled.span`
  margin-left: 10px;
  font-size: ${themeGet('fontSizes.2', '12')}px;
`;

const StyledLink = styled(Link)`
  color: orange;
`;

const TitleRow = styled.div`
  font-family: 'Lato', sans-serif;
  color: #828282;
`;

const DataRow = ({ item, index }: { item: ILink; index: number }) => {
  // console.log('DataRow.item:::', item);

  const { id, url, description, postedBy, votes, createdAt, domain } = item;
  const { authStateContext } = useAuthState();
  const { user } = authStateContext;
  let linksArray: number[] = [];
  let hiddenLinksArray = [];
  if (user !== null || undefined) {
    linksArray = user?.linksArray;
    hiddenLinksArray = user?.hiddenLinksArray;
  }

  const hoursAgo = moment(createdAt).startOf('hour').fromNow();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className="" elevation={0}>
          <TitleRow>
            {index + 1}
            {'.'}
            {linksArray?.includes(id) ? (
              <a style={{ visibility: 'hidden' }}> ▲ </a>
            ) : (
              <VoteCarrot link={item} />
            )}

            {/* <Typography> */}
            <LinkDescription>{description}</LinkDescription>
            <UrlText>
              {'('}
              <StyledLink underline="hover" href={url}>
                {domain}
              </StyledLink>
              {')'}
            </UrlText>
            {/* </Typography> */}
          </TitleRow>
          <LinkSubRow
            votes={votes}
            postedBy={postedBy}
            hoursAgo={hoursAgo}
            linksArray={linksArray}
            hiddenLinksArray={hiddenLinksArray}
            linkId={id}
          />
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

interface Props {}

const LinkFeed: React.FunctionComponent<Props> = ({ children }) => {
  // const [isFocus, setIsFocus] = useState(false); // might not be needed
  const theme = useTheme();
  const styles = useStyles(theme);
  const { authStateContext } = useAuthState();

  // export interface IHiddenLinksArray {}

  // const [hiddenLinksArray, setHiddenLinksArray] = useState<IHiddenLinksArray>([]);
  const [hiddenLinksArray, setHiddenLinksArray] = useState<Array<number>>([]);
  // const [linkList, setLinkList] = useState<Array<number>>([]);
  // let linksArray = [];

  if (children !== undefined || null) {
    // console.log('LinkFeed.props.children:::', children);
  }

  // const { data, refetch }: { data: any; refetch: any } = useLinkFeedQuery({
  const { data, refetch } = useLinkFeedQuery({
    variables: {
      limit: 20,
      skip: 0,
    },
  });

  useEffect(() => {
    const { user } = authStateContext;
    // let filteredLinkList: number[] = [];
    if (user !== null || undefined) {
      // linksArray = user?.linksArray;
      console.log('setHiddenLinksArray::', user.hiddenLinksArray);
      setHiddenLinksArray(user.hiddenLinksArray);
    }

    refetch();
  }),
    [data?.linkFeed];

  // const handleMouseOver = (event: Event) => {
  //   event.preventDefault()
  //   // console.log('handleMouseOver:::', isFocus)

  //   setIsFocus(!isFocus)
  // }

  // if (hiddenLinksArray?.includes(item.id)) {
  //   console.log('item.id::', item.id);
  //   return null;
  // } else {}

  return (
    <Container className={styles.root}>
      <Grid container direction="row">
        <List>
          {data ? (
            data.linkFeed?.length ? (
              // let filteredLinkFeed = data.linkFeed

              data.linkFeed
                .filter((link) => !hiddenLinksArray?.includes(link?.id))
                .map((item: ILink, index: number) => {
                  // console.log('item:::', item)
                  // console.log('index::', index)
                  // const { id, url, description, postedBy, votes } = item;

                  return (
                    // <DataRow index={index} item={item} />

                    // <ListItem item={item} index={index} >{id} {' '}  {description} {' '} {postedBy} {' '} {votes}</ListItem>
                    <ListItem
                      key={index + index * index}
                      alignItems={'flex-start'}
                      // autoFocus={isFocus}   // look into deleting if I'mnot going to use this
                      // onMouseOver={handleMouseOver}
                    >
                      <DataRow item={item} index={index} />
                    </ListItem>
                  );
                })
            ) : (
              <div> </div>
            )
          ) : (
            <div></div>
          )}
        </List>
      </Grid>
    </Container>
  );
};

export default LinkFeed;
