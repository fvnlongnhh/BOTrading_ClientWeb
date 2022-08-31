export const HOST = window.location.protocol !== "https:" ?process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URLS

export const IMAGE_HOST = HOST + 'upload/'
console.log(process.env.REACT_APP_API_URL, 242)