import React from 'react';
import PropTypes from 'prop-types';
import InputNumber from '../InputNumber';
import './styles.css';

import Button from '../Button';

const InputRange = ({ name, value, onDelete, onChange }) => {
    return (
        <div className="input-range">
            <div className="input-range__name">{name}</div>
            <input
                className="input-range__bar"
                type="range"
                step={0.01}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
            />
            <div className="input-range__input">
                <InputNumber
                    min={0}
                    max={100}
                    step={0.01}
                    value={value}
                    onChange={(val) => {
                        onChange(val);
                    }}
                />
            </div>
            <Button className="input-range__button" onClick={onDelete}/>
        </div>
    );
};

InputRange.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default InputRange;