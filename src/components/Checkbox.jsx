import "./Checkbox.css";
import {useId} from "react";

export default function Checkbox({value, setValue, label}) {
    const id = useId();
    return (
        <div style={{display: "flex", alignItems: "center", marginTop: "16px"}}>
            <input checked={value} className="checkbox-box" type="checkbox" id={id} onChange={(event) => setValue(!value)} />
            <label className="checkbox-label" htmlFor={id}>{label}</label>
        </div>
    )
}