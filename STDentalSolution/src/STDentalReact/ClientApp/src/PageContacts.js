import React, { Component } from 'react';
//import contacts from './Images/contacts.png';
import { MainMenu } from './MainMenu';
import Button from "@material-ui/core/Button";
import * as Pbi from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./App.css";
//https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/configure-report-settings

export class PageContacts extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{ height: "20px" }}></div>
        <h1>Second implementation</h1>
        <div>
          <PowerBIEmbed
              embedConfig = {{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: '162ae399-1e14-4332-a519-746c57a3fd22',
                embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=162ae399-1e14-4332-a519-746c57a3fd22&groupId=5d4e1aaf-dd67-47f1-9f66-392bd5be5803&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
                accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjQxYjcyZDAtNGU5Zi00YzI2LThhNjktZjk0OWYzNjdjOTFkLyIsImlhdCI6MTYyOTI5ODU3MCwibmJmIjoxNjI5Mjk4NTcwLCJleHAiOjE2MjkzMDI0NzAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUE3SDVXNVNmbmQvOE01MitlQ0pMSyswZDVpZlQzNzRUZmJBSUgwMzl1czMrazFQdjdhakFxYWZobm8vMDFBSGFBUDlOME5PeFYyZHVMSHdORmJuZHVTZHYyOWV0bXRicnZjMG9uK0F2MnR1ST0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZGV2aWNlaWQiOiJmMWUwMGI5Ni1hOWY3LTQzYzEtOGEzZC04NmYwZmQ5MDU0ODMiLCJmYW1pbHlfbmFtZSI6IkFzdHJlaWthIiwiZ2l2ZW5fbmFtZSI6IkR6bWl0cnkiLCJpcGFkZHIiOiIzNy4yMTQuNTcuMjIyIiwibmFtZSI6IkR6bWl0cnkgQXN0cmVpa2EiLCJvaWQiOiJiZTg2NmQzNi1jNjAwLTQ4NjAtOWQ3Ni1lYTZlMGNiOTQzNGMiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNjM2MTU3NC0yOTMwODI0MjItMTMwMDc2MTgtMTMxNzk1IiwicHVpZCI6IjEwMDMyMDAxM0IyRjkyMDciLCJyaCI6IjAuQVFrQTBISWJ0SjlPSmt5S2FmbEo4MmZKSFE4QkhJZGhYckZQZzZ5WVlRcC1rUkFKQU5jLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Iml4TDRMYWJsOEdCNlJtZmVKUHhFNnQwTzdTYWhBMEl0T1ZOQm9BVXJZb28iLCJ0aWQiOiJiNDFiNzJkMC00ZTlmLTRjMjYtOGE2OS1mOTQ5ZjM2N2M5MWQiLCJ1bmlxdWVfbmFtZSI6IkR6bWl0cnlfQXN0cmVpa2FAZXBhbS5jb20iLCJ1cG4iOiJEem1pdHJ5X0FzdHJlaWthQGVwYW0uY29tIiwidXRpIjoiNW1PWHBfM29iMEMyZzlXbGRSc1pBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.i4UrzL2RhK5TD00IqOdxMFDEbZKrtXFtn45Y9tMRDqSl4PasbFzrQhJTdSx4I5ZodB6qFA_EQIF8cTGz3aA_k9J03eIYYtJ8HsU5hyhwkc4SHk_Wr0RM5esRfzrm-63Qxgrokyd7_eM11hI4TY8HWyzj3I5P-35XRrvdqufDFwx_v2dIGBLx83HfBzt6SVLmKLISSBertRF846cizUnGkE-NXgRydlO8NLC1josCNLuSi8xIOOo_wVlObRdqZvvn6v4nnSekpRKGL82J-aiMu1hgJK5BJQCQYcisZJn9Wr8yRYQ6SSWTkHhAlCu0ndgmPFW0T6tP8nNxoMRwYlJpjQ',
                tokenType: models.TokenType.Aad,
                pageName = '171d5979945773c50493',
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    },
                    pageNavigation: {
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
                
              cssClassName = { "embed-container" }

              getEmbeddedComponent = { (embeddedReport) => {
                window.report = embeddedReport;
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
              href="https://app.powerbi.com/reportEmbed?reportId=162ae399-1e14-4332-a519-746c57a3fd22&autoAuth=true&ctid=b41b72d0-4e9f-4c26-8a69-f949f367c91d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9/ReportSection1483e8c382a0bad70b72"
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
