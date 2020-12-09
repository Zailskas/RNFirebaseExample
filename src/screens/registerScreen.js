import React, {Component} from 'react';
import {StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {Card, Button, Input, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {signup} from '../../store/actions/authAction';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      emailError: '',
      passwordError: '',
      passwordConfirmError: '',
    };
  }
  emailChange(email) {
    if (email.length <= 0 || !emailRegex.test(this.state.email)) {
      this.setState({email});
      this.emailErrorChange(true);
    } else {
      this.setState({email});
      this.emailErrorChange(false);
    }
  }
  passwordChange(password) {
    if (password.length < 3) {
      this.setState({password});
      this.passwordErrorChange(true);
    } else {
      this.setState({password});
      this.passwordErrorChange(false);
    }
  }
  passwordConfirmChange(passwordConfirm) {
    if (this.state.password !== passwordConfirm) {
      this.setState({passwordConfirm});
      this.passwordConfirmErrorChange(true);
    } else {
      this.setState({passwordConfirm});
      this.passwordConfirmErrorChange(false);
    }
  }
  emailErrorChange = (text) => {
    this.setState({emailError: text});
  };
  passwordErrorChange = (text) => {
    this.setState({passwordError: text});
  };
  passwordConfirmErrorChange = (text) => {
    this.setState({passwordConfirmError: text});
  };
  handleSubmit = () => {
    const messageState = this.props.messageError.messageState;
    console.log('TT' + messageState);
    if (
      this.state.emailError !== false ||
      this.state.passwordError !== false ||
      this.state.passwordConfirmError !== false ||
      this.state.password.length < 3 ||
      messageState !== false
    ) {
      Alert.alert('Something wrong');
    } else {
      this.props.signup(this.state.email, this.state.password, () => {
        Alert.alert('Register succeed');
        this.props.navigation.navigate('Login_page');
      });
      //Alert.alert('Register succeed');
      this.emailInput.clear();
      this.passwordInput.clear();
      this.repeatPasswordInput.clear();
    }
  };
  handleSubmit1 = () => {
    this.props.signup(this.state.email, this.state.password, () => {
      const messageState = this.props.messageError.messageState;
      console.log('TT' + messageState);
      if (
        this.state.emailError !== false ||
        this.state.passwordError !== false ||
        this.state.passwordConfirmError !== false ||
        this.state.password.length < 3 ||
        messageState === true
      ) {
        Alert.alert('Something wrong');
      } else {
        //Alert.alert('Register succeed');
        this.props.navigation.navigate('Login_page');
        this.emailInput.clear();
        this.passwordInput.clear();
        this.repeatPasswordInput.clear();
      }
    });
    //if (this.props.message)
    //this.emailInput.clear();
    //this.passwordInput.clear();
  };
  render() {
    return (
      <View style={styles.Container}>
        <Card>
          <Input
            label="Your Email  Address"
            placeholder="email@address.com"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            onChangeText={(text) => this.emailChange(text)}
            errorMessage={this.state.emailError ? 'Invalid email' : null}
            ref={(input) => {
              this.emailInput = input;
            }}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={(text) => this.passwordChange(text)}
            errorMessage={
              this.state.passwordError
                ? 'Password must contain at least 3 characters'
                : null
            }
            secureTextEntry={true}
            ref={(input) => {
              this.passwordInput = input;
            }}
          />
          <Input
            label="Repeat password"
            placeholder="Repeat password"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={(text) => this.passwordConfirmChange(text)}
            errorMessage={
              this.state.passwordConfirmError ? 'Password must match' : null
            }
            secureTextEntry={true}
            ref={(input) => {
              this.repeatPasswordInput = input;
            }}
          />
          <Button title="REGISTER" onPress={this.handleSubmit1} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login_page')}>
            <Text>Already have a Account</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    messageError: state.messageError,
  };
};
export default connect(mapStateToProps, {signup})(RegistrationPage);
//export default RegistrationPage;
