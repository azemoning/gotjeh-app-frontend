const { default: axios } = require("axios");

const router = require("express").Router();

const baseUrl = process.env.API_URL;

router.get("/", (req, res) => {
  res.render("index", { session: req.session });
});

router.get("/forgot", (req, res) => {
  res.render("auth/forgot-password");
});

router.post("/forgot", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/users/reset_password`, req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/auth/login`, req.body)
      .then((result) => {
        console.log(result);
        req.session.token = result.data.token;
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  delete req.session.token;
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/auth/register`, req.body)
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/job", async (req, res) => {
  if (req.query.search) {
    try {
      const categories = await axios.get(`${baseUrl}/api/categories`)
      return axios
        .get(`${baseUrl}/api/jobs/search?search=${req.query.search}`)
        .then((result) => {
          res.render("pages/job", { result: result.data, session: req.session, categories: categories.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.category) {
    try {
      const categories = await axios.get(`${baseUrl}/api/categories`)
      return axios
        .get(`${baseUrl}/api/jobs/filter?category=${req.query.category}`)
        .then((result) => {
          console.log(result.data);
          res.render("pages/job", { result: result.data, session: req.session, categories: categories.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const categories = await axios.get(`${baseUrl}/api/categories`)
    return axios
      .get(`${baseUrl}/api/jobs/approved`)
      .then((result) => {
        res.render("pages/job", { result: result.data, session: req.session, categories: categories.data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/job/detail/:id", (req, res) => {
  const { id } = req.params;
  try {
    return axios
      .get(`${baseUrl}/api/jobs/${id}`)
      .then((result) => {
        res.render("pages/detail-job", {
          result: result.data,
          session: req.session,
        });
        // console.log(result.data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/post-job", (req, res) => {
  try {
    return axios
      .get(`${baseUrl}/api/categories`)
      .then((result) => {
        res.render("pages/req-post-job", { result: result.data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.post("/post-job", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/jobs`, req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/course", (req, res) => {
  try {
    return axios
      .get(`${baseUrl}/api/courses`)
      .then((result) => {
        res.render("pages/course", {
          result: result.data,
          session: req.session,
        });
        // console.log(result.data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
  res.render("pages/course");
});

router.get("/course/detail/:id", (req, res) => {
  const { id } = req.params;
  try {
    return axios
      .get(`${baseUrl}/api/courses/${id}`)
      .then((result) => {
        res.render("pages/detail-course", {
          result: result.data,
          session: req.session,
        });
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/course/tutorials", (req, res) => {
  res.render("pages/tutorial-course");
});

router.get("/faq", (req, res) => {
  res.render("pages/faq", { session: req.session });
});

router.get("/about", (req, res) => {
  res.render("pages/about-us", { session: req.session });
});

router.get("/profile", (req, res) => {
  res.render("pages/profile");
});

router.get("/profile/edit", (req, res) => {
  res.render("pages/edit-profile");
});

router.post("/subscriptions", async (req, res) => {
  // console.log(req.body);
  try {
    return axios
      .post(`${baseUrl}/api/subscriptions`, req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
