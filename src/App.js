import { useState } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import { ReviewForm, ViewReview, ViewReviewHeader } from './components/Review';
import { PostReview, ViewReviews } from './components/ReviewHandler.ts';

let reviews = [];

// TODO: Publish components as a package

function App() {
  // User State
  const [dataKey, setDataKey] = useState('');
  const [seed, setSeed] = useState('');

  // Review State
  //
  // TODO: can this be replace with a state of type Review?
  const [avatarLink, setAvatarLink] = useState('');
  const [date, setDate] = useState(null);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [skapp, setSkapp] = useState('');
  const [stars, setStars] = useState('');
  const [text, setText] = useState('');

  // App State
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // App handlers
  //
  // handleSubmit is the main handler for the review form being submitted
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let d = new Date();
    setDate(d.toDateString());

    // Print out state
    try {
      await PostReview(
        {
          avatarLink: avatarLink,
          date: d.toDateString(),
          id: id,
          name: name,
          skapp: skapp,
          stars: stars,
          text: text,
        },
        dataKey,
        seed
      );
    } catch (error) {
      console.log('error from handleSubmit', error);
    }
    setLoading(false);
  };

  // handleSelectTab handles switching views
  const handleSelectTab = (e, { activeIndex }) => {
    setActiveTab(activeIndex);
  };

  //handleLoad handles loading the users data
  const handleLoad = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await ViewReviews(dataKey, seed);
      reviews = data;
      console.log(data);
    } catch (error) {
      console.log('error from handleLoad', error);
    }
    setLoading(false);
  };

  // Hide should add review to list of hidden reviews
  const handleHide = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('TODO: handle hide');
    setLoading(false);
  };
  //  Reply should create a new review and list this review as a repliedTo field
  //         https://react.semantic-ui.com/views/comment/#content-reply-form
  const handleReply = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('TODO: handle reply');
    setLoading(false);
  };
  // Save should add review to list of saved reviews
  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('TODO: handle save');
    setLoading(false);
  };

  // TODO: add handle Delete

  // define args passed to the review form
  // TODO: Break down props to individual needs
  const formProps = {
    // User State
    avatarLink,
    setAvatarLink,
    dataKey,
    setDataKey,
    date,
    setDate,
    id,
    setID,
    name,
    setName,
    seed,
    setSeed,
    skapp,
    setSkapp,
    stars,
    setStars,
    text,
    setText,

    // App State
    loading,

    // App handles
    handleHide,
    handleLoad,
    handleReply,
    handleSave,
    handleSubmit,
  };

  const viewReviews = () => {
    if (!reviews) {
      return;
    }
    let views = [];
    reviews.forEach((review) => {
      // TODO: need better UID for key
      views.push(<ViewReview key={views.length} {...review} />);
    });
    return views;
  };

  const panes = [
    {
      menuItem: 'Write a Review',
      render: () => (
        <Tab.Pane>
          <ReviewForm {...formProps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'View Reviews',
      render: () => (
        <Tab.Pane>
          <ViewReviewHeader {...formProps} />
          {viewReviews()}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container style={{ paddingTop: '1em' }}>
      <Header
        as="h1"
        content="Skynet Reviews"
        textAlign="center"
        style={{ marginTop: '1em', marginBottom: '1em' }}
      />
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
        onTabChange={handleSelectTab}
        activeIndex={activeTab}
      />
    </Container>
  );
}

export default App;
