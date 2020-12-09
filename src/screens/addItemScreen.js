import React, {Component} from 'react';
import {Card, Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {addItem} from '../../store/actions/itemAction';
import 'react-native-gesture-handler';
import {Alert} from 'react-native';

class addItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
    };
  }
  handleSubmit = () => {
    this.props.addItem(this.state.make, this.state.model);
    this.setState({make: '', model: ''});
    this.makeInput.clear();
    this.modelInput.clear();
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
        <Card.Title>Add item</Card.Title>
        <Input
          placeholder="Insert car make"
          onChangeText={(text) => this.makeChange(text)}
          ref={(input) => {
            this.makeInput = input;
          }}
        />
        <Input
          placeholder="Insert car model"
          onChangeText={(text) => this.modelChange(text)}
          ref={(input) => {
            this.modelInput = input;
          }}
        />
        <Button title="Add car" onPress={this.handleSubmit} />
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
export default connect(mapStateToProps, {addItem})(addItemScreen);
