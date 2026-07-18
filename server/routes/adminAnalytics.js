const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const ChangeRequest = require('../models/ChangeRequest');
const ProblemStatement = require('../models/ProblemStatement');
const Admin = require('../models/Admin');

router.use(authMiddleware);
router.use(roleMiddleware(['Super Admin', 'Admin', 'Moderator', 'Viewer']));

const getModelSafe = (modelName) => {
  try {
    return mongoose.model(modelName);
  } catch (e) {
    return null;
  }
};

router.get('/', async (req, res) => {
  try {
    const Registration = getModelSafe('Registration');
    const PaymentLog = getModelSafe('PaymentLog');

    // Counts
    const totalRegistrations = Registration ? await Registration.countDocuments() : 0;
    const verifiedRegistrations = Registration ? await Registration.countDocuments({ verificationStatus: 'verified' }) : 0;
    const pendingRegistrations = Registration ? await Registration.countDocuments({ registrationStatus: 'pending' }) : 0;

    let totalRevenue = 0;
    if (Registration) {
      const revenueResult = await Registration.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } }
      ]);
      totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    }

    const totalProblems = await ProblemStatement.countDocuments();
    const activeProblems = await ProblemStatement.countDocuments({ status: 'Active' });

    const totalAdmins = await Admin.countDocuments();

    const pendingChangeRequests = await ChangeRequest.countDocuments({ status: 'Pending' });
    const approvedChangeRequests = await ChangeRequest.countDocuments({ status: 'Approved' });
    const rejectedChangeRequests = await ChangeRequest.countDocuments({ status: 'Rejected' });

    // Registration Trend (Last 7 Days)
    let registrationTrend = [];
    if (Registration) {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      registrationTrend = await Registration.aggregate([
        { $match: { createdAt: { $gte: lastWeek } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
    }

    // Theme Distribution
    let themeDistribution = [];
    if (Registration) {
      themeDistribution = await Registration.aggregate([
        { $group: { _id: "$theme", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
    }

    // Status Distribution
    const statusDistribution = [
      { _id: 'Verified', count: verifiedRegistrations },
      { _id: 'Pending', count: pendingRegistrations },
      { _id: 'Rejected', count: Registration ? await Registration.countDocuments({ registrationStatus: 'rejected' }) : 0 }
    ];

    // Recent Activity
    let recentRegistrations = [];
    if (Registration) {
      recentRegistrations = await Registration.find().sort({ createdAt: -1 }).limit(5).lean();
    }
    const recentRequests = await ChangeRequest.find().sort({ createdAt: -1 }).limit(5).lean();

    const recentActivity = [
      ...recentRegistrations.map(r => ({
        id: r._id,
        type: 'Registration',
        action: 'New Registration',
        user: r.teamName,
        timestamp: r.createdAt,
        status: r.registrationStatus
      })),
      ...recentRequests.map(r => ({
        id: r._id,
        type: 'ChangeRequest',
        action: `Change Request ${r.status}`,
        user: r.teamName,
        timestamp: r.createdAt,
        status: r.status
      }))
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          totalRegistrations,
          verifiedRegistrations,
          pendingRegistrations,
          totalRevenue,
          totalProblems,
          activeProblems,
          pendingChangeRequests,
          approvedChangeRequests,
          rejectedChangeRequests,
          totalAdmins
        },
        registrationTrend,
        themeDistribution,
        statusDistribution,
        recentActivity
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
