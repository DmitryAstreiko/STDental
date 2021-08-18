import React, { Component } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./App.css";

//https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/configure-report-settings

export default class PowerBiComponent extends Component {
    render() {
        return (
            <div>
                <div style={{ height: "20px", }}></div>
                <h1 style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}  >Second implementation</h1>
                <div style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                    <PowerBIEmbed
                        embedConfig={{
                            type: this.props.typeEmbed,   // Supported types: report, dashboard, tile, visual and qna
                            id: this.props.reportId,
                            embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${this.props.reportId}&groupId=${this.props.groupId}&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d`,
                            accessToken: this.props.defaultToken,
                            tokenType: models.TokenType.Aad,
                            pageName: this.props.defaultPage,
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

                        eventHandlers={
                            new Map([
                                ['loaded', function () { console.log('Report loaded'); }],
                                ['rendered', function () { console.log('Report rendered'); }],
                                ['error', function (event) { console.log(event.detail); }]
                            ])
                        }

                        cssClassName={"embed-container"}

                        getEmbeddedComponent={(embeddedReport) => {
                            window.report = embeddedReport;
                        }}
                    />
                </div>
            </div>
        );
    }
}