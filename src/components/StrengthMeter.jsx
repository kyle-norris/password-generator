import "./StrengthMeter.css"
import PropTypes from 'prop-types';


function strengthLabel(val) {
    switch (val) {
        case 1:
            return "VERY WEAK";
        case 2:
            return "WEAK";
        case 3:
            return "MEDIUM";
        case 4:
            return "STRONG";
        default:
            return "";
    }
}

function strengthColor(val) {
    switch (val) {
        case 1:
            return "#F64A4A";
        case 2:
            return "#FB7C58";
        case 3:
            return "#F8CD65";
        case 4:
            return "#A4FFAF";
        default:
            return "";
    }
}

function generateStrengthBoxes(strength) {
    let content = [];
    const color = strengthColor(strength);

    for (let i = 1; i <= strength; i++) {
        content.push(<div key={i} className="box" style={{backgroundColor: color, borderColor: color}}></div>)
    }
    
    if (content.length < 4) {
        const toAdd = 4 - content.length;
        for (let i = 1; i <= toAdd; i++) {
            content.push(<div key={content.length + i} className="box empty"></div>)
        }
    }

    return content;
}

function StrengthMeter({strength}) {
    
    return (
        <div className="strengthContainer">
            <div className="strengthLabel">STRENGTH</div>
            <div className="indicatorContainer">
                <div className="label">{strengthLabel(strength)}</div>
                <div className="indicatorBoxes">
                    {generateStrengthBoxes(strength)}
                </div>
            </div>
        </div>
    )
}

StrengthMeter.propTypes = {
    strength: PropTypes.number.isRequired,
}

export default StrengthMeter;