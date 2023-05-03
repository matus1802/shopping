export default () => {
  const mutation = `mutation Login($input: LoginInput!)
  {
    login(input:$input)
  }`;
  const variables = { input: { username: 'a', password: 'a' } };
  const gql = { query: mutation, variables };
  return JSON.stringify(gql);
};
