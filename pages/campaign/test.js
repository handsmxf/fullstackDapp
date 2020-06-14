import React, {Component} from 'react';
import {Grid, Segment} from 'semantic-ui-react';

class TestA extends React.Component {
  render(){
    return(
      <div>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      <Grid columns='equal'>
        <Grid.Column>
          <Segment>1</Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>2</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>3</Segment>
        </Grid.Column>
      </Grid></div>
    );
  }
}
export default TestA;
