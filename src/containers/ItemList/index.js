import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import InputRange from '../../components/InputRange'
import Button from '../../components/Button';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import { selectItems } from './selectors';
import {createNewItem, itemChange, itemDelete} from './actions';

class App extends Component {
    render() {
        const {items, onAdd, onDelete, onChange} = this.props;
        return (
            <div className="item-list">
                {items.map((item) => (
                    <InputRange
                        key={item.get('id')}
                        name={item.get('name')}
                        value={item.get('percent')}
                        onDelete={() => { onDelete(item.get('id')); } }
                        onChange={(val) => { onChange(item.get('id'), val); }}
                    />
                ))}
                {!items.size && <div className="item-list__warning">There is nothing to show</div>}
                <div className="item-list__controls">
                    <Button onClick={onAdd}>Add more</Button>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    items: PropTypes.array,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    items: selectItems(),
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: () => {
        dispatch(createNewItem());
    },
    onDelete: (id) => {
        dispatch(itemDelete(id));
    },
    onChange: (id, val) => {
        dispatch(itemChange(id, val));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
