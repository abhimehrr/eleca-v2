// export const host = "/";
export const host = "http://localhost:5000/";

export async function useFetch (route, { method, authtoken='', body={} }) {
  var data = await fetch(`${host}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      authtoken
    },
    body: JSON.stringify(body)
  })
  data = await data.json()
  return data
}
export async function uploadImage (route, { method, authtoken='', body={} }) {
  var data = await fetch(`${host}${route}`, {
    method,
    headers: {
      authtoken
    },
    body
  })
  data = await data.json()
  return data
}

export function useFetchToken () {
  var auth = JSON.parse(localStorage.getItem('auth'))
  if(!auth) return {exp: '', token: ''}
  var { exp, token } = auth
  return {exp, token}
}