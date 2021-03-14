const { default: axios } = require("axios");

const router = require("express").Router();

const baseUrl = process.env.API_URL;
// const baseUrl = "http://gotjeh-backend-develop.herokuapp.com";


router.get("/", (req, res) => {
  try {
    return axios
      .get(`${baseUrl}/api/courses/popular`)
      .then((result) => {
        res.render("index", { session: req.session, result: result.data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
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
  res.render("auth/login", { loginError: { code: "" } });
});

router.post("/login", async (req, res) => {
  try {
    return axios
      .post(`${baseUrl}/api/auth/login`, req.body)
      .then((result) => {
        req.session.token = result.data.token;
        req.session.user_id = result.data.id;
        res.redirect("/");
      })
      .catch((err) => {
        if (err.response.data.code == 404) {
          res.render("auth/login", { loginError: err.response.data })
        } else if (err.response.data.code == 401) {
          res.render("auth/login", { loginError: err.response.data })
        }
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("auth/register", { registerError: { code: "" } });
});

router.post("/register", async (req, res) => {
  try {
    return axios
      .post(`${baseUrl}/api/auth/register`, req.body)
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => {
        if (err.response.data.code == 401) {
          res.render("auth/register", { registerError: err.response.data })
        }
      });
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
          if (!result.data.length) {
            res.render("pages/job-empty", { result: result.data, session: req.session, categories: categories.data });
          } else {
            res.render("pages/job", { result: result.data, session: req.session, categories: categories.data });
          }
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

router.get("/course", async (req, res) => {
  if (req.query.search) {
    try {
      const categories = await axios.get(`${baseUrl}/api/categories`)
      return axios
        .get(`${baseUrl}/api/courses/search?search=${req.query.search}`)
        .then((result) => {
          if (!result.data.length) {
            res.render("pages/course-empty", { result: result.data, session: req.session, categories: categories.data });
          } else {
            res.render("pages/course", { result: result.data, session: req.session, categories: categories.data });
          }
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
        .get(`${baseUrl}/api/courses/filter?category=${req.query.category}`)
        .then((result) => {
          console.log(result.data);
          res.render("pages/course", { result: result.data, session: req.session, categories: categories.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const categories = await axios.get(`${baseUrl}/api/categories`)
    return axios
      .get(`${baseUrl}/api/courses`)
      .then((result) => {
        res.render("pages/course", { result: result.data, session: req.session, categories: categories.data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
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
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/course/tutorials/:id", (req, res) => {
  const { id } = req.params;
  try {
    return axios
      .get(`${baseUrl}/api/courses/${id}`)
      .then((result) => {
        res.render("pages/tutorial-course", {
          result: result.data,
          session: req.session,
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

router.get("/faq", (req, res) => {
  res.render("pages/faq", { session: req.session });
});

router.get("/about", (req, res) => {
  res.render("pages/about-us", { session: req.session });
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params
  console.log(id);
  const getUserData = axios.get(`${baseUrl}/api/users/${id}`)
  const getUserCourse = axios.get(`${baseUrl}/api/courses/enrolled/`, {
    params: {
      user_id: id
    }
  })
  try {
    return axios
      .all([getUserData, getUserCourse])
      .then(axios.spread((...responses) => {
        const resultUserData = responses[0]
        const resultUserCourse = responses[1]
        res.render("pages/profile", { session: req.session, resultUserData: resultUserData.data, resultUserCourse: resultUserCourse.data });
      }))
  } catch (error) {

  }
});

router.get("/profile/edit/:id", (req, res) => {
  const { id } = req.params
  try {
    return axios
      .get(`${baseUrl}/api/users/${id}`)
      .then(result => {
        res.render("pages/edit-profile", { session: req.session, result: result.data });
      })
  } catch (error) {

  }
});

router.post("/profile/edit/:id", (req, res) => {
  const { id } = req.params
  try {
    return axios
      .post(`${baseUrl}/api/users/${id}`, { id: id, ...req.body })
      .then(result => {
        res.render("pages/profile", { session: req.session, result: result.data });
      })
      .catch(err => {
        console.error(err);
      })
  } catch (error) {

  }
});

router.post("/course/enroll/:id", async (req, res) => {
  const { id } = req.params
  try {
    return axios
      .post(`${baseUrl}/api/users/courses/enroll`, {
        user_id: req.session.user_id,
        course_id: id
      })
      .then(result => {
        res.redirect(`/course/tutorials/${id}`)
      })
  } catch (error) {

  }
})

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
