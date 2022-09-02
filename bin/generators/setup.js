module.exports = function (plop) {
  plop.setGenerator("templates", {
    description: "What component are you creating?",
    prompts: [
      {
        type: "input",
        name: "apiUrl",
        message: "What is the base API URL?",
        default: "http://localhost:4000",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../../.env",
        templateFile: "./templates/Env.hbs",
      },
    ],
  });
};
