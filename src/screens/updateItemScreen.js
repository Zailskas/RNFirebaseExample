import React, {Component} from 'react';
import {Card, Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {updateItem} from '../../store/actions/itemAction';
import 'react-native-gesture-handler';

class updateItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
    };
  }
  handleSubmit = () => {
    this.props.updateItem(
      this.props.route.params.itemID,
      this.state.make,
      this.state.model,
    );
    this.setState({make: '', model: ''});
    this.makeInput.clear();
    this.modelInput.clear();
    this.props.navigation.navigate('DELETE');
  };
  makeChange(make) {
    this.setState({make});
  }
  modelChange(model) {
    this.setState({model});
  }
  render() {
    return (
      <Card>
        <Card.Title>Update item</Card.Title>
        <Input
          placeholder="Change car make"
          onChangeText={(text) => this.makeChange(text)}
          ref={(input) => {
            this.makeInput = input;
          }}
        />
        <Input
          placeholder="Change car model"
          onChangeText={(text) => this.modelChange(text)}
          ref={(input) => {
            this.modelInput = input;
          }}
        />
        <Button title="Update car" onPress={this.handleSubmit} />
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, {updateItem})(updateItemScreen);
//export default updateItemScreen;
