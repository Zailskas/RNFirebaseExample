import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {fetchItems} from '../../store/actions/itemAction';

class showItemScreen extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }
  render() {
    const {items} = this.props;
    return (
      <Card>
        {items.items.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.make}</ListItem.Title>
              <ListItem.Subtitle>{item.model}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, {fetchItems})(showItemScreen);
