import "./Checkbox.css";
import {useId} from "react";
import PropTypes from 'prop-types';

function Checkbox({value, setValue, label}) {

    const id = useId();
    return (
        <div style={{display: "flex", alignItems: "center", marginTop: "16px"}}>
            <input checked={value} className="checkbox-box" type="checkbox" id={id} onChange={() => setValue(!value)} />
            <label className="checkbox-label" htmlFor={id}>{label}</label>
        </div>
    )
}

Checkbox.propTypes = {
    value: PropTypes.bool.isRequired,
    setValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default Checkbox;