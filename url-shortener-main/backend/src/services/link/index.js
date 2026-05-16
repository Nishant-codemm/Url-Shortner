const { nanoid } = require("nanoid");
const { Link } = require("../../models/link/index");
const { Click } = require("../../models/click/index");
const { parseDevice, hashIp } = require("../../config/analytics");
const geoIp = require("geoip-lite");
const qrcode = require("qrcode");

// create
exports.createShortLink = async (fullUrl, userSlug, userId, size = 8) => {
  if (!fullUrl || !userId) {
    return {
      statusCode: 400,
      data: null,
      message: "Required fields are missing",
    };
  }

  const slugSize = Number(size);
  if (!Number.isInteger(slugSize) || slugSize < 6 || slugSize > 20) {
    return {
      statusCode: 400,
      data: null,
      message: "Slug size must be between 6 and 20",
    };
  }

  const trimmedUserSlug = userSlug?.trim();

  // If user chooses a custom slug
  if (trimmedUserSlug) {
    const exists = await Link.findOne({ userSlug: trimmedUserSlug });

    if (exists) {
      return {
        statusCode: 400,
        data: null,
        message: "Custom slug already exists",
      };
    }
  }

  // Generate a random slug
  const slug = nanoid(slugSize);

  // Check collision
  const slugExists = await Link.findOne({ slug });
  if (slugExists) {
    return {
      statusCode: 400,
      data: null,
      message: "Slug collision. Try again.",
    };
  }

  // Create link
  const created = await Link.create({
    fullUrl,
    slug,
    userId,
    ...(trimmedUserSlug ? { userSlug: trimmedUserSlug } : {}),
  });

  const urlForQr = `${process.env.BASE_URL}/${created.slug}`;
  const qrCode = await qrcode.toDataURL(urlForQr);

  return {
    statusCode: 201,
    data:{
      created,
      qrCode
    },
    message: "Short URL created successfully",
  };
};

/// analytics
exports.getOneUrl = async (userId, linkId) => {
  if (!userId || !linkId) {
    return {
      statusCode: 400,
      data: null,
      message: "Required fields are missing",
    };
  }

  // 1. Fetch link owned by user
  const url = await Link.findOne({ _id: linkId, userId });

  if (!url) {
    return {
      statusCode: 404,
      data: null,
      message: "Link not found",
    };
  }

  if (url.isExpired || url.expiredDate < new Date()) {
    url.isExpired = true;
    await url.save();
  }

  // 2. Generate QR code for the short URL (RECOMMENDED)
  //    Use slug-based redirect, not full original URL
  const shortLinkForQR = `${process.env.BASE_URL}/${url.slug}`;
  const qrCode = await qrcode.toDataURL(shortLinkForQR);

  // 3. Fetch analytics
  const analytics = await Click.find({ linkId });

  const urlSlug = `${process.env.BASE_URL}/${url.slug}`;
  const userSlug = url.userSlug ? `${process.env.BASE_URL}/u/${url.userSlug}` : null;

  url.slug = urlSlug;
  url.userSlug = userSlug;
  return {
    statusCode: 200,
    message: "Fetched link analytics",
    data: {
      url,
      qrCode,
      analytics,
      totalClicks: analytics.length,
    },
  };
};

/// get all links without deep analytics

exports.getShortLink = async (fullUrl, slug, userSlug, userId) => {
  if (!userId) {
    return {
      statusCode: 400,
      data: null,
      message: "User ID missing",
    };
  }
  const BASE = process.env.BASE_URL;
  // Query priority
  const filter = { userId };

  if (fullUrl) filter.fullUrl = fullUrl;
  if (slug) filter.slug = slug;
  if (userSlug) filter.userSlug = userSlug;

  const urls = await Link.find(filter);
  const mapped = urls.map((u) => ({
    id: u._id,
    fullUrl: u.fullUrl,
    shortUrl: `${BASE}/${u.slug}`, // full clickable link
    userUrl: u.userSlug ? `${BASE}/u/${u.userSlug}` : null,
    clicks: u.clicks,
    createdAt: u.createdAt,
  }));
  return {
    statusCode: 200,
    data: {
      count: urls.length,
      urls: mapped,
    },
    message: urls.length ? "Links found" : "No links found",
  };
};

