export default function buildPropertyPipeline(query) {
  const {
    page = 1,
    limit = 12,
    minPrice,
    maxPrice,
    location,
    type,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    amenities,
    q,
    sort = 'newest', // newest | price_asc | price_desc | area_desc
    isActive = 'true',
  } = query;

  const match = {};
  if (isActive === 'true') match.isActive = true;

  if (typeof type === 'string') match.type = type;
  if (minPrice) match.price = { ...(match.price || {}), $gte: Number(minPrice) };
  if (maxPrice) match.price = { ...(match.price || {}), $lte: Number(maxPrice) };
  if (bedrooms) match.bedrooms = { $gte: Number(bedrooms) };
  if (bathrooms) match.bathrooms = { $gte: Number(bathrooms) };
  if (minArea) match.area = { ...(match.area || {}), $gte: Number(minArea) };
  if (maxArea) match.area = { ...(match.area || {}), $lte: Number(maxArea) };
  if (location) match.location = { $regex: location, $options: 'i' };
  if (amenities) {
    const list = Array.isArray(amenities) ? amenities : String(amenities).split(',').map(s => s.trim()).filter(Boolean);
    if (list.length) match.amenities = { $all: list };
  }

  const pipeline = [
    { $match: match },
  ];

  if (q) {
    pipeline.push({ $match: { $text: { $search: q } } });
  }

  let sortStage = { createdAt: -1 };
  if (sort === 'price_asc') sortStage = { price: 1 };
  if (sort === 'price_desc') sortStage = { price: -1 };
  if (sort === 'area_desc') sortStage = { area: -1 };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(48, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  pipeline.push(
    { $sort: sortStage },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limitNum }],
        totalCount: [{ $count: 'count' }]
      }
    },
    {
      $project: {
        data: 1,
        total: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] },
        page: { $literal: pageNum },
        limit: { $literal: limitNum }
      }
    }
  );

  return pipeline;
}
