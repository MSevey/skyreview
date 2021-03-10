import { useState } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import { PostReview, ViewReview } from './components/Review';
// Import Web Assembly
//
// Satisfy eslint
/*global Go, SayHello*/
const go = new Go();

WebAssembly.instantiateStreaming(fetch('main.wasm'), go.importObject).then(
  (result) => {
    go.run(result.instance);
  }
);

function App() {
  // App State
  const [copied, setCopied] = useState(false);
  const [dataKey, setDataKey] = useState('');
  const [registryURI, setRegistryURI] = useState('');
  const [seed, setSeed] = useState('');
  const [skylink, setSkylink] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    SayHello();
  };

  // handleSelectTab handles switching views
  const handleSelectTab = (e, { activeIndex }) => {
    setActiveTab(activeIndex);
  };

  // define args passed to the review form
  const formProps = {
    handleSubmit,
    name,
    seed,
    dataKey,
    setDataKey,
    setName,
    setSeed,
    activeTab,
    loading,
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
