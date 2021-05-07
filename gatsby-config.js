module.exports = {
  siteMetadata: {
    title: "box-server-fe",
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        icon: "src/images/icon.png",
        crossOrigin: `use-credentials`,
      },
    },
  ],
};
