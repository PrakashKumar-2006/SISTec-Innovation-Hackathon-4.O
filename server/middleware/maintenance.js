const SystemSettings = require('../models/SystemSettings');

const maintenanceMiddleware = async (req, res, next) => {
  try {
    const settings = await SystemSettings.getSettings();
    
    // If maintenance mode is active and user is NOT a Super Admin
    if (settings.maintenance?.isMaintenanceMode) {
      if (!req.admin || req.admin.role !== 'Super Admin') {
        return res.status(503).json({ 
          success: false, 
          message: settings.maintenance.maintenanceMessage || 'System is under maintenance.',
          isMaintenance: true
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Maintenance middleware error:', error);
    next(); // Fallback to allowing access if settings fail to load
  }
};

module.exports = { maintenanceMiddleware };
