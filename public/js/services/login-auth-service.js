app.service("loginService", function ($http) {
    this.post = function (username, password) {
        return $http({
            method: "POST",
            url: "/api/auth/login",
            data: { username: username, password: password },
        })
        .then((res) => {
            localStorage.loginData = JSON.stringify(res.data);
            localStorage.setItem = JSON.stringify(res.headers.token);
            document.location.hash = "#!/home-user";
            return res;
        })
        .catch((err) => {
            return err.data.msg;
        });
    };
});
