import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Utils from "../../Utils";

class CustomSelect extends React.Component {
    state = {
        value: this.props.value
    }

    render() {
        let menuItems = []
        for (let menuItem of this.props.menuItems) {
            menuItems.push(<MenuItem value={menuItem}>{Utils.getFormatRole(menuItem)}</MenuItem>)
        }
        return (
            <Select
                value={this.state.value}
                onChange={event => {
                    this.setState({
                        value: event.target.value
                    })
                    this.props.onValueChange(event.target.value)
                }}
            >
                {menuItems}
            </Select>
        );
    }
}

export default CustomSelect;