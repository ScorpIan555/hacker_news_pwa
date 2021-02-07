import Link from 'next/link';
import { withRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';

type NavLinkProps = {
  router: any;
  href: string;
  label: string;
  intlId?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  onClick?: () => void;
};

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabLink = styled.span`
  justify-content: flex-end
` 

const NavLink: React.SFC<NavLinkProps> = ({
  href,
  label,
  // intlId,
  router,
  icon,
  className,
  onClick,
  iconClass,
}) => {
  const isCurrentPath = router.pathname === href || router.asPath === href;
  return (
    <TabLink onClick={onClick} className={className ? className : ''}>
      <Link href={href}>
        <a
          className={isCurrentPath ? ' current-page' : ''}
          style={{ display: 'flex', alignItems: 'right', color: '' }} // pull in the theme here
        >
          {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

          <span className="label">{label}</span>
        </a>
      </Link>
    </TabLink>
  );
};

export default withRouter(NavLink);
