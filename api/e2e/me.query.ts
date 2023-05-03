export default () => {
  const query = `query Me
  {
    me {
      _id
      username
      itemsInCart {
        _id
      }
    }
  }`;
  const gql = { query };
  return JSON.stringify(gql);
};
