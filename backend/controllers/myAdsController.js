// controllers/myAdsController.js
const Property = require('../models/Property'); 

exports.getMyAds = async (req, res) => {
  try {
    const properties = await Property.find({ owner_id: req.user.id })
      .select('title rent address city state images ad_status createdAt') 
      .sort({ createdAt: -1 });

    const formattedAds = properties.map(ad => {
      const firstImage = (ad.images && ad.images.length > 0) ? ad.images[0] : null;
      let shortLocation = ad.address ? ad.address.substring(0, 30) + '...' : 'Location not available';
      if (ad.city) {
          shortLocation = `${ad.address ? ad.address.split(',')[0] : ''}, ${ad.city}`; 
      }

      return {
        id: ad._id,
        title: ad.title,
        rent: ad.rent,
        short_location: shortLocation,
        image: firstImage,
        ad_status: ad.ad_status,
        posted_on: ad.createdAt
      };
    });

    res.status(200).json({ success: true, count: formattedAds.length, data: formattedAds });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while fetching ads." });
  }
};

exports.deleteMyAd = async (req, res) => { /* Delete Logic */ };
exports.cancelMyAd = async (req, res) => { /* Cancel Logic */ };
// Baki saare functions yahan daal do...