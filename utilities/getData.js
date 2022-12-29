const getData = async (collection) => {
  const data = await collection.find({}).toArray();
  return data;
};

module.exports = getData;
