import {Container} from 'react-bootstrap';
import Toolbar from './components/Toolbar/Toolbar';
import Blog from './containers/Blog/Blog';
import AddPost from './containers/AddPost/AddPost';
import {Route, Routes} from 'react-router-dom';
import FullPost from './components/Posts/FullPost/FullPost';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <Container>
      <Routes>
        <Route path="/" element={<Blog/>}/>
        <Route path="/add-post" element={<AddPost/>}/>
        <Route path="/post/:id/edit" element={<AddPost/>}/>
        <Route path="/post/:id" element={<FullPost/>}/>
        <Route path="/about" element={<div/>}/>
        <Route path="/contacts" element={<div/>}/>
        <Route path="*" element={<h1>not found</h1>}/>

      </Routes>
    </Container>
  </>

);

export default App;
