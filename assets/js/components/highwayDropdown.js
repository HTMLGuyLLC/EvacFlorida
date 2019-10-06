import React from 'react';
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";

export class HighwayDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highways: [],
            highway: this.props.highway
        };
        this.onChange = props.onChange;
    }

    getHighways = async () => {
        let res = await axios.get('/highways');
        this.setState({highways: res.data.highways, highway: this.state.highway});
    };

    componentDidMount = () => {
        this.getHighways();
    };

    handleChange = event => {
        this.setState({
            highway: event.target.value
        });
        this.onChange(event.target.value);
    };

    render() {
        return (
            <TextField
                select
                required
                value={this.state.highway}
                onChange={this.handleChange}
                label="Highway"
                inputProps={{
                    name: 'highway',
                }}
            >
                {this.state.highways.map(highway => (
                    highway.directions.map(dir => (
                        <MenuItem key={highway.id + '-' + dir}
                                  value={highway.id + '-' + dir}>{highway.name} - {dir}</MenuItem>
                    ))
                ))}
            </TextField>
        );
    }
}