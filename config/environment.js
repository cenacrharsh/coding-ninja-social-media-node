const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "cenacr7.harsh@gmail.com",
      pass: "Nishant@4444_cenacr7",
    },
  },
  google_client_id:
    "697562612153-b6v3ptklhidjtoqemc62th9gi2tbplo0.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_strategy: "codeial",
};

const production = {
  name: "production",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "cenacr7.harsh@gmail.com",
      pass: "Nishant@4444_cenacr7",
    },
  },
  google_client_id:
    "697562612153-b6v3ptklhidjtoqemc62th9gi2tbplo0.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_strategy: "codeial",
};

module.exports = development;
