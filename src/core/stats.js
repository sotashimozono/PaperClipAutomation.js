import { PAPERS_CONFIG } from './config.js';

export const historyStats = {
    lastUnsold: 0,
    lastTime: Date.now(),
    salesVelocity: 0,
    update: function(currentUnsold, clipRate) {
        const now = Date.now();
        const dt = (now - this.lastTime) / PAPERS_CONFIG.MAIN_TICK;
        if (dt > 0) {
            const dInventory = currentUnsold - this.lastUnsold;
            // J_out = J_in - d(Inventory)/dt
            this.salesVelocity = Math.max(0, (clipRate || 0) - (dInventory / dt));
        }
        this.lastUnsold = currentUnsold;
        this.lastTime = now;
    }
};