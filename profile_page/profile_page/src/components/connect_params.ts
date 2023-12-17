export const backend = 'http://localhost:3000'

export const postRequestParams = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({})
}

export const getRequestParams : any = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}
