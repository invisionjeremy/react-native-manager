import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeActions, employeeCreate } from '../actions';
import { Card, CardSection, Input, Button } from './common';


class EmployeeCreate extends Component {
    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.employeeCreate({ name, phone, shift });
    }

    scheduledDays() { 
        const days = [ {name:'Monday', id:1}, {name:'Tuesday', id:2}, {name:'Wednesday', id:3}, {name:'Thursday', id:4}, {name:'Friday', id:5}, {name:'Saturday', id:6}, {name:'Sunday', id:7} ];
        const dayNameList = days.map(day => {
        return <Picker.Item key={day.id} label={day.name} value={day.name} />})

        return (
            <Picker 
                    style={{ flex:1 }}
                    selectedValue={this.props.shift}
                    onValueChange={value => this.props.employeeActions({ prop: 'shift', value})}
                >
                    { dayNameList }
            </Picker>
        );
    }

    render() {
        console.log(this.props.employee);
        
        return (
            <Card>
                <CardSection>
                    <Input
                    label="Name"
                    placeholder="Jane"
                    value={this.props.name}
                    onChangeText={value => this.props.employeeActions({ prop: 'name', value })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input
                    label="Phone"
                    placeholder="555-555-5555"
                    value={this.props.phone}
                    onChangeText={value => this.props.employeeActions({ prop: 'phone', value })}
                    />
                </CardSection>

                <CardSection>
                    <Text style={styles.pickerTextStyle}>Shift</Text> 
                    { this.scheduledDays() }
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeActions, employeeCreate })(EmployeeCreate);