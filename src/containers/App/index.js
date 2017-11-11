import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import ItemList from '../ItemList';
import Button from '../../components/Button';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectErrors, selectLoadingFlag} from './selectors';
import {dataFetchRequest} from './actions';

class App extends Component {
    render() {
        const {isLoading, errors, onRefresh} = this.props;
        return (
            <div className="app">
                <h1 className="app__title">Implementation of inputs <br/> in percentages</h1>
                <div className="app__controls">
                    <Button onClick={onRefresh}>{isLoading ? 'Loading...' : 'Refresh'}</Button>
                </div>
                {errors.map((error) => <div className="app__error" key={error.toString()}>{error}</div>)}
                <ItemList />
            </div>
        );
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
    errors: PropTypes.array,
    onRefresh: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    isLoading: selectLoadingFlag(),
    errors: selectErrors(),
});

const mapDispatchToProps = (dispatch) => ({
    onRefresh: () => {
        dispatch(dataFetchRequest());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
