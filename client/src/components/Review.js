import { useState, useEffect } from 'react';
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';

const Loading = (props) => {
  return (
    <Dimmer active={props.loading}>
      <Loader active={props.loading} />
    </Dimmer>
  );
};
// PostReview is the component used for posting a review
export const PostReview = (props) => {
  return (
    <Segment>
      <Loading />
      <Header as="h4">Write a Review</Header>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Input
            label="Seed"
            placeholder="Enter your seed"
            value={props.seed}
            onChange={(e) => {
              props.setSeed(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Name"
            placeholder="Enter your name"
            value={props.name}
            onChange={(e) => {
              props.setName(e.target.value);
            }}
          />
        </Form.Group>
        <Divider />
        <Button variant="success" type="submit">
          Post Review
        </Button>
      </Form>
    </Segment>
  );
};

// ViewReview is the component used for viewing a review
export const ViewReview = (props) => {
  return (
    <Segment>
      <Loading {...props} />
      <Header as="h4">Reviews</Header>
      <Comment.Group>
        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
          />
          <Comment.Content>
            <Comment.Author>Tom Lukic</Comment.Author>
            <Comment.Metadata>
              <div>2 days ago</div>
              <div>
                <Icon name="star" />5 Faves
              </div>
            </Comment.Metadata>
            <Comment.Text>
              This will be great for business reports. I will definitely
              download this.
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              <Comment.Action>Save</Comment.Action>
              <Comment.Action>Hide</Comment.Action>
              <Comment.Action>
                <Icon name="expand" />
                Full-screen
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  );
};
