export const haveMetamask = () => ({
  type: 'haveMetamask',
})

export const metamaskAuthenticated = () => ({
  type: 'metamaskAuthenticated',
})

export const saveAccounts = (payload) => ({
  type: 'saveAccounts',
  payload,
})

