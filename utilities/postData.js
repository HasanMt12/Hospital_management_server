const postData = async (collection, data) => {
  const data = await collection.insertOne(data);
  return data;
};

module.exports = getData;
