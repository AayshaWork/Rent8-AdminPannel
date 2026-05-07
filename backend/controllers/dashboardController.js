exports.getDashboard = async (req, res) => {
  res.json({
    success: true,
    data: {
      revenue: 145000,
      activeAds: 1240,
      pending: 14,
      reports: 3,
    },
  });
};