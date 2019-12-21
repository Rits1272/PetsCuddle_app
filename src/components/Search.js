import React, { Component } from 'react';
import {Item, Input} from 'native-base';

export default class Search extends Component {
  render() {
    return (
          <Item>
            <Input 
            placeholder="Search" />
          </Item>
    );
  }
}