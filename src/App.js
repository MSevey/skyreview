import { useState } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import { PostReview, ViewReview } from './components/Review';

function App() {
  // User State
  const [avatarLink, setAvatarLink] = useState('');
  const [dataKey, setDataKey] = useState('');
  const [date, setDate] = useState(null);
  const [name, setName] = useState('');
  const [seed, setSeed] = useState('');
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
    setDate(d);

    // Print out state
    console.log('avatarLink:', avatarLink);
    console.log('dataKey:', dataKey);
    console.log('date:', d);
    console.log('name:', name);
    console.log('seed:', seed);
    console.log('stars:', stars);
    console.log('text:', text);

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

    setLoading(false);
  };

  // define args passed to the review form
  const formProps = {
    // User State
    avatarLink,
    setAvatarLink,
    dataKey,
    setDataKey,
    date,
    setDate,
    name,
    setName,
    seed,
    setSeed,
    stars,
    setStars,
    text,
    setText,

    // App State
    loading,

    // App handles
    handleLoad,
    handleSubmit,
  };
  const panes = [
    {
      menuItem: 'Write a Review',
      render: () => (
        <Tab.Pane>
          <PostReview {...formProps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'View Reviews',
      render: () => (
        <Tab.Pane>
          <ViewReview {...formProps} />
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
