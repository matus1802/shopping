export default ({ category, offset, limit }) => {
  const query = `query Items($category: String, $offset: Float, $limit: Float)
  {
    items(category: $category, offset: $offset, limit: $limit) {
      _id
      title
      description
      price
      category
    }
  }`;
  const gql = { query, variables: { category, offset, limit } };
  return JSON.stringify(gql);
};
