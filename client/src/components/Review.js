import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Header,
  Image,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';

// Review is a form for submitting reviews
const Review = (props) => {
  return (
    <>
      <Segment>
        <Dimmer active={props.loading}>
          <Loader active={props.loading} />
        </Dimmer>

        {props.activeTab === 0 && (
          <Form onSubmit={props.handleSubmit}>
            <>
              <Header as="h4">Write a Review</Header>
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
            </>
            <Divider />
            <Button variant="success" type="submit">
              Post Review
            </Button>
          </Form>
        )}
        {props.activeTab === 1 && (
          <>
            <Header as="h4">Reviews</Header>
            <p>{props.name}</p>
          </>
        )}
      </Segment>
    </>
  );
};

export default Review;
