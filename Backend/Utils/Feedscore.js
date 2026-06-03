export const calculateScore = (post, userId = null) => {
  if (!post) return 0;

  const now = Date.now();
  const created = new Date(post.createdAt || now).getTime();

  const ageHours = (now - created) / 3600000;

  const likeScore = (post.likes?.length || 0) * 3;
  const commentScore = (post.comments?.length || 0) * 5;
  const viewScore = (post.views || 0) * 0.2;

  let socialBoost = 0;

  const followers = post.user?.followers || [];

  if (userId && followers.includes(userId)) {
    socialBoost = 5;
  }

  const decay = Math.max(1, ageHours + 2);

  return (likeScore + commentScore + viewScore + socialBoost) / decay;
};
