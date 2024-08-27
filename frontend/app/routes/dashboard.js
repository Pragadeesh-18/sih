import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    serverEventHandler: service('server-event-handler'),
    async model() {
        this.serverEventHandler.initiateSSE()
        return {};
    }
});
