const GITHUB_EVENT_LABELS: Record<string, string> = {
  CommitCommentEvent: "commented on a commit",
  CreateEvent: "created a branch or tag",
  DeleteEvent: "deleted a branch or tag",
  ForkEvent: "forked a repo",
  GollumEvent: "updated a wiki page",
  IssueCommentEvent: "commented on an issue",
  IssuesEvent: "opened or updated an issue",
  MemberEvent: "added a collaborator",
  PublicEvent: "made a repo public",
  PullRequestEvent: "opened or updated a PR",
  PullRequestReviewEvent: "reviewed a PR",
  PullRequestReviewCommentEvent: "commented on a PR review",
  PushEvent: "pushed commits",
  ReleaseEvent: "published a release",
  SponsorshipEvent: "sponsored someone",
  WatchEvent: "starred a repo",
};

export type GithubEvent = {
  action: string,
  repoName: string,
  repoUrl: string,
  timeAgo: Date
}

export const getLatestGithubEvent = async (): Promise<GithubEvent> => {
  const events = await fetch('https://api.github.com/users/suka712/events', {
    method: "GET"
  }).then(r => r.json())

  const event = events[0]
  const action = GITHUB_EVENT_LABELS[event.type]
  const repoName = event.repo.name
  const repoUrl = event.repo.url
  const timeAgo = new Date(event.created_at)

  return {
    action,
    repoName,
    repoUrl,
    timeAgo
  }
}