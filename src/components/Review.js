import {
  Button,
  Comment,
  Dimmer,
  Divider,
  Form,
  Header,
  Icon,
  Input,
  Loader,
  Radio,
  Segment,
  TextArea,
} from 'semantic-ui-react';

// checkBoxes returns a star check boxes from 1 to 5 stars
const checkBoxes = (props) => {
  let cbs = [];
  for (let i = 1; i <= 5; ++i) {
    let val = i.toString();
    cbs.push(
      <Form.Field
        control={Radio}
        label={starIcons(i)}
        value={val}
        checked={props.stars === val}
        onChange={(e, { value }) => {
          props.setStars(value);
        }}
      />
    );
  }
  return cbs;
};

// DataKeyInput is a form input field for the data key
const DataKeyInput = (props) => {
  return (
    <Form.Field
      required
      control={Input}
      label="Data Key"
      placeholder="Data Key"
      value={props.dataKey}
      onChange={(e) => {
        props.setDataKey(e.target.value);
      }}
    />
  );
};

// Loading is a helper for displaying the loading spinner
const Loading = (props) => {
  return (
    <Dimmer active={props.loading}>
      <Loader active={props.loading} />
    </Dimmer>
  );
};

// SeedInput is a form input field for the seed
const SeedInput = (props) => {
  return (
    <Form.Field
      required
      control={Input}
      label="Seed"
      placeholder="Seed"
      value={props.dataKey}
      onChange={(e) => {
        props.setDataKey(e.target.value);
      }}
    />
  );
};

// startIcons is a helper to display a certain number of star icons
const starIcons = (num) => {
  let stars = [];
  for (let i = 0; i < num; ++i) {
    stars.push(<Icon name="star" />);
  }
  return stars;
};

// PostReview is the component used for posting a review
/*
TODO:
  - Add Skapp name/link
  - Add object name/link (what is being reviewed)
*/
export const PostReview = (props) => {
  return (
    <Segment>
      <Loading {...props} />
      <Header as="h4">Write a Review</Header>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group widths="equal">
          <SeedInput {...props} />
          <DataKeyInput {...props} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Name"
            placeholder="Name"
            value={props.name}
            onChange={(e) => {
              props.setName(e.target.value);
            }}
          />
          <Form.Field
            control={Input}
            label="Avatar"
            placeholder="Avatar Link"
            value={props.avatarLink}
            onChange={(e) => {
              props.setAvatarLink(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Stars</label>
          {checkBoxes(props)}
        </Form.Group>
        <Form.Field
          control={TextArea}
          label="Review"
          placeholder="Write your review..."
          onChange={(e) => {
            props.setText(e.target.value);
          }}
        />
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
      <Form onSubmit={props.handleLoad}>
        <Form.Group inline>
          <SeedInput {...props} />
          <DataKeyInput {...props} />
          <Form.Field control={Button}>Load Reviews</Form.Field>
        </Form.Group>
      </Form>
      <Divider />
      <Comment.Group>
        <Comment>
          <Comment.Avatar as="a" src={props.avatarLink} />
          <Comment.Content>
            <Comment.Author>{props.name}</Comment.Author>
            <Comment.Metadata>
              <div>Posted on: {props.data}</div>
              <div>{starIcons(parseInt(props.stars))}</div>
            </Comment.Metadata>
            <Comment.Text>{props.text}</Comment.Text>
            <Comment.Actions>
              {/* Reply should create a new review and list this review as a repliedTo field 
              https://react.semantic-ui.com/views/comment/#content-reply-form
              */}
              <Comment.Action>Reply</Comment.Action>
              {/* Save should add review to list of saved reviews */}
              <Comment.Action>Save</Comment.Action>
              {/* Hide should add review to list of hidden reviews */}
              <Comment.Action>Hide</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  );
};
