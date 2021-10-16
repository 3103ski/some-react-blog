import 'semantic-ui-css/semantic.min.css';

import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navbar } from './components';
import { AddBlogPage, BlogPage, LoginPage, RegisterPage } from './pages';

import { Container } from 'semantic-ui-react';

function App() {
	return (
		<Router>
			<Container>
				<Navbar />
				<Route exact path='/' component={BlogPage} />
				<Route exact path='/register' component={RegisterPage} />
				<Route exact path='/login' component={LoginPage} />
				<Route exact path='/add-blog' component={AddBlogPage} />
			</Container>
		</Router>
	);
}

export default App;
