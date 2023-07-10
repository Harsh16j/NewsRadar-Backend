const express = require("express");

const router = express.Router();

// Post request because we don't want APIKey to be visible in the url
router.post("/fetchnews", async (req, res) => {
    // If no body sent with the request

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Request body not found",
            message: "Include all the request parameters in the request body",
        });
    }

    const { country, category, APIKey, page, pageSize, searchQuery } = req.body;

    // If not all the mandatory parameters sent in the body
    if (!(country && category && APIKey && page && pageSize)) {
        return res.status(400).json({
            error: "Invalid Request Parameters",
            message: "Check the request parameters and try again",
        });
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${APIKey}&page=${page}&pageSize=${pageSize}`;
    url = searchQuery ? `${url}&q=${searchQuery}` : url;

    try {
        const data = await fetch(url);

        if (data.status !== 200) {
            return res.status(400).json({
                error: "An unexpected error occured, please try again later",
                message: "",
            });
        }

        let parsedData = await data.json();
        if (parsedData.status === "error") {
            // The API returns 200 status request even when the API limit is exceeded.
            return res.status(400).json({
                error: "API limit exceeded, please try again later",
                message: `Error message:${parsedData.message}`,
            });
        }

        res.json(parsedData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Unexpected Internal Server Error",
            message: "Try again later",
        });
    }
});

module.exports = router;
