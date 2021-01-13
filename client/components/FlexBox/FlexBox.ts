import { styled } from 'baseui';
import { Col as Cols, Grid as Grids, Row as Rows } from 'react-flexbox-grid/dist/react-flexbox-grid';

// export const Grid = styled(Grids, ({ $theme }) => ({
//   &.container,
//   &.container-fluid {
//     padding: 0 15px;
//   }
// }));

export const Grid = styled(Grids, () => ({}));

export const Row = styled(Rows, () => ({
  margin: '0 -15px 30px',

  ':last-child': {
    marginBottom: '0px',
  },
}));

export const Col = styled(Cols, () => ({
  padding: '0 15px',
}));
