import React, { PureComponent } from 'react';
import Numeral from 'numeral';
import './styles.css';

function round(val) {
    return Math.round(val * 100) / 100;
}

function formatValue(value) {
    return Numeral(value / 100).format('0.00%');
}

class InputNumber extends PureComponent {
    state = {
        formattedValue: formatValue(this.props.value),
        rawValue: this.props.value,
    };

    componentWillReceiveProps(props) {
        const { value } = props;
        this.setState({
            rawValue: value,
            formattedValue: formatValue(value),
        });
    }

    handleChange = (e) => {
        let { value } = e.target;
        value = value || 0;

        this.setState((prevState, props) => {
            if (value > props.max) value = 100;
            const canChange = value <= props.max && value >= props.min;
            let rawValue = prevState.rawValue;
            if (canChange) rawValue = parseFloat(value);
            rawValue = round(rawValue);
            return { rawValue, formattedValue: value };
        }, () => {
            this.props.onChange(this.state.rawValue);
        });
    };

    increase = () => {
        this.setState((prevState, props) => {
            const canChange = this.state.rawValue < props.max;
            let rawValue = prevState.rawValue;
            if (canChange) rawValue += props.step;
            rawValue = round(rawValue);
            return { rawValue };
        }, () => {
            this.props.onChange(this.state.rawValue);
            this.onFormat();
        });
    };

    decrease = () => {
        this.setState((prevState, props) => {
            const canChange = this.state.rawValue > props.min;
            let rawValue = prevState.rawValue;
            if (canChange) rawValue -= props.step;
            rawValue = round(rawValue);
            return { rawValue };
        }, () => {
            this.props.onChange(this.state.rawValue);
            this.onFormat();
        });
    };

    handlePress = (e) => {
        const keyCode = e.keyCode || e.which;
        const KEY_ENTER = 13;
        const KEY_COMMA = 188;
        const KEY_DOT = 190;
        const KEY_ARROW_UP = 38;
        const KEY_ARROW_DOWN = 40;
        const KEY_DELETE = 8;
        const isDigits = keyCode >= 48 && keyCode <= 57;

        if (keyCode === KEY_DOT || keyCode === KEY_COMMA) {
            e.preventDefault();
            this.setState((prevState) => {
                let formattedValue = prevState.formattedValue;
                const hasDot = formattedValue.indexOf('.') > 0;

                if (!hasDot) formattedValue += '.';

                return {formattedValue};
            });
        } else if (keyCode === KEY_ENTER) {
            this.input.blur();
        } else if (keyCode === KEY_ARROW_DOWN) {
            this.decrease();
        } else if (keyCode === KEY_ARROW_UP) {
            this.increase();
        } else if (!isDigits && keyCode !== KEY_DELETE) {
            e.preventDefault();
        }
    };

    handleFocus = () => {
        this.input.setSelectionRange(0, this.input.value.length);
    };

    onFormat = () => {
        const { rawValue } = this.state;
        const formattedValue = formatValue(rawValue);
        this.setState({ formattedValue });
    };

    render() {
        return (
            <div className="input-number">
                <a role="button" className="input-number__controls" onClick={this.decrease}>-</a>
                <input
                    ref={(ref) => { this.input = ref; }}
                    type="text"
                    className="input-number__input"
                    value={this.state.formattedValue}
                    onFocus={this.handleFocus}
                    onBlur={this.onFormat}
                    onKeyDown={this.handlePress}
                    onChange={this.handleChange}
                />
                <a role="button" className="input-number__controls" onClick={this.increase}>+</a>
            </div>
        )
    }
}

export default InputNumber;