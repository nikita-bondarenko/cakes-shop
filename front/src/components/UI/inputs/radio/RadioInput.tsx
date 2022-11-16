import React, {Component} from 'react';
import styles from './RadioInput.module.scss';
import ButtonCheck from "../../buttons/button-check/ButtonCheck";

interface Props {
    label: string;
    checked: boolean;
    onSelect: (arg: string) => void;
    name?: string;
    value?: string;
    className?: string;
    hideButton?: boolean;
    labelClassName? :string;
}

interface State {

}

class RadioInputModule extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    ref = React.createRef<HTMLInputElement>()

    render() {
        return (
            <label className={[styles.body, this.props.className].join(' ')}>
                {!this.props.hideButton && <ButtonCheck checked={this.props.checked} onClick={() => this.props.onSelect(this.props.value || '')}></ButtonCheck>}
                <span className={[styles.label, this.props.labelClassName, this.props.checked && styles.checked ].join(' ')} >{this.props.label}</span>

                <input name={this.props.name} ref={this.ref} style={{display: "none"}} checked={this.props.checked} onChange={() => {}} type="radio"/>
            </label>
        );
    }
}

export default RadioInputModule;