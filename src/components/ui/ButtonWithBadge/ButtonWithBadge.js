import React from "react";
import { connect } from "react-redux";
import { Text, Button, Badge } from 'native-base';

const ButtonWithBadge = props => {
    return (
        <Button badge vertical style={{
            margin:2, backgroundColor: props.theme.cardBackground, borderRadius: 10, ...props.style
        }}>
            <Badge style={{ backgroundColor: props.badgeColor, top: -10 }}><Text>{props.data}</Text></Badge>
            <Text style={{ color: props.theme.fontColor }} >{props.text}</Text>
        </Button>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.settingsReducer.theme
    }
}

export default connect(mapStateToProps)(ButtonWithBadge);

//Average working hours