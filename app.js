const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const { ErrorHandler, NotFoundException } = require("./errors");
const routes = require("./routes/routes");

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    lng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      lookupHeader: "accept-language",
    },
  });
const app = express();
app.use(middleware.handle(i18next));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "data")));
app.use(express.static(path.join(__dirname, "logs")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use(routes);

// catch 404 and forward to error handler
app.use("*", function (req, res, next) {
  next(new NotFoundException("apiPathNotExit"));
});

app.use(ErrorHandler);

module.exports = app;
