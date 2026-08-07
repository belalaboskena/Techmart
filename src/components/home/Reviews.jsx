import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import "./Reviews.css";

function Reviews() {
  const reviews = [
    {
      username: "John Dorsey",
      bio: "Verified Buyer",
      avatar: `${import.meta.env.BASE_URL}img/team-02.png`,
      review:
        "TechMart has become my go-to for all accessories.the packaging was premium. Highly recommended!",
      rate: 5,
    },
    {
      username: "Sarah Lim",
      bio: "Music Enthusiast",
      avatar: `${import.meta.env.BASE_URL}img/team-04.png`,
      review:
        "The minixup speaker is actually amazing. The bass is deep and the LED ring looks sick at night. Totally worth the price.",
      rate: 5,
    },
    {
      username: "Marcus Knight",
      bio: "Tech Reviewer",
      avatar: `${import.meta.env.BASE_URL}img/user.png`,
      review:
        "Excellent customer service. I had an issue with my delivery and they resolved it within hours. Will definitely shop here again.",
      rate: 4,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ textAlign: "center", marginBottom: "50px" }}
      >
        What Our Customers Say
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} sx={{ overflow: "visible" }}>
          {reviews.map((review, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card className="review-card" sx={{ width: "100%" }}>
                <Avatar className="avatar" src={review.avatar} />

                <Typography gutterBottom variant="h5" component="div">
                  {review.username}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  {review.bio}
                </Typography>
                <Rating
                  name="read-only"
                  value={parseInt(review.rate)}
                  readOnly
                />
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                  }}
                >
                  {review.review}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Reviews;
