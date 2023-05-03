export default () => {
  const mutation = `mutation Signup($input: SignupInput!)
  {
    signup(input:$input)
  }`;
  const variables = { input: { username: 'a', nickname: 'a', password: 'a' } };
  const gql = { query: mutation, variables };
  return JSON.stringify(gql);
};
