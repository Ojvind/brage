import React from 'react';
import StoryRouter from 'storybook-react-router';

import WriterListItem from '.';

export default {
  component: WriterListItem,
  title: 'WriterListItem',
  decorators: [StoryRouter({}, {
         routes: [
           { path: '/whatever', component: WriterListItem },
         ]})],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const writerData = {
  id: '555999',
  name: 'Öjvind',
  surname: 'Otterbjörk',
  homepage: 'http://ojvind.otterbjork.com',
};

export const matchData = {
  url: '/writer',
};

export const Default = () => {
  return <WriterListItem 
    writer={writerData} 
    match={matchData} 
  />;
};
