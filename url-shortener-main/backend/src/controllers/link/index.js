const { createShortLink, getShortLink, getSlugRandom, getUserSlug, updateUrl, deleteUrl, getOneUrl, getOneQrCode } = require("../../services/link");
const { asyncHandler } = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse/index");



exports.handleLinkCreation = asyncHandler(async (req, res) => {
  const userId = req.id;
  const { fullUrl, userSlug, size } = req.body;

  const {statusCode,data,message} = await createShortLink(fullUrl, userSlug, userId, size);

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode,data,message));
});



exports.handleLinkRead = asyncHandler(async (req, res) => {
  const { fullUrl, userUrl, shortUrl } = req.query;
  const id = req.id;
  

  const result = await getShortLink(fullUrl, userUrl, shortUrl, id);
  const { message, data, statusCode } = result;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

// controller
exports.handleSlugRandom = asyncHandler(async (req, res) => {
  const slug = req.params.slug; 
  const userAgent = req.headers["user-agent"];
  const referer = req.headers.referer || "direct";
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const { statusCode, data, message } =
    await getSlugRandom(slug, userAgent, ip, referer);

  if (statusCode !== 200) {
    return res.status(statusCode).json({ message });
  }

  return res.redirect(data.fullUrl);
});


exports.handleSlugUserUrl = asyncHandler(async (req, res) => {
  const userSlug = req.params.slug; 
  const userAgent = req.headers["user-agent"];
  const referer = req.headers.referer || "direct";
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const { statusCode, data, message } =
    await getUserSlug(userSlug, userAgent, ip, referer);

  if (statusCode !== 200) {
    return res.status(statusCode).json({ message });
  }

  return res.redirect(data.fullUrl);
});


exports.handleOneUrlAnalyticsAndQrCode = asyncHandler(async (req, res) => {
  const userId = req.id;
  const { linkId } = req.query;

  const result = await getOneUrl(userId, linkId);
  return res
    .status(result.statusCode)
    .json(new ApiResponse(result.statusCode, result.data, result.message));
});



exports.handleUrlUpdation = asyncHandler(async (req, res) => {
  const host = req.get("host");
  const protocol = req.protocol;

  const { search, updatedData } = req.body;
  const userId = req.id;

  const result = await updateUrl(userId, search, updatedData, host, protocol);

  const { message, data, statusCode } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});

exports.handleUrlDeletion = asyncHandler(async (req, res) => {
  const { search } = req.body;
  const userId = req.id;

  const result = await deleteUrl(search, userId);

  const { message, data, statusCode } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
});


exports.handleQrCreation = asyncHandler(async(req,res)=>{
  const {linkId} = req.query;
  const result = await getOneQrCode(linkId);
  const { message, data, statusCode } = result;
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
})