// redirect random slug
// services
exports.getSlugRandom = async (slug, userAgent, ip, referer) => {
  if (!slug) {
    return { statusCode: 400, data: null, message: "Slug missing" };
  }

  let url = await Link.findOne({ slug });

  if (!url) {
    return { statusCode: 404, data: null, message: "URL not found" };
  }

  if (url.isExpired || url.expiredDate < new Date()) {
    url.isExpired = true;
    url.save();
    return { statusCode: 400, data: null, message: "URL expired" };
  }

  // increment clicks

  // parse analytics
  const { deviceType, os, browser } = parseDevice(userAgent);
  const ipHash = await hashIp(ip);
  const geo = geoIp.lookup(ip) || {};

  // prevent double count from same IP
  const exists = await Click.findOne({ ipHash, linkId: url._id });
  if (!exists) {
    await Link.updateOne({ _id: url._id }, { $inc: { clicks: 1 } });
    await Click.create({
      linkId: url._id,
      referrer: referer,
      deviceType,
      browser,
      os,
      ipHash,
      geo: {
        range: geo.range || null,
        country: geo.country || null,
        region: geo.region || null,
        ll: geo.ll || null,
      },
    });
  }

  return { statusCode: 200, data: url, message: "Redirecting" };
};

/// redirect user slug
exports.getUserSlug = async (userSlug, userAgent, ip, referer) => {
  if (!userSlug) {
    return { statusCode: 400, data: null, message: "Slug missing" };
  }

  let url = await Link.findOne({ userSlug });

  if (!url) {
    return { statusCode: 404, data: null, message: "URL not found" };
  }

  if (url.isExpired || url.expiredDate < new Date()) {
    url.isExpired = true;
    url.save();
    return { statusCode: 400, data: null, message: "URL expired" };
  }

  const { deviceType, os, browser } = parseDevice(userAgent);
  const ipHash = await hashIp(ip);
  const geo = geoIp.lookup(ip) || {};

  const exists = await Click.findOne({ ipHash, linkId: url._id });
  if (!exists) {
    await Link.updateOne({ _id: url._id }, { $inc: { clicks: 1 } });
    await Click.create({
      linkId: url._id,
      referrer: referer,
      deviceType,
      browser,
      os,
      ipHash,
      geo: {
        range: geo.range || null,
        country: geo.country || null,
        region: geo.region || null,
        ll: geo.ll || null,
      },
    });
  }

  return { statusCode: 200, data: url, message: "Redirecting" };
};

exports.updateUrl = async (userId, search, data, host, protocol) => {
  if (!search || typeof search !== "object") {
    return { data: null, statusCode: 400, message: "Search field required" };
  }

  if (!data || typeof data !== "object") {
    return { data: null, statusCode: 400, message: "Updated data required" };
  }

  if (!search.id) {
    return { data: null, statusCode: 400, message: "id is required in search" };
  }

  // find the link
  let url = await Link.findOne({ _id: search.id, userId });
  if (!url) {
    return { data: null, statusCode: 404, message: "URL not found" };
  }

  // if user is updating custom user URL
  if (data.userSlug) {
    const newSlug = data.userSlug.trim();

    const existing = await Link.findOne({
      userSlug: newSlug,
      _id: { $ne: url._id },
    });

    if (existing) {
      return {
        data: null,
        statusCode: 400,
        message: "Custom user URL already exists",
      };
    }

    data.userSlug = newSlug; // store ONLY slug
  }

  // apply safe updates
  const allowed = ["fullUrl", "userSlug"];
  allowed.forEach((field) => {
    if (data[field] !== undefined) url[field] = data[field];
  });

  await url.save();

  return {
    data: url,
    statusCode: 200,
    message: "URL updated successfully",
  };
};

/// delete urls
exports.deleteUrl = async (search, userId) => {
  if (!search || typeof search !== "object") {
    return { data: null, statusCode: 400, message: "Search field required" };
  }

  const keys = Object.keys(search);
  if (keys.length !== 1) {
    return {
      data: null,
      statusCode: 400,
      message: "Send exactly one search field",
    };
  }

  const key = keys[0];
  const value = search[key];

  if (!value) {
    return { data: null, statusCode: 400, message: "Search value missing" };
  }

  const query =
    key === "id" ? { _id: value, userId } : { [key]: value, userId };

  const deleted = await Link.findOneAndDelete(query);

  if (!deleted) {
    return { data: null, statusCode: 404, message: "URL not found" };
  }

  return {
    data: deleted,
    statusCode: 200,
    message: "URL deleted successfully",
  };
};


exports.getOneQrCode = async (linkId) =>{
  if(!linkId){
    return {
      data:null,
      statusCode:400,
      message:"Required fields are missing"
    }
  }
  
  const link = await Link.findById(linkId);
  
  if(!link){
    return {
      data:null,
      message:"Not found",
      statusCode:404
    }
  }

  const qrCodeLink = `${process.env.BASE_URL}/${link.slug}`
  
  const qrCode = await qrcode.toDataURL(qrCodeLink)

  return {
    data:qrCode,
    message:"Qrcode Created",
    statusCode:201
  }
}
