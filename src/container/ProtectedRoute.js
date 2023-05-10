import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { setAuthenticated } from '../store';

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated.status
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticated: (value) => dispatch(setAuthenticated(value)),
    }
};

const ProtectedRouteContainer = connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

export default ProtectedRouteContainer;