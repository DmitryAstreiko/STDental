import React, { Component } from 'react';
import contacts from './Images/contacts.png';
import { MainMenu } from './MainMenu';

export class PageContacts extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{ height: "20px" }}></div>
        <div style={{ height: "100px" }}>          
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={contacts} alt="contacts" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
