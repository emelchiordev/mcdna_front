import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { setAuthenticated } from '../store';

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated.status,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticated: (value) => dispatch(setAuthenticated(value)),
    }
};

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;