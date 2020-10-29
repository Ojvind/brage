import React from 'react';
// import StoryRouter from 'storybook-react-router';

import Input from './index';

export default {
  component: Input,
  title: 'Input',
  // decorators: [StoryRouter({}, {
  //        routes: [
  //          { path: '/whatever', component: WriterListItem },
  //        ]})],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return <Input/>;
};

export const WithLabel = () => {
  return <Input 
      inputLabel="Name"/>;
};
