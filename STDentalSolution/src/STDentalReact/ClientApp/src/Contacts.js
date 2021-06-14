import React, { Component } from 'react';
import contacts from './Images/contacts.png';

export class ContactsOrg extends Component {

  render () {
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={contacts} alt="contacts" style={{ width: "80%", margin: "20px" }}/>
        </div>
    );
  }
}
