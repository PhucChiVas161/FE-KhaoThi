import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';
// components

import { PostCard } from '../sections/@dashboard/post';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------



export default function PostPage() {
  return (
    <>
      <Helmet>
        <title> Post | KHẢO THÍ - VLU </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            POST
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button> */}
        </Stack>

        

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}