import { connect } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import { setAuthenticated } from '../store';

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthenticated: (value) => dispatch(setAuthenticated(value)),
    };
};

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LayoutContainer;