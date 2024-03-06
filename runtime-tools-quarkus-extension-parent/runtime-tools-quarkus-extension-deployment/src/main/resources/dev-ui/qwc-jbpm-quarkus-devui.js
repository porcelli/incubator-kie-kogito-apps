import {html, LitElement} from 'lit';
import {
    dataIndexUrl,
    devUIUrl,
    extensionBasePath,
    isTracingEnabled,
    openapiPath,
    trustyServiceUrl,
    userData
} from 'build-time-data';
import {RouterController} from 'router-controller';

export class QwcJbpmQuarkusDevui extends LitElement {
    _routerController = new RouterController(this);

    constructor() {
        super();
    }

    render() {
        return html`
            <div id="envelope-app" style="height: 100%"></div>`;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.updateComplete
        if (!document.querySelector('#jbpm-devui-script')) {
            const script = document.createElement('script');
            script.setAttribute("async", "");
            script.setAttribute("id", "jbpm-devui-script");
            script.setAttribute("src", `${extensionBasePath}/resources/webapp/standalone.js`);
            script.addEventListener("load", () => {
                this.initUI()
            })
            document.head.appendChild(script);
        } else {
            this.initUI();
        }
    }

    initUI() {
        const metadata = this._routerController.getCurrentMetaData();
        const container = this.renderRoot.querySelector("#envelope-app");
        RuntimeToolsDevUI.open({
            container: container,
            isDataIndexAvailable: true,
            isTracingEnabled: isTracingEnabled,
            dataIndexUrl: `${dataIndexUrl ?? "http://localhost:8180"}/graphql`,
            trustyServiceUrl: `${trustyServiceUrl ?? "http://localhost:1336"}`,
            page: metadata.page ?? "Processes",
            devUIUrl: `${devUIUrl ?? window.location.origin}`,
            openApiPath: `${openapiPath ?? "q/openapi.json"}`,
            availablePages: ["Processes", "Jobs", "Tasks", "Forms"],
            users: userData ?? []
        });
    }
}

customElements.define('qwc-jbpm-quarkus-devui', QwcJbpmQuarkusDevui);