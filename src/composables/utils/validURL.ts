export const isValidUrl = (urlString:string)=> {
  var urlPattern = new RegExp('/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i');
  return !!urlPattern.test(urlString);
}