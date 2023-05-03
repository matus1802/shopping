export default ({ itemId }) => {
  const mutation = `mutation addToCart($input: UpdateCartInput!)
  {
    addToCart(input:$input) {
      user
      {
        _id
        itemsInCart {
          _id
        }
      }
      item {
        _id
      }
    }
  }`;
  const variables = { input: { itemId } };
  const gql = { query: mutation, variables };
  return JSON.stringify(gql);
};
