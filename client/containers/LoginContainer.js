import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	connect
} from 'react-redux';
import {
	hashHistory,
   browserHistory
} from 'react-router-dom';
import {
	bindActionCreators
} from 'redux';
import {
	requestLogin,
	resetLoginStatus
} from '../actions';
import CircularProgress from 'material-ui/CircularProgress';
//components
import ErrorContent from '../components/ErrorContent';
import Login from '../components/Login';

class LoginContainer extends Component {

	constructor(props) {
		super(props)
		this.props.resetLoginStatus()
	}

	componentWillReceiveProps(nextProps) {
		const status = nextProps.login.status
		if (status === 'success') nextProps.history.push('/profile')
	}

	handleLogin(username, password) {
		this.props.requestLogin(username, password)
	}

	render() {
		const {
			login
		} = this.props
		const renderStatus = {
			loading: function() {
				return (<div className="text-center">
							 <CircularProgress size={160} thickness={7} />
						</div>)
			},
			error: function() {
				return <ErrorContent message={login.error.message} />
			}
		}
		if (renderStatus.hasOwnProperty(login.status)) return renderStatus[login.status]()
		return (
			<Login handleLogin={this.handleLogin.bind(this)} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestLogin,
		resetLoginStatus
	}, dispatch)
}

LoginContainer.propTypes = {
	login: PropTypes.object,
	requestLogin: PropTypes.func,
	resetLoginStatus: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)