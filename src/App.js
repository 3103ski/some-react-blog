import 'semantic-ui-css/semantic.min.css';

import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navbar } from './components';
import { AddBlogPage, BlogPage, LoginPage, RegisterPage } from './pages';
import AuthRoute from './util/AuthRoute.jsx';
import { AuthProvider } from './context/auth';

import { Container } from 'semantic-ui-react';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Navbar />
					<Route exact path='/' component={BlogPage} />
					<Route exact path='/register' component={RegisterPage} />
					<Route exact path='/login' component={LoginPage} />
					<AuthRoute exact path='/add-blog' component={AddBlogPage} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
