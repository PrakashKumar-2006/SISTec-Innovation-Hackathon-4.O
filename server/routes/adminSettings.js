const express = require('express');
const router = express.Router();
const SystemSettings = require('../models/SystemSettings');
const AdminAuditLog = require('../models/AdminAuditLog');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Apply auth and RBAC (Super Admin only) to all settings routes
router.use(authMiddleware);
router.use(roleMiddleware(['Super Admin']));

// Helper for deep merge
const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));

const deepMerge = (target, source) => {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return target;
};

// GET /api/admin/settings
router.get('/', async (req, res) => {
  try {
    const settings = await SystemSettings.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// PUT /api/admin/settings
router.put('/', async (req, res) => {
  try {
    const updates = req.body;
    let settings = await SystemSettings.getSettings();
    
    // Log changes to audit log
    await AdminAuditLog.create({
      adminId: req.admin.id,
      action: 'System Settings Update',
      ipAddress: req.ip || req.connection.remoteAddress,
      details: { updates }
    });

    // We can just use deep merge manually or use findOneAndUpdate
    deepMerge(settings, updates);
    await settings.save();

    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// POST /api/admin/settings/export
router.post('/export', async (req, res) => {
  try {
    const settings = await SystemSettings.getSettings();
    const settingsObj = settings.toObject();
    
    // Remove mongoose internals before exporting
    delete settingsObj._id;
    delete settingsObj.__v;
    delete settingsObj.singletonId;
    delete settingsObj.createdAt;
    delete settingsObj.updatedAt;

    await AdminAuditLog.create({
      adminId: req.admin.id,
      action: 'System Settings Export',
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.json({ success: true, data: settingsObj });
  } catch (error) {
    console.error('Error exporting settings:', error);
    res.status(500).json({ success: false, message: 'Failed to export settings' });
  }
});

// POST /api/admin/settings/import
router.post('/import', async (req, res) => {
  try {
    const importedSettings = req.body;
    let settings = await SystemSettings.getSettings();

    // Deep merge imported settings into current settings
    deepMerge(settings, importedSettings);
    await settings.save();

    await AdminAuditLog.create({
      adminId: req.admin.id,
      action: 'System Settings Import',
      ipAddress: req.ip || req.connection.remoteAddress,
      details: { importedKeys: Object.keys(importedSettings) }
    });

    res.json({ success: true, data: settings, message: 'Settings imported successfully.' });
  } catch (error) {
    console.error('Error importing settings:', error);
    res.status(500).json({ success: false, message: 'Failed to import settings' });
  }
});

module.exports = router;
