import React, { Component } from 'react';
//import contacts from './Images/contacts.png';
import { MainMenu } from './MainMenu';
import Button from "@material-ui/core/Button";
import * as Pbi from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

export class PageContacts extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{ height: "20px" }}></div>
        <h1>Second implementation</h1>
        <div style={{ height: "20px" }}>
          <PowerBIEmbed
              embedConfig = {{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: '162ae399-1e14-4332-a519-746c57a3fd22',
                embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=162ae399-1e14-4332-a519-746c57a3fd22&autoAuth=true&ctid=b41b72d0-4e9f-4c26-8a69-f949f367c91d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9',
                accessToken: '<Access Token>',
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    }
                  },
                  background: models.BackgroundType.Transparent,
                }
              }}

              eventHandlers = { 
                new Map([
                  ['loaded', function () {console.log('Report loaded');}],
                  ['rendered', function () {console.log('Report rendered');}],
                  ['error', function (event) {console.log(event.detail);}]
                ])
              }
                
              cssClassName = { "report-style-class" }

              getEmbeddedComponent = { (embeddedReport) => {
                this.report = embeddedReport as Report;
              }}
            />

        </div>
        <div style={{ height: "20px" }}></div>
        <div style={{ height: "20px" }}></div>
        <div style={{ height: "20px" }}></div>
        <h1>First implementation</h1>
        <div>
         
        </div>
         <div style={{ height: "20px" }}>
          
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <iframe 
            //width="1140" 
            width="90%"
            height="550" 
            src="https://app.powerbi.com/reportEmbed?reportId=5ad19cfb-b8ad-4ea3-b115-5d88c14f3b29&autoAuth=true&ctid=b41b72d0-4e9f-4c26-8a69-f949f367c91d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9" 
            frameborder="0" 
            
            allowFullScreen="true">
          </iframe>
        </div>     

        <div style={{ height: "20px" }}>          
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <h1>Link to application</h1>
          <div >
            <Button color="primary" variant="outlined" 
              //href="https://app.powerbi.com/groups/me/apps/b509244b-0209-4915-b8df-a412e47e474a/reports/9294905b-d14f-42d1-a634-ab8ab9affcc2/ReportSection0223ec3a88d60aabb10b?ctid=b41b72d0-4e9f-4c26-8a69-f949f367c91d"
              href="https://app.powerbi.com/reportEmbed?reportId=162ae399-1e14-4332-a519-746c57a3fd22&autoAuth=true&ctid=b41b72d0-4e9f-4c26-8a69-f949f367c91d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"
            >
              Click me if you want
            </Button>
          </div>
        </div>
        

        <div style={{ height: "100px" }}>          
        </div>
        {/*<div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={contacts} alt="contacts" style={{ width: "80%", margin: "20px" }}/>
        </div>*/}
      </div>
    );
  }
}
