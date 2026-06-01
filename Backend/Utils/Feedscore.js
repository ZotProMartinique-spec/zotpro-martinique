export const calculateScore = (post, userId = null) => {
  const now = Date.now();
  const created = new Date(post.createdAt).getTime();

  const ageHours = (now - created) / 36e5;

  const likeScore = post.likes.length * 3;
  const commentScore = post.comments.length * 5;
  const viewScore = post.views * 0.2;

  let socialBoost = 0;

  if (userId && post.user?.followers?.includes(userId)) {
    socialBoost = 5;
  }

  const decay = Math.max(1, ageHours + 2);

  return (likeScore + commentScore + viewScore + socialBoost) / decay;
};
