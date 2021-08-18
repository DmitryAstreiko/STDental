import React, { Component } from 'react';
//import contacts from './Images/contacts.png';
import { MainMenu } from './MainMenu';
import Button from "@material-ui/core/Button";

import PowerBiComponent from './PowerBiComponent';

export class PageContacts extends Component {

  render() {
    const reportId = '162ae399-1e14-4332-a519-746c57a3fd22';
    const groupId = '5d4e1aaf-dd67-47f1-9f66-392bd5be5803';
    const typeEmbed = 'report';
    const defaultPage = 'ReportSection171d5979945773c50493';
    const defaultToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjQxYjcyZDAtNGU5Zi00YzI2LThhNjktZjk0OWYzNjdjOTFkLyIsImlhdCI6MTYyOTMyNjAyMCwibmJmIjoxNjI5MzI2MDIwLCJleHAiOjE2MjkzMjk5MjAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFJaHpNSFU3UkNSek9waE9Ia215VWhyb1FJcU5QVEhySGlFYWN2ZWtyLzBhWkp3Q1lOQlJRaFBMUGdveU5JWDkrSU83WG5DcWxyMEk3UkpXU3VabTM4eVU4a0owVUtmWEN5SE4vM0F3OCt3dz0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZGV2aWNlaWQiOiJmMWUwMGI5Ni1hOWY3LTQzYzEtOGEzZC04NmYwZmQ5MDU0ODMiLCJmYW1pbHlfbmFtZSI6IkFzdHJlaWthIiwiZ2l2ZW5fbmFtZSI6IkR6bWl0cnkiLCJpcGFkZHIiOiIzNy4yMTQuNTcuMjIyIiwibmFtZSI6IkR6bWl0cnkgQXN0cmVpa2EiLCJvaWQiOiJiZTg2NmQzNi1jNjAwLTQ4NjAtOWQ3Ni1lYTZlMGNiOTQzNGMiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtNjM2MTU3NC0yOTMwODI0MjItMTMwMDc2MTgtMTMxNzk1IiwicHVpZCI6IjEwMDMyMDAxM0IyRjkyMDciLCJyaCI6IjAuQVFrQTBISWJ0SjlPSmt5S2FmbEo4MmZKSFE4QkhJZGhYckZQZzZ5WVlRcC1rUkFKQU5jLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Iml4TDRMYWJsOEdCNlJtZmVKUHhFNnQwTzdTYWhBMEl0T1ZOQm9BVXJZb28iLCJ0aWQiOiJiNDFiNzJkMC00ZTlmLTRjMjYtOGE2OS1mOTQ5ZjM2N2M5MWQiLCJ1bmlxdWVfbmFtZSI6IkR6bWl0cnlfQXN0cmVpa2FAZXBhbS5jb20iLCJ1cG4iOiJEem1pdHJ5X0FzdHJlaWthQGVwYW0uY29tIiwidXRpIjoiM0xJVGVFaUhFa09LVG1tM3NmRW1BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.NtbJ4C1zriP9maMzX9-uDnTVpFcD5QWkDRAYUAV-AXeK-nnghXet7_JUZGjJ1XKITdNB_afxxr9GFjWIqtQRvKQwC9LidvT5iCwI4fCBdgoA1u46tizz3-RndDnWCRIpSgT5PJx8Uxz7pozY2DmImHaqfT_cA6VtertqKfmFPiGl3PHoP8OidOiy31hQuVepNMHW8DO7VyxthpCxjSP1n7Oupe-tQmrCVNTdIOmgHzDcxSjg3pVAS3jPEYCM2tGi_TqQWU2hs1uU0Ku7pfnpIdaAkLMRxgvcRB0mojquq6_kg8RysG4mh0vl9-ybqEtRFqqGUL3wrXcwjRbueHLQmw';

    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{ height: "20px", }}></div>
        <div >
          <PowerBiComponent reportId={reportId} groupId={groupId} typeEmbed={typeEmbed} defaultPage={defaultPage}
            defaultToken={defaultToken} />
        </div>

        <div style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>

        </div>
        <div style={{ height: "60px" }}></div>
        <h1 style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}  >First implementation</h1>
        <div>

        </div>
        <div style={{ height: "20px" }}>

        </div>
        <div style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
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
        <div style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
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
