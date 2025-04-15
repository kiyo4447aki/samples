import React from 'react';
import Wrapper from '../Wrapper';
import Contact from './buttons/contact/Contact';
import HomePage from './buttons/contact/HomePage';
import Instagram from './buttons/contact/Instagram';
import Review from './buttons/contact/Review';
import Share from './buttons/contact/Share';
import X from './buttons/contact/X';
import EraseAll from './buttons/EraseAll';
import Notification from './buttons/notification/Notification';
import NotificationConfig from './buttons/notification/NotificationConfig';
import NotificationTime from './buttons/notification/NotificationTime';
import TimeDayStart from './buttons/TimeDayStart';
import GroupWrapper from './GroupWrapper';

const MainContent = () => {
  return (
    <Wrapper>
      <GroupWrapper>
        <Notification />
        <NotificationTime />
        <NotificationConfig />
      </GroupWrapper>
      <GroupWrapper>
        <TimeDayStart />
      </GroupWrapper>
      <GroupWrapper>
        <Review />
        <Contact />
        <Share />
        <X />
        <Instagram />
        <HomePage />
      </GroupWrapper>
      <GroupWrapper>
        <EraseAll />
      </GroupWrapper>
    </Wrapper>
  );
};

export default MainContent;
