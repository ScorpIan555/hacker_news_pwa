import styled from 'styled-components';
import Link from 'next/link';

export const HeaderContainer = styled.div`
  height: 7rem;
  width: 100%; 
  display: flex;
  
  

  .container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
  }

  .item {
    flex-basis: 5rem;
  }

  @media screen and (max-width: 800px) {
    height: 6rem;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

OptionLink.displayName = 'OptionLink';

/*
<style jsx>{`
          // component
          // background-color: blue;
          color: black;
          width: 100%;
          height: 50px;

          // flex: 1;
          // flex-direction: column

          // classes
          .container {
            display: flex;
            margin-bottom: 2rem;
          }

          #page-header {
            margin-bottom: 5rem;
          }

          .item {
            flex-basis: ;
          }

          .login {
            order: 0;
            align-self: flex-end;
            width: 20%;
          }
        `}</style>
*/
