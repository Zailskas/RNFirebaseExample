import React, {Component} from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {fetchItems, deleteItem} from '../../store/actions/itemAction';

class deleteItemScreen extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    //const {items} = this.props.items;
    return (
      <Card>
        {this.props.items.userItems.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.make}</ListItem.Title>
              <ListItem.Subtitle>{item.model}</ListItem.Subtitle>
            </ListItem.Content>
            <View style={styles.buttonContainer}>
              <Button
                title="UPDATE"
                buttonStyle={styles.updateButton}
                onPress={() =>
                  this.props.navigation.navigate('Update', {
                    itemID: item.id,
                  })
                }
              />
              <Button
                title="DELETE"
                buttonStyle={styles.deleteButton}
                onPress={() => this.props.deleteItem(item.id)}
              />
            </View>
          </ListItem>
        ))}
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  updateButton: {
    width: 80,
    height: 30,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteButton: {
    width: 80,
    height: 30,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'tomato',
  },
});

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, {fetchItems, deleteItem})(
  deleteItemScreen,
);
