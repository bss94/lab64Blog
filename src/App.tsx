import {Container, Row} from 'react-bootstrap';
import Toolbar from './components/Toolbar/Toolbar';
import Blog from './containers/Blog/Blog';
import AddPost from './containers/AddPost/AddPost';
import {Route, Routes} from 'react-router-dom';
import FullPost from './components/Posts/FullPost/FullPost';
import About from './containers/About/About';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <Container>
      <Row>
        <Routes>
          <Route path="/" element={<Blog/>}>
            <Route path="/post/:id/edit" element={<AddPost/>}/>
            <Route path="/post/:id" element={<FullPost/>}/>
          </Route>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contacts" element={<div/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
      </Row>
    </Container>
  </>
);

export default App;
