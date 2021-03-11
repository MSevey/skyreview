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

// TODO: Update to typescript

// checkBoxes returns a star check boxes from 1 to 5 stars
const checkBoxes = (props) => {
  let cbs = [];
  for (let i = 1; i <= 5; ++i) {
    let val = i.toString();
    cbs.push(
      <Form.Field
        key={val}
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
      value={props.seed}
      onChange={(e) => {
        props.setSeed(e.target.value);
      }}
    />
  );
};

// startIcons is a helper to display a certain number of star icons
const starIcons = (num) => {
  let stars = [];
  for (let i = 0; i < num; ++i) {
    stars.push(<Icon key={i.toString()} name="star" />);
  }
  return stars;
};

// ReviewForm is the form component used for posting a review
/*
TODO:
  - Add Skapp name/link
  - Add object name/link (what is being reviewed)
*/
export const ReviewForm = (props) => {
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
            label="Skapp"
            placeholder="Skapp"
            value={props.skapp}
            onChange={(e) => {
              props.setSkapp(e.target.value);
            }}
          />
          <Form.Field
            required
            control={Input}
            label="Review ID"
            placeholder="ID"
            value={props.id}
            onChange={(e) => {
              props.setID(e.target.value);
            }}
          />
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
          value={props.text}
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
      <Comment.Group>
        <Comment>
          <Comment.Avatar as="a" src={props.avatarLink} />
          <Comment.Content>
            <Comment.Author>{props.name}</Comment.Author>
            <Comment.Metadata>
              <div>Posted on: {props.date}</div>
              <div>{starIcons(parseInt(props.stars))}</div>
            </Comment.Metadata>
            <Comment.Text>{props.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={props.handleReply}>Reply</Comment.Action>
              <Comment.Action onClick={props.handleSave}>Save</Comment.Action>
              <Comment.Action onClick={props.handleHide}>Hide</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  );
};

export const ViewReviewHeader = (props) => {
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
    </Segment>
  );
};
