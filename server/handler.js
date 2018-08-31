"use strict";

function parseCookies(headers) {
  const parsedCookie = {};
  if (headers.cookie) {
    headers.cookie[0].value.split(";").forEach(cookie => {
      if (cookie) {
        const parts = cookie.split("=");
        parsedCookie[parts[0].trim()] = parts[1].trim();
      }
    });
  }
  return parsedCookie;
}

module.exports.authOnly = async (event, context) => {
  let request = event.Records[0].cf.request;
  const headers = request.headers;
  const parsedCookies = parseCookies(headers);

  if (parsedCookies && parsedCookies["session-id"]) {
    request.uri = request.url.replace("private/", "");
    return request;
  }

  /* URI encode the original request to be sent as redirect_url in query params */
  const encodedRedirectUrl = encodeURIComponent(
    `https://${headers.host[0].value}${request.uri}?${request.querystring}`
  );
  const response = {
    status: "302",
    statusDescription: "Found",
    headers: {
      location: [
        {
          key: "Location",
          value: `https://${
            headers.host[0].value
          }?redirect_url=${encodedRedirectUrl}`
        }
      ]
    }
  };
  return response;
};
