import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { Card, Text, View } from 'native-base';

const CustomCard = props => {

    // const [body, setBody] = useState(null);
    // const [footer, setFooter] = useState(null);

    // React.Children.map(props.children, (child) => {
    //     if (child.key === 'body') {
    //         setBody(child);
    //     } else if ((child.key === 'footer')) {
    //         setFooter(child);
    //     }
    // });

    return (
        <Card style={{ ...styles.lineChart, backgroundColor: props.theme.cardBackground, borderColor: props.theme.cardBackground }}>
            {props.children}
        </Card>
    )
}

const styles = StyleSheet.create({
    lineChart: {
        padding: 20,
        flex: 1,
        borderWidth: 0,
        justifyContent: 'space-between',
        borderRadius: 10
    }
});

const mapStateToProps = state => {
    return {
        theme: state.settingsReducer.theme
    }
}

export default connect(mapStateToProps)(CustomCard